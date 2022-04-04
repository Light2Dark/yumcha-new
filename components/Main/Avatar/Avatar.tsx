import styles from "./styles.module.css"
import { useEffect, useState } from "react"
import { supabase } from "../../../utils/supabaseClient"
import Image from "next/image"
import userAvatar from "../../../public/images/user.png"
import userIcon from "../../../public/images/usercircle.svg"
import {downloadImage} from "../../../pages/api/setAvatar"

interface Props {
    url: string
    size: number
    onUpload?: (filePath: string) => void
}

type YumchaCardProps = {
    url: string
    size: number
}

const Avatar = ({url, size}: Props) => {
    const [avatarUrl, setAvatarUrl] = useState("")
    const [uploading, setUploading] =  useState(false)

    useEffect(() => {
        let isMounted = true
        
        if (url != "") {
            console.log("downloading", url)
            downloadImage(url, isMounted, setAvatarUrl)
        }
    
        return () => {
            isMounted = false
        }
    }, [url])

    return (
        <>
            <div className={styles.avatar}>
                {avatarUrl ? (
                    <Image src={avatarUrl} alt={"generic avatar of a person"} width={size} height={size} objectFit="cover" />
                ) : (
                    <Image src={userAvatar} alt={"generic avatar of a person"} width={size} height={size} objectFit="cover" />
                )}
            </div>
        </>
    )
    
}

export default Avatar

// export default function Avatar({url, size, onUpload}: Props) {
//     const [avatarUrl, setAvatarUrl] = useState("")
//     const [uploading, setUploading] =  useState(false)

//     useEffect(() => {
//         let isMounted = true
//         if (url) downloadImage(url, isMounted)

//         return () => {
//             isMounted = false
//         }
//     }, [url])

//     async function downloadImage(path: string, isMounted: boolean) {
//         try {
//             const {data, error} = await supabase.storage.from("avatars").download(path)
//             if (error) {
//                 throw error
//             }

//             let url = ""
//             if (data) {
//                 url = URL.createObjectURL(data)
//             }

//             if(isMounted) {
//                 setAvatarUrl(url)
//             }
            
//         } catch(error: any) {
//             alert("Error downloading image: " + error.message)
//         } 
//     }

//     async function uploadAvatar(event: any) {
//         try {
//             setUploading(true)
//             const user = supabase.auth.user()

//             if (!event.target.files || event.target.files.length === 0) {
//                 throw new Error("You must select an image to upload.")
//             } 

//             const file = event.target.files[0]
//             const fileExt = file.name.split(".").pop()
//             const fileName = `${Math.random()}.${fileExt}`
//             const filePath = `${fileName}`
            
//             let {error: uploadError} = await supabase.storage
//                 .from("avatars")
//                 .upload(filePath, file)
            
//             if (uploadError) {throw uploadError}
//             console.log("filePath: ",filePath)

//             if (onUpload) {onUpload(filePath)}

//         } catch(error: any) {
//             alert(error.message)
//         } finally {
//             setUploading(false)
//         }
//     }
    
//     return(
//         <>

//         <div className={styles.avatar}>
//             {avatarUrl ? (
//                 <Image src={avatarUrl} alt="Avatar" height={size} width={size} objectFit="cover" className={styles.avatarImg} />
//             ) : (
//                 <div className={styles.avatarNoImg} />
//             )}
//         </div>

//         <div>
//             <label htmlFor="avatar">{uploading ? "Uploading ...": "Upload"}</label>
//             <input className={styles.avatarInput} type="file" name="avatar" id="avatar" accept="image/*" onChange={uploadAvatar} disabled={uploading} />
//         </div>


//         </>
        
//     )
// }

// export function HomeAvatar({size}: Props) {
//     const [avatarUrl, setAvatarUrl] = useState("")
//     const [blobUrl, setBlobUrl] = useState("")

//     useEffect(() => {

//         let isMounted = true
//         getProfile(isMounted)

//         return () => {
//             isMounted = false
//         }
//     }, [avatarUrl])

//     async function downloadImage(path: string, isMounted: boolean) {
//         try {
//             const {data, error} = await supabase.storage.from("avatars").download(path)
//             if (error) {
//                 throw error
//             }

//             let url = ""
//             if (data) {
//                 url = URL.createObjectURL(data)
//             }

//             if (isMounted) {
//                 setBlobUrl(url)
//             }
        
//         } catch(error: any) {
//             alert("Error downloading image: " + error.message)
//         } 
//     }

//     async function getProfile(isMounted: boolean) {
//         try {
//             const user = supabase.auth.user()

//             let {data, error, status} = await supabase
//                 .from("profiles")
//                 .select("avatarUrl")
//                 .eq("id", user?.id)
//                 .single()

//             if (error && status !== 406) {
//                 throw error
//             }

//             if (data && isMounted) {
//                 setAvatarUrl(data.avatarUrl)
//                 if (avatarUrl) {
//                     downloadImage(avatarUrl, isMounted)
//                 }
//             }
//         } catch(error: any) {
//             alert(error.message || error.description)
//         } finally {
            
//         }
//     }
    
//     return(
//         <>
//             <div>
//                 {blobUrl ? (
//                     <Image src={blobUrl} alt="Avatar" height={size} width={size} objectFit="cover" className={styles.avatarImg} />
//                 ) : (
//                     <Image src={userAvatar} alt="Your user profile" height={40} width={40} />
//                 )}
//             </div>
//         </>
//     )
// }

// export function YumchaCardAvatar({size, url}: YumchaCardProps) {
//     const [blobUrl, setBlobUrl] = useState("")

//     useEffect(() => {
//         let isMounted = true
//         if (url) {
//             downloadImage(url, isMounted)
//         }

//         return () => {
//             isMounted = false
//         }
//     }, [url])

//     async function downloadImage(path: string, isMounted: boolean) {
//         try {
//             const {data, error} = await supabase.storage.from("avatars").download(path)
//             if (error) {
//                 throw error
//             }

//             let url = ""
//             if (data) {
//                 url = URL.createObjectURL(data)
//             }

//             if (isMounted) {
//                 setBlobUrl(url)
//             }

//         } catch(error: any) {
//             alert("Error downloading image: " + error.message)
//         } 
//     }
    
//     return(
//         <>
//             <div>
//                 {blobUrl ? (
//                     <Image src={blobUrl} alt="Avatar" height={size} width={size} objectFit="cover" className={styles.avatarImg} />
//                 ) : (
//                     <Image src={userIcon} alt="Generic icon of a person" height={40} width={40} />
//                 )}
//             </div>
//         </>
//     )
// }