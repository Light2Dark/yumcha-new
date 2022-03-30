import Head from "next/head"
import Image from "next/image"
import userAvatar from "../public/images/user.png"
import { useRouter } from "next/router"

import Navbar from "../components/Header/Navbar/Navbar"
import mainStyles from "../../styles/main.module.css"
import buttonStyles from "../components/Shared/button.module.css"
import styles from "../styles/home.module.css"
import { supabase } from "../utils/supabaseClient"
import { useState, useEffect } from "react"
import MyYumchas from "../components/Main/MyYumchas/myYumchas"
import { HomeAvatar } from "../components/Main/Avatar/Avatar"

import { Yumchas } from "../components/Main/MyYumchas/myYumchas"
import Map from "../components/Main/Map/map"

export interface YumchaLocations {
    id: number
    latLong: string[]
}

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

    const planYumcha = () => {
        if (user === null) {
            NotSignedInAlert()
        } else {
            router.push("./planYumcha")   
        }
    }

    // store yumchas from db, so that we can update the map with markers
    // pass setYumchas method to MyYumchas
    const [yumchasLatLong, setYumchasLatLong] = useState<YumchaLocations[]>([])

    useEffect(() => {
        let isMounted = true
        getYumchaLocations(isMounted)
        
        return () => {
            isMounted = false
        }
    }, [])
    

    async function getYumchaLocations(isMounted: boolean) {
        try {
            let {data, error, status} = await supabase
                .from("yumcha")
                .select(`
                    id,
                    latLong
                `)
            
            if (error && status !== 406) {
                console.log("error not 406")
                throw error
            }

            if (data && isMounted) {
                setYumchasLatLong(data)
            }

        } catch(error: any) {
            console.error(error.message || error.description)

        } finally {

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
                        <HomeAvatar size={40} />
                    </button>
                    
                </div>

                {/* <div className={styles.mapDiv}> */}
                <div>
                    <Map markerLocations={yumchasLatLong} />
                </div>

                <div className={styles.yumchaTitle}>

                    <div className={styles.titleDiv}>
                        <h4>My Yumchas</h4> 
                        {/* <button>Refresh (&nbsp;)</button> */}
                    </div>
                    <MyYumchas userCreatedYumcha={true} />

                    <div className={styles.center}>
                        <span>Can't find any yumchas you like?</span>
                        <button className={buttonStyles.button} id={styles.planButton} onClick={planYumcha}>Plan Yumcha</button>
                    </div>

                    <div className={styles.titleDiv}>
                        <h4>Nearby Yumchas</h4>
                        {/* <button>Refresh (&nbsp;)</button> */}
                    </div>
                    <MyYumchas userCreatedYumcha={false} />
                    
                </div>
            </main>
        </>
    )
}

export default Home