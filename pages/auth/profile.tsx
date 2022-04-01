import { useState, useEffect } from "react"; 
import { supabase } from "../../utils/supabaseClient";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Head from "next/head";
import styles from "../../styles/profile.module.css"
import buttonStyles from "../../components/Shared/button.module.css"
// import Avatar from "../../components/Main/Avatar/Avatar";
import Navbar from "../../components/Header/Navbar/Navbar";

import { uploadAvatar } from "../api/setAvatar";

export enum GenderEnum {
    female = "female",
    male = "male",
    other = "other"
}

interface ProfileProps {
    firstName?: string
    lastName?: string
    interests?: string[]
    bio?: string
    avatarUrl?: string
    gender?: GenderEnum
}

export interface FormProps {
    firstName?: string
    lastName?: string
    interests?: string
    bio?: string
    avatarUrl?: string
    gender?: GenderEnum
}

export default function Profile({session}: any) {
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [avatarUrl, setAvatarUrl] = useState("")
    const [firstName, setFirstName] = useState(null)
    const [lastName, setLastName] = useState(null)
    const [interests, setInterests] = useState(null)
    const [gender, setGender] = useState(null)

    const router = useRouter()
    const { register, setValue, handleSubmit, formState: { errors } } = useForm<FormProps>();

    useEffect(() => {
        
        let isMounted = true
        getProfile(isMounted)

        return () => {
            isMounted = false
        }
    }, [session])
    
    const onSubmit = handleSubmit((data: any) => {
        const interests: string = data.interests || ""
        const interestsArray = interests.split(",")
        console.log(data)

        const profile: ProfileProps = {
            firstName: data.firstName,
            lastName: data.lastName,
            interests: interestsArray,
            bio: data.bio,
            avatarUrl: data.avatarUrl,
            gender: data.gender
        }

        updateProfile(profile)
    });

    // const onUpload = (url: string) => {
    //     if (url != "") {
    //         setAvatarUrl(url)
    //     }
    //     updateProfile({avatarUrl: url})
    // }

    const onUpload = (event: any) => {
        uploadAvatar({event, setUploading, onUpload})
    }

    function signOut() {
        supabase.auth.signOut()
        alert("Signed out")
    }

    async function getProfile(isMounted: boolean) {
        try {
            setLoading(true)
            const user = supabase.auth.user()

            let {data, error, status} = await supabase
                .from("profiles")
                .select("firstName, lastName, gender, avatarUrl, interests, bio")
                .eq("id", user?.id)
                .single()

            if (error && status !== 406) {
                throw error
            }

            if (data && isMounted) {
                setFirstName(data.firstName)
                setLastName(data.lastName)
                setInterests(data.interests)
                setGender(data.gender)
                setAvatarUrl(data.avatarUrl)
            }
        } catch(error: any) {
            alert(error.message || error.description)
        } finally {
            setLoading(false)
        }
    }

    async function updateProfile({ firstName, lastName, interests, bio, avatarUrl, gender }: ProfileProps) {
        try {
          setLoading(true)
          const user = supabase.auth.user()
          console.log("profile should be updated when image is uploaded", avatarUrl)
    
          const updates = {
            id: user?.id,
            firstName,
            lastName,
            interests,
            bio,
            avatarUrl,
            gender,
            updated_at: new Date(),
          }
    
          let { error } = await supabase.from('profiles').upsert(updates, {
            returning: 'minimal', // Don't return the value after inserting
          })
    
          if (error) {
            throw error
          } else {
            // Success
            console.log("Image or profile completed uploading")  
          }
        } catch (error: any) {
          alert(error.message || error.description)
        } finally {
          setLoading(false)
        }
      }

      return(
          <>
            <Head>
                <title>Yumcha</title>
                <meta name="description" content="Place to meet new people over food!" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar loggedIn={true} />

            <div>
                <h1 className={styles.heading}>Your Profile</h1>
            </div>

            <div className={styles.formWidget}>
                <form onSubmit={onSubmit}>
                    {/* <Avatar url={avatarUrl} onUpload={onUpload} size={100} /> */}
                    <input className={styles.avatarInput} type="file" name="avatar" id="avatar" accept="image/*" onChange={onUpload} disabled={uploading} />

                    <div className={styles.twoLines}>
                        <label htmlFor="firstName">
                            First Name:&nbsp;
                            <span>{firstName}</span>
                        </label>
                        <input type="text" {...register("firstName", {required: true})} id="firstName" className={styles.name} placeholder={firstName || ""}/>
                    </div>

                    <div className={styles.twoLines}>
                        <label htmlFor="lastName">
                            Last Name:&nbsp;
                            <span>{lastName}</span>
                        </label>
                        <input type="text" {...register("lastName", {required: true})} id="lastName" className={styles.name} placeholder={lastName || ""} />
                    </div>

                    <div className={styles.twoLines}>
                        <label htmlFor="gender">
                            Gender:&nbsp;
                            <span>{gender}</span>
                        </label>

                        <select {...register("gender", {required: true})} id="gender" className={styles.gender} defaultValue={gender || "male"}>
                            <option value="female">Female</option>
                            <option value="male">Male</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    {/* <div>
                        <label htmlFor="bio">Bio</label>
                        <textarea {...register("bio")} id="bio" cols={20} rows={3}></textarea>
                    </div> */}

                    <div className={styles.twoLines}>
                        <label htmlFor="interests">
                            Interests:&nbsp;
                            <span>{interests}</span>
                        </label>
                        <input type="text" {...register("interests", {required: true})} id="interests" className={styles.interest} placeholder={interests || ""} />
                    </div>
                    
                    <div className={styles.center}>
                        <button className={`${buttonStyles.button} ${styles.completeBtn}`} onClick={() => {router.push("./../home")}}>Back</button>
                        <button type="submit" onClick={onSubmit} className={`${buttonStyles.button} ${styles.completeBtn}`}>Update Profile</button>
                    </div>
                    
                </form>

                {/* <div>
                    <button
                    className="button block primary"
                    onClick={() => updateProfile({ firstName, bio, interests }: ProfileProps)}
                    disabled={loading}
                    >
                    {loading ? 'Loading ...' : 'Update'}
                    </button>
                </div> */}

                {/* <div>
                    <button className={buttonStyles.button} onClick={signOut}>
                    Sign Out
                    </button>
                </div> */}

            </div>
          </>
      )
}