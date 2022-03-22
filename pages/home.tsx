import Head from "next/head"
import Image from "next/image"
import userAvatar from "../public/images/user.png"
import { useRouter } from "next/router"

import Navbar from "../components/Header/Navbar/Navbar"
import mainStyles from "../../styles/main.module.css"
import styles from "../styles/home.module.css"
import { supabase } from "../utils/supabaseClient"
import { useState } from "react"
import MyYumchas from "../components/Main/MyYumchas/myYumchas"
import { HomeAvatar } from "../components/Main/Avatar/Avatar"

const Home = () => {
    const router = useRouter()
    const user = supabase.auth.user()

    const [loading, setLoading] = useState(false)

    const profileRedirect = () => {
        if (user === null) {
            NotSignedInAlert()
        } else {
            router.push("./auth/profile")   
        }
    }

    const NotSignedInAlert = () => {
        if (confirm("Sign Up first!")) {
            router.push("./")
        }
    }

    return(
        <>
            <Head>
                <title>Yumcha</title>
                <meta name="description" content="Place to meet new people over food!" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header>
                <Navbar loggedIn={true} />
            </header>

            <main className={styles.main}>
                <div className={styles.topLine}>
                    <span className={styles.profile}>Edit your Profile</span>
                    <button className={styles.profileButton} onClick={profileRedirect}>
                        {/* <Image src={userAvatar} alt="Your user profile" height={40} width={40} /> */}
                        <HomeAvatar size={40} />
                    </button>
                    
                </div>

                <div className={styles.mapDiv}>
                    <span>Google Maps API</span>
                </div>

                <div className={styles.yumchaTitle}>

                    <div className={styles.titleDiv}>
                        <h4>My Yumchas</h4> 
                        <button>Refresh (&nbsp;)</button>
                    </div>
                    <MyYumchas userCreatedYumcha={true} />

                    <div className={styles.titleDiv}>
                        <h4>Nearby Yumchas</h4>
                        <button>Refresh (&nbsp;)</button>
                    </div>
                    <MyYumchas userCreatedYumcha={false} />
                    
                </div>
            </main>
        </>
    )
}

export default Home