import { useState, useEffect } from "react"; 
import { supabase } from "../../utils/supabaseClient";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Head from "next/head";
import styles from "../../styles/profile.module.css"
import Avatar from "../../components/Main/Avatar/Avatar";

export enum GenderEnum {
    female = "female",
    male = "male",
    other = "other"
}

export interface ProfileProps {
    firstName?: string
    interests?: string[]
    bio?: string
    avatarUrl?: string
    gender?: GenderEnum
}

export default function Profile({session}: any) {
    const [loading, setLoading] = useState(false)
    const [avatarUrl, setAvatarUrl] = useState("")
    const router = useRouter()
    const { register, setValue, handleSubmit, formState: { errors } } = useForm<ProfileProps>();

    useEffect(() => {
        getProfile()
    }, [session])
    
    const onSubmit = handleSubmit(data => {
        console.log(data)
    });

    const onUpload = (url: string) => {
        setAvatarUrl(url)
        updateProfile({avatarUrl})
    }

    function signOut() {
        supabase.auth.signOut()
        alert("Signed out")
    }

    async function getProfile() {
        try {
            setLoading(true)
            const user = supabase.auth.user()

            let {data, error, status} = await supabase
                .from("profiles")
                .select("firstName, avatarUrl, interests, bio")
                .eq("id", user?.id)
                .single()

            if (error && status !== 406) {
                throw error
            }

            if (data) {
                
            }
        } catch(error: any) {
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }

    async function updateProfile({ firstName, interests, bio, avatarUrl, gender }: ProfileProps) {
        try {
          setLoading(true)
          const user = supabase.auth.user()
    
          const updates = {
            id: user?.id,
            firstName,
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
          }
        } catch (error) {
          alert(error)
        } finally {
          setLoading(false)
        }
      }

    return (
        <>
        <Head>
            <title>Yumcha</title>
            <meta name="description" content="Place to meet new people over food!" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className={styles.formWidget}>
            <form onSubmit={onSubmit}>
                <Avatar url={"avatarUrl"} onUpload={onUpload} size={150} />
                
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" {...register("firstName")} id="firstName" />
                </div>

                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" name="lastName" id="lastName" />
                </div>

                <div>
                    <label htmlFor="gender">Gender</label>
                    <select {...register("gender")} defaultValue="male" id="gender">
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="bio">Bio</label>
                    <textarea {...register("bio")} id="bio" cols={20} rows={3}></textarea>
                </div>

                <div>
                    <label htmlFor="interests">Interests</label>
                    <input type="text" {...register("interests")} id="interests" />
                </div>
                
                <button type="submit" onClick={onSubmit}>Complete Profile</button>
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

            <div>
                <button className="button block" onClick={signOut}>
                Sign Out
                </button>
            </div>
        </div>
        </>
    )
}