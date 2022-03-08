import Head from "next/head"
import Navbar from "../../components/Header/Navbar/Navbar"
import {useState} from "react"
import mainStyles from "../../styles/main.module.css"
import styles from "../../styles/auth.module.css"

import { supabase } from "../../utils/supabaseClient"

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
            <Head>
                <title>Sign-in</title>
                <meta name="description" content="Place to meet new people over food!" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <header>
                <Navbar />
            </header>

            <div>
                <h1>Sign In!</h1>
            </div>
        </>
    )
}

export default SignIn