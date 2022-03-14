import styles from "./styles.module.css"
import { useEffect, useState } from "react"
import { supabase } from "../../../utils/supabaseClient"
import Image from "next/image"

interface Props {
    url: string
    size: number
    onUpload: (filePath: string) => void
}

export default function Avatar({url, size, onUpload}: Props) {
    const [avatarUrl, setAvatarUrl] = useState("")
    const [uploading, setUploading] =  useState(false)

    useEffect(() => {
      if (url) downloadImage(url)
    }, [url])

    async function downloadImage(path: string) {
        try {
            const {data, error} = await supabase.storage.from("avatars").download(path)
            if (error) {
                throw error
            }

            let url = ""
            if (data) {
                url = URL.createObjectURL(data)
            }
            setAvatarUrl(url)
        } catch(error: any) {
            alert("Error downloading image: " + error.message)
        } 
    }

    async function uploadAvatar(event: any) {
        try {
            setUploading(true)

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error("You must select an image to upload.")
            } 

            const file = event.target.files[0]
            const fileExt = file.name.split(".").pop()
            const fileName = `${Math.random()}.${fileExt}`
            const filePath = `${fileName}`
            
            let {error: uploadError} = await supabase.storage
                .from("avatars")
                .upload(filePath, file)
            
            if (uploadError) {throw uploadError}

            onUpload(filePath)
        } catch(error: any) {
            alert(error.message)
        } finally {
            setUploading(false)
        }
    }
    
    return(
        <>

        <div>
            {avatarUrl ? (
                <Image src={avatarUrl} alt="Avatar" height={size} width={size} className={styles.avatarImg} />
            ) : (
                <div className={styles.avatarNoImg} />
            )}
        </div>

        <div>
            <label htmlFor="avatar">{uploading ? "Uploading ...": "Upload"}</label>
            <input type="file" name="avatar" id="avatar" accept="image/*" onChange={uploadAvatar} disabled={uploading} />
        </div>


        </>
        
    )
}