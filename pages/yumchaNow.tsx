import type {NextPage} from "next"
import Head from "next/head"
import Navbar from "../components/Header/Navbar/Navbar"
import MainNav from "../components/Header/MainNav/MainNav"
import YumchaCard from "../components/Main/YumchaCard/yumchaCard"
import { YumchaProps } from "../components/Main/YumchaCard/yumchaCard"
import mainStyles from "../styles/main.module.css"

import { useEffect, useState } from "react"
import { supabase } from "../utils/supabaseClient"

const Page = () => {
    const [loading, setLoading] = useState(false)
    const [yumchas, setYumchas] = useState<Array<typeof YumchaCard>>([])

    useEffect(() => {
        GetYumchas()
    }, [])
    

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
                    <div className={mainStyles.flex}>
                        <h3>Yumchas:</h3> 
                        <button className={mainStyles.button} onClick={() => {GetYumchas()}}>Refresh</button>
                    </div>

                    {yumchas.map(({description, phoneNum, tempPlace, time, username, yumchaName, id, date, seat}: YumchaProps) => {
                        return(
                            <YumchaCard description={description} phoneNum={phoneNum} tempPlace={tempPlace} time={time} username={username} yumchaName={yumchaName} key={id} date={date} seat={seat} />
                        )
                    })}

                    {/* <h3>Upcoming Yumchas:</h3> */}
                    {/* <YumchaCard /> */}
                </div>

            </main>
        </>
    )
}

export default Page