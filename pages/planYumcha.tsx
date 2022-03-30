import type {NextPage} from "next"
import Head from "next/head"
import Navbar from "../components/Header/Navbar/Navbar"
import mainStyles from "../styles/main.module.css"
import YumchaForm from "../components/Main/YumchaForm/yumchaForm"
import Map from "../components/Main/Map/map"


const Page: NextPage = () => {
    return(
        <>
            <Head>
                <title>Yumcha</title>
                <link rel="icon" href="/favicon.ico" />
                
                <script
                    type="text/javascript"
                    src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_MAPS_API}&libraries=places`}
                ></script>
            </Head>

            <header>
                <Navbar loggedIn={true} />
            </header>

            <main>
                <h1 className={mainStyles.h1}>F2F Yumchas</h1>
                <Map />

                <div>
                    <YumchaForm />
                </div>
                

            </main>
        </>
    )
}

export default Page