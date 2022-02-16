import type {NextPage} from "next"
import Head from "next/head"
import Navbar from "../components/Header/Navbar/Navbar"
import ToggleNav from "../components/Header/MainNav/ToggleNav"
import VirtualYumchaForm from "../components/Main/YumchaForm/virtualForm"

const PlanVirtual: NextPage = () => {
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
                <ToggleNav currentPage="Plan Yumcha" initialTitle="Virtual" switchedTitle="F2F" link="./planYumcha" />

                <div>
                    <VirtualYumchaForm />
                </div>
                

            </main>
        </>
    )
}

export default PlanVirtual