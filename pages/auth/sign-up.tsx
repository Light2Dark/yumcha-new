import styles from "../../styles/login.module.css"
import mainStyles from "../../styles/main.module.css"
import Navbar from "../../components/Header/Navbar/Navbar"
import Head from "next/head"

import { supabase } from "../../utils/supabaseClient"
import {useForm, SubmitHandler} from "react-hook-form"
import { useState } from "react"
import {useRouter} from "next/router"

export interface IFormData {
    email: string;
    password: string;
}

const SignUp = () => {
    const router = useRouter()

    const { register, setValue, handleSubmit, formState: { errors }, reset } = useForm<IFormData>();
    const [loading, setLoading] = useState(false)
    let submitted = false;

    const onSubmit = handleSubmit(data => {
        registerUser(data)
    });

    async function registerUser(data: IFormData) {
        try {
            setLoading(true)
            submitted = false
            const {user, session, error} = await supabase.auth.signUp({
                email: data.email,
                password: data.password
            })
            if (error) throw error
            alert("Verify your email and you can sign in!")
            submitted = true

        } catch(error: any) {
            alert(error.error_description || error.message)
        } finally {
            setLoading(false)
            reset()
            if(submitted) {
                router.push("/")
            }
        }
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
                
                <form onSubmit={onSubmit}>
                    <div className={styles.flex}>
                        <label htmlFor="email">Email</label>
                        <input type="email" {...register("email", {required: true})} id="email"/>
                    </div>
                    
                    <div className={styles.flex}>
                        <label htmlFor="password">Password</label>
                        <input type="password" {...register("password", {required: true})} id="password"/>
                    </div>

                    <button className={styles.signUp} type="submit">
                        <span>{loading ? "Loading.." : "Register"}</span>    
                    </button>
                    
                </form>
            
                <p>All data is stored securely to our best knowledge. In any case, do not share your password.</p>
            </div>
        </>
    )
}

export default SignUp