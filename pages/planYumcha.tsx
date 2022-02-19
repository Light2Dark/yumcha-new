import type {NextPage} from "next"
import Head from "next/head"
import Navbar from "../components/Header/Navbar/Navbar"
import ToggleNav from "../components/Header/MainNav/ToggleNav"
import mainStyles from "../styles/main.module.css"
import YumchaForm from "../components/Main/YumchaForm/yumchaForm"
import Map from "../components/Main/Map/map"


const Page: NextPage = () => {
    return(
        <>
            <Head>
                <title>Yumcha</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header>
                <Navbar />
            </header>

            <main>
                <ToggleNav currentPage="Plan Yumcha" initialTitle="Virtual" switchedTitle="F2F" link="./planVirtual" />
                <Map />

                <div>
                    <YumchaForm />
                </div>
                

            </main>
        </>
    )
}

export default Page