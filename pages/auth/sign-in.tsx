import Head from "next/head"
import Navbar from "../../components/Header/Navbar/Navbar"
import {useState} from "react"
import mainStyles from "../../styles/main.module.css"
import styles from '../../styles/login.module.css'

import { supabase } from "../../utils/supabaseClient"
import {useForm, SubmitHandler} from "react-hook-form"
import { IFormData } from "./sign-up"
import { useRouter } from "next/router"

const SignIn = () => {
    const { register, setValue, handleSubmit, formState: { errors }, reset } = useForm<IFormData>();
    const [loading, setLoading] = useState(false)
    let submitted = false;
    const router = useRouter()

    const onSubmit = handleSubmit(data => {
        loginUser(data)
    });

    async function loginUser(data: IFormData) {
        try {
            setLoading(true)
            submitted = false
            const {user, session, error} = await supabase.auth.signIn({
                email: data.email,
                password: data.password
            })
            if (error) throw error
            alert("Signed in!")
            submitted = true

        } catch(error: any) {
            alert(error.error_description || error.message)
        } finally {
            setLoading(false)
            reset()

            if(submitted) {
                router.push("../home")
            }
        }
    }

    // if (submitted) {
    //     return (
    //         <div className={styles.container}>
    //             <h1>Please check your email to log in</h1>
    //         </div>
    //     )
    // }
    
    return(
        <>
            <Head>
                <title>Log-in</title>
                <meta name="description" content="Place to meet new people over food!" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <header>
                <Navbar />
            </header>

            <div className={styles.mainDiv}>
                <h2 className={styles.h2}>Log In</h2>
                
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
                        <span>{loading ? "Loading.." : "Log In"}</span>    
                    </button>
                    
                </form>
            </div>
        </>
    )
}

export default SignIn