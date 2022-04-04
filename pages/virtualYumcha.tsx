import type {NextPage} from "next"
import Head from "next/head"
import MainNav from "../components/Header/MainNav/MainNav"
import mainStyles from "../styles/main.module.css"
import emailjs from "@emailjs/browser"
import Navbar from "../components/Header/Navbar/Navbar";

import VirtualYumchaCard from "../components/Main/YumchaCard/virtualYumchaCard"
import VirtualYumchaProps from "../components/Main/YumchaCard/virtualYumchaCard"

import { useEffect, useState} from "react"
import { supabase } from "../utils/supabaseClient"

const Page: NextPage = () => {
    const [loading, setLoading] = useState(false)
    const [virtualYumchas, setVirtualYumchas] = useState<Array<typeof VirtualYumchaCard>>([])

    useEffect(() => {
      GetVirtualYumchas()
    
      return () => {
        // this function will be called after the above functions finish
        // can do cleanup here
      }
    }, [])

    const SendEmail = () => {

    }
    

    async function GetVirtualYumchas() {
        try {
            setLoading(true)
            let {data, error, status} = await supabase
                .from("virtualYumcha")
                .select()
            
            if (error && status !== 406) {
                console.log("error not 406")
                throw error
            }

            if (data) {
                setVirtualYumchas(data)
                console.log(virtualYumchas)
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
                <title>Yumcha</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header>
                <Navbar />
            </header>

            <main>
                <MainNav currentPage="Virtual Yumchas" />
                {/* <div id ="map">
                     
                </div> */}
                <div className={mainStyles.card}>
                    <div className={mainStyles.flex}>
                        <h3>Yumchas:</h3> 
                        <button className={mainStyles.button} onClick={() => {GetVirtualYumchas()}}>Refresh</button>
                    </div>

                    {virtualYumchas.map(({description, time, username, yumchaName, id, date, onlineLink, numPeopleJoin }: any) => {
                        return(
                            <VirtualYumchaCard description={description} time={time} username={username} yumchaName={yumchaName} key={id} date={date} onlineLink={onlineLink} numPeopleJoin={numPeopleJoin} id = {id} />
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