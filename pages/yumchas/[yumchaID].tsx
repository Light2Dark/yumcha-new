// we assume they will have to be logged in to access this page
// path will be /yumchas/[yumchaID].tsx

import Head from "next/head"
import Navbar from "../../components/Header/Navbar/Navbar"
import YumchaExpanded from "../../components/Main/YumchaPage/yumchaExpanded"
import { supabase } from "../../utils/supabaseClient"
import { getAllYumchaIds, getYumchaData } from "../api/yumchaExpanded"

const Yumcha = ({yumcha}: any) => {

    console.log(yumcha)
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

// export async function getStaticPaths() {
//     // returns list of possible yumchaID's
//     const paths = await getAllYumchaIds()
//     return {
//         paths,
//         fallback: false
//     }
// }

// // this function will run X times, where X is the number of pages / yumchas
// export const getStaticProps = async (context: any) => {
//     const id = context.params.yumchaID
//     const response = await getYumchaData(id)
//     const data = JSON.stringify(response)
//     return {
//         props: {yumcha: data}
//     }
// }

// export async function getStaticProps({params}: any) {
//     // fetch data for the yumcha page using params.id
// }

export default Yumcha