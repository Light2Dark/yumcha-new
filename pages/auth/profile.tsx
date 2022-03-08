import { useState, useEffect } from "react"; 
import { supabase } from "../../utils/supabaseClient";
import { useRouter } from "next/router";

type ProfileProps = {
    firstName: string
    interests: string[]
    bio: string
    avatarUrl: string
}

export default function Profile({session}: any) {
    const [name, setName] = useState("")
    const [interests, setInterests] = useState(null)
    const [bio, setBio] = useState("")
    const [avatarUrl, setAvatarUrl] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    useEffect(() => {
        getProfile()
    }, [session])

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
                setName(data.firstName)
                setAvatarUrl(data.avatarUrl)
                setBio(data.bio)
                setInterests(data.interests)
            }
        } catch(error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    }

    async function updateProfile({ firstName, interests, bio, avatarUrl }: ProfileProps) {
        try {
          setLoading(true)
          const user = supabase.auth.user()
    
          const updates = {
            id: user?.id,
            firstName,
            interests,
            bio,
            avatarUrl,
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
        <div className="form-widget">
            <div>
                <label htmlFor="email">Email</label>
                {/* <input id="email" type="text" value={session.user.email} disabled /> */}
            </div>
            <div>
                <label htmlFor="name">Name</label>
                <input
                id="name"
                type="text"
                value={name || ''}
                onChange={(e) => setName(e.target.value)}
                />
            </div>

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
                <button className="button block" onClick={() => supabase.auth.signOut()}>
                Sign Out
                </button>
            </div>
        </div>
        </>
    )
}