import Head from "next/head"
import Image from "next/image"
import userAvatar from "../public/images/user.png"

import Navbar from "../components/Header/Navbar/Navbar"
import mainStyles from "../../styles/main.module.css"
import styles from "../styles/home.module.css"

const Home = () => {
    return(
        <>
            <Head>
                <title>Yumcha</title>
                <meta name="description" content="Place to meet new people over food!" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header>
                <Navbar />
            </header>

            <main className={styles.main}>
                <div className={styles.topLine}>
                    <span className={styles.profile}>Edit your Profile</span>
                    <Image src={userAvatar} alt="Your user profile" height={40} width={40} />
                </div>

                <div className={styles.mapDiv}>
                    <span>Google Maps API</span>
                </div>

                <p>My Yumchas</p>

                <p>Nearby Yumchas</p>
            </main>
        </>
    )
}

export default Home