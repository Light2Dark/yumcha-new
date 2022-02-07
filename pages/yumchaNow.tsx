import type {NextPage} from "next"
import Head from "next/head"
import Navbar from "../components/Header/Navbar/Navbar"
import MainNav from "../components/Header/MainNav/MainNav"
import YumchaCard from "../components/Main/YumchaCard/yumchaCard"
import { YumchaProps } from "../components/Main/YumchaCard/yumchaCard"
import mainStyles from "../styles/main.module.css"

import { useEffect, useState } from "react"
import { supabase } from "../utils/supabaseClient"

type Props = {
    session: any;
}

// const Yumcha = ({session}: Props) => {
    

//     return (
//         <>

//         </>
//     )
// }

const Page = ({session}: Props) => {
    // const [yumchas, setYumchas] = useState<typeof YumchaCard[]>([])
    const [loading, setLoading] = useState(false)
    const [yumchas, setYumchas] = useState<Array<typeof YumchaCard>>([])

    useEffect(() => {
        GetYumchas()
    }, [session])
    

    async function GetYumchas() {
        try {
            setLoading(true)
            let {data, error, status} = await supabase
                .from("yumcha")
                .select()

            // let { data: yumcha, error } = await supabase
            //     .from('yumcha')
            //     .select('*')
                      
            
            if (error && status !== 406) {
                console.log("error not 406")
                throw error
            }

            if (data) {
                setYumchas(data)
                console.log(yumchas)
            }

        } catch(error) {
            console.error(error)

        } finally {
            setLoading(false)
        }
    }

    async function AddYumcha() {
        try {
            setLoading(true)
            let {data: yumcha, error, status} = await supabase
                .from("yumcha")
                .insert([
                    {username: "Shahmirasd"}
                ])

            
            // let { data: yumcha, error } = await supabase
            //     .from('yumcha')
            //     .select('*')
                      
            
            if (error && status !== 406) {
                console.log("error not 406")
                throw error
            }

            if (yumcha) {
                console.log("yumcha", yumcha)
            }

        } catch(error) {
            console.error(error)

        } finally {
            setLoading(false)
        }
    }


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
                    {yumchas.map(({description, phoneNum, place, time, username, yumchaTitle, id}: YumchaProps) => {
                        return(
                            <YumchaCard description={description} phoneNum={phoneNum} place={place} time={time} username={username} yumchaTitle={yumchaTitle} key={id} />
                        )
                    })}

                    <h3>Upcoming Yumchas:</h3>
                    {/* <YumchaCard /> */}
                </div>
                <button className={mainStyles.button} onClick={() => {}}>Get Yumcha</button>

            </main>
        </>
    )
}

export default Page