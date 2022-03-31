import { supabase } from "../../utils/supabaseClient";

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
        
        let {error: uploadError} = await supabase.storage
            .from("avatars")
            .upload(filePath, file)
        
        if (uploadError) {throw uploadError}
        console.log("filePath: ",filePath)

        if (onUpload) {onUpload(filePath)}

    } catch(error: any) {
        alert(error.message)
    } finally {
        setUploading(false)
    }
}