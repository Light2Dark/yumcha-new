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
import { YumchaData } from "../components/Main/YumchaPage/yumchaExpanded"
import Map from "../components/Main/Map/map"
import { getAllYumchas } from "../utils/getYumchas"
import checkProfile from "../utils/checkProfile"

export interface YumchaLocations {
    id: number
    latLong: string[]
}

const Home = () => {
    const router = useRouter()
    const user = supabase.auth.user()

    const [loading, setLoading] = useState(false)
    const [isProfileSet, setIsProfileSet] = useState(false)
    // const [yumchas, setYumchas] = useState<Array<YumchaDataProps>>([])
    const [yumchas, setYumchas] = useState<Array<YumchaData>>([])
    const [yumchasLatLong, setYumchasLatLong] = useState<YumchaLocations[]>([])

    const profileRedirect = () => {
        if (!userLoggedIn()) {
            NotSignedInAlert()
        } else {
            router.push("./auth/profile")   
        }
    }

    const userLoggedIn = () => {
        if (user === null) {
            return false
        } else {
            return true
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
        } else if (!isProfileSet) {
            alert("You have not set up your profile!")
            router.push("./auth/profile")
        } else {
            router.push("./planYumcha")   
        }
    }

    // check whether profile has been set
    useEffect(() => {
        let isMounted = true
        
        if (user != null) {
            checkProfile({isMounted, setIsProfileSet, user})
        }

        return () => {
            isMounted = false
        }
    },  [user])
    
        
    useEffect(() => {
        let isMounted = true
        getAllYumchas({isMounted, setLoading, setData: setYumchas})

        return () => {
            isMounted = false
        }
    }, [])

    // useEffect(() => {
    //     let yumchasWithLoc: YumchaLocations[] = []
    //     let isMounted = true

    //     if (yumchas.length > 0) {
    //         yumchas.map(yumcha => {
    //             if (yumcha.yumcha.id && yumcha.yumcha.latLong){
    //                 const yumchaLocation: YumchaLocations = {
    //                     id: yumcha.yumcha.id,
    //                     latLong: yumcha.yumcha.latLong
    //                 }
    //                 yumchasWithLoc.push(yumchaLocation)
    //             }
    //         })

    //         if (isMounted) {
    //             setYumchasLatLong(yumchasWithLoc)
    //         }  
    //     }

    //     return () => {
    //         isMounted = false
    //     }
    // }, [yumchas])

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
                console.log(data)
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
                <Navbar loggedIn={userLoggedIn()} />
            </header>

            <main className={styles.main}>
                <div className={styles.topLine}>
                    <span className={styles.profile}>Edit your Profile</span>
                    <button className={styles.profileButton} onClick={profileRedirect}>
                        <HomeAvatar />
                    </button>
                    
                </div>

                <div>
                    <Map markerLocations={yumchasLatLong} />
                </div>

                <div className={styles.yumchaTitle}>

                    <div className={styles.titleDiv}>
                        <h4>My Yumchas</h4> 
                        {/* <button>Refresh (&nbsp;)</button> */}
                    </div>
                    <MyYumchas userCreatedYumcha={true} yumchas={yumchas} isProfileSet = {isProfileSet} /> 

                    <div className={styles.center}>
                        <span>Can't find any yumchas you like?</span>
                        <button className={buttonStyles.button} id={styles.planButton} onClick={planYumcha}>Plan Yumcha</button>
                    </div>

                    <div className={styles.titleDiv}>
                        <h4>Nearby Yumchas</h4>
                        {/* <button>Refresh (&nbsp;)</button> */}
                    </div>
                    <MyYumchas userCreatedYumcha={false} yumchas={yumchas} isProfileSet = {isProfileSet} />
                    
                </div>
            </main>
        </>
    )
}

export default Home