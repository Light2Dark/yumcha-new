import type {NextPage} from "next"
import Head from "next/head"
import Navbar from "../components/Header/Navbar/Navbar"
import MainNav from "../components/Header/MainNav/MainNav"
import YumchaCard from "../components/Main/YumchaCard/yumchaCard"
import mainStyles from "../styles/main.module.css"

import { useState } from "react"

const Page: NextPage = () => {

    const [yumchas, setYumchas] = useState<typeof YumchaCard[]>([])

    return(
        <>
            <Head>
                <title>Yumcha Now</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header>
                <Navbar />
            </header>

            <main>
                <MainNav currentPage="Physical Yumchas" />
                {/* <div id ="map">
                     
                </div> */}
                <div className={mainStyles.card}>
                    <h3>Current Yumchas:</h3>
                    <YumchaCard />
                    <YumchaCard />

                    <h3>Upcoming Yumchas:</h3>
                    <YumchaCard />
                </div>
                

            </main>
        </>
    )
}

export default Page