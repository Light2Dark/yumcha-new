import { useEffect, useState } from "react"
import { supabase } from "../../../utils/supabaseClient"
import Head from "next/head"

import styles from "./styles.module.css"
import { YumchaProps } from "../YumchaCard/yumchaCard"
import YumchaCard from "../YumchaCard/yumchaCard"

export interface Yumchas {
    yumcha: YumchaProps;
    yumchaID: string
    userID: string
}

const MyYumchas = () => {
    const [loading, setLoading] = useState(false)
    // const [yumchas, setYumchas] = useState<Array<typeof YumchaCard>>([])
    const [yumchas, setYumchas] = useState<Array<Yumchas>>([])
    const user = supabase.auth.user()
    
    useEffect(() => {
        GetYumchas()

        return () => {
            // this function will be called after the above functions finish
            // can do cleanup here
        }
    }, [])
    

    async function GetYumchas() {
        try {
            setLoading(true)
            let {data, error, status} = await supabase
                .from("yumcha-profiles")
                .select(`
                    yumchaID,
                    userID,
                    yumcha (
                        id,
                        username,
                        seat,
                        date,
                        time,
                        yumchaName,
                        description,
                        sameGender,
                        tempPlace,
                        numPeopleJoin
                    )
                `)
                .eq("userID", user?.id)   
            
            if (error && status !== 406) {
                console.log("error not 406")
                throw error
            }

            if (data) {
                setYumchas(data)
            }

        } catch(error: any) {
            console.error(error.message || error.description)

        } finally {
            setLoading(false)
        }
    }
    
    if (loading) {
        return(
            <>
                <p>Loading..</p>
            </>
        )
    }

    return(
        <>
            {/* {yumchas.map(({description, tempPlace, time, username, yumchaName, id, date, seat, numPeopleJoin, sameGender}: any) => {
                return(
                    <YumchaCard description={description} tempPlace={tempPlace} time={time} username={username} yumchaName={yumchaName} key={id} date={date} seat={seat} numPeopleJoin={numPeopleJoin} id={id} />
                )
            })} */}

            {
                yumchas.map(yumchaData => {
                    console.log(yumchaData.yumcha)
                    return(
                        <YumchaCard date={yumchaData.yumcha.date} description={yumchaData.yumcha.description} seat={yumchaData.yumcha.seat} yumchaName={yumchaData.yumcha.yumchaName} tempPlace={yumchaData.yumcha.tempPlace} time={yumchaData.yumcha.time} username={yumchaData.yumcha.username} key={yumchaData.yumchaID} />
                    )
                })
            }
        </>
    )
}

export default MyYumchas

/* yoo, put supabase stuff here, import yumcha cards here
Our DB should have 3 tables, my yumchas includes yumchas created by us and yumchas we have joined*/