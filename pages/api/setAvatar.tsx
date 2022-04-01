import { supabase } from "../../utils/supabaseClient";
import imageCompression from "browser-image-compression";

interface Props {
    url: string
    size: number
    onUpload?: (filePath: string) => void
}

interface UploadProps {
    event: any
    setUploading: (setUploadingState: boolean) => void
    onUpload: (url: string) => void
}

export async function downloadImage(path: string, isMounted: boolean) {
    try {
        const {data, error} = await supabase.storage.from("avatars").download(path)
        if (error) {
            throw error
        }

        let url = ""
        if (data && isMounted) {
            url = URL.createObjectURL(data)
        }

        if(isMounted) {
            // setAvatarUrl(url)
        }
        
    } catch(error: any) {
        alert("Error downloading image: " + error.message)
    } 
}

export async function compressImage(file: File) {

    console.log('originalFile instanceof Blob', file instanceof Blob); // true
    console.log(`originalFile size ${file.size / 1024 / 1024} MB`);

    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true
    }

    try {
        const compressedFile = await imageCompression(file, options)
        
        console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
        console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

        return compressedFile
        // await uploadToServer(compressedFile)
    } 
    catch (error: any) {
        alert(error.message || error.description)
    }
}

export async function uploadAvatar({event, setUploading, onUpload}: UploadProps) {
    try {
        setUploading(true)

        if (!event.target.files || event.target.files.length === 0) {
            throw new Error("You must select an image to upload.")
        } 

        const file = event.target.files[0]
        const fileExt = file.name.split(".").pop()
        const fileName = `${Math.random()}.${fileExt}`
        const filePath = `${fileName}`

        // NEED TO LIMIT FILE SIZE OF UPLOADED IMAGES OR COMPRESS IT
        let compressedFile = await compressImage(file)
        if (!compressedFile) {
            console.error("Compressed file returned null")
            return null
        }
        
        let {error: uploadError} = await supabase.storage
            .from("avatars")
            .upload(filePath, compressedFile)
        
        if (uploadError) {throw uploadError}
        // console.log("filePath: ",filePath)

        // if (onUpload) {onUpload(filePath)}

    } catch(error: any) {
        alert(error.message || error.description)
    } finally {
        setUploading(false)
    }
}