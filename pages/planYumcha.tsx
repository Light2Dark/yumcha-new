import type {NextPage} from "next"
import Head from "next/head"
import Navbar from "../components/Header/Navbar/Navbar"
import MainNav from "../components/Header/MainNav/MainNav"
import mainStyles from "../styles/main.module.css"

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
                <MainNav currentPage="Plan Yumcha" />
                {/* <div id ="map">
                     
                </div> */}
                <div>
                    
                </div>
                

            </main>
        </>
    )
}

export default Page