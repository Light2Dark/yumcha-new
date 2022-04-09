// we assume they will have to be logged in to access this page
// path will be /yumchas/[yumchaID].tsx

import Head from "next/head"
import Navbar from "../../components/Header/Navbar/Navbar"
import YumchaExpanded from "../../components/Main/YumchaPage/yumchaExpanded"
import { supabase } from "../../utils/supabaseClient"

const Yumcha = () => {
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

            <main>
                <YumchaExpanded />
            </main>
        </>
    )
}

export async function getAllYumchaIds() {
    try {
        const {data, error, status} = await supabase
            .from("yumcha")
            .select("id")

        if (error && status !== 406) {
            throw error
        }

        if (data) {
            data.map(id => {
                return {
                    params: {
                        id: id
                    }
                }
            })
        }
    }
    catch(error: any) {
        console.error(error)
    }
}

export async function getStaticPaths() {
    // returns list of possible yumchaID's
    const paths = await getAllYumchaIds()
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({params}: any) {
    // fetch data for the yumcha page using params.id
}

export default Yumcha