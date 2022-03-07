import {useState} from "react"
import mainStyles from "../styles/main.module.css"
import styles from "../styles/auth.module.css"

import { supabase } from "../utils/supabaseClient"

const SignIn = () => {
    const [email, setEmail] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleLogin = async() => {
        try {
            setLoading(true)
            const {error} = await supabase.auth.signIn({
                email
            })
            if (error) {
                throw error
            } else {
                setSubmitted(true)
            }

        } catch (error: any) {
            alert(error.error_description || error.message)

        } finally {
            setLoading(false)
        }
    }

    if (submitted) {
        return (
            <div className={styles.container}>
                <h1>Please check your email to sign in</h1>
            </div>
        )
    }
    
    return(
        <>
            <div>
                <h1>Sign In!</h1>
            </div>
        </>
    )
}

export default SignIn