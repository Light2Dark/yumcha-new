import styles from "../../styles/login.module.css"
import mainStyles from "../../styles/main.module.css"
import Navbar from "../../components/Header/Navbar/Navbar"
import Head from "next/head"

import { supabase } from "../../utils/supabaseClient"

const SignUp = () => {

    const submitSignUp = (e: any) => {
        e.preventDefault()
        console.log(e.email)
    }

    async function registerUser(e: any) {
        const {user, session, error} = await supabase.auth.signUp({
            email: e.email,
            password: e.password
        })
    }

    return(
        <>
            <Head>
                <title>Sign Up</title>
                <meta name="description" content="Sign up your profile" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* <h1 className={`${mainStyles.yumcha}`} id={styles.yumcha}>Yumcha</h1> */}
            <Navbar />
            
            <div className={styles.mainDiv}>
                <h2 className={styles.h2}>Sign Up</h2>
                
                <form onSubmit={submitSignUp}>
                    <div className={styles.flex}>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" required />
                    </div>
                    
                    <div className={styles.flex}>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" required />
                    </div>

                    <button className={styles.signUp} type="submit">Next</button>
                </form>
            
            </div>
        </>
    )
}

export default SignUp