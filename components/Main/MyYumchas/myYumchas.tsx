import { useEffect, useState } from "react"
import { supabase } from "../../../utils/supabaseClient"
import Head from "next/head"

import styles from "./styles.module.css"
import { YumchaProps } from "../YumchaCard/yumchaCard"
import YumchaCard from "../YumchaCard/yumchaCard"

const MyYumchas = () => {
    const [loading, setLoading] = useState(false)
    const [yumchas, setYumchas] = useState<Array<typeof YumchaCard>>([])
    
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
            
            if (error && status !== 406) {
                console.log("error not 406")
                throw error
            }

            if (data) {
                setYumchas(data)
                console.log(yumchas)
                let yums = yumchas.map(yumcha => yumcha)
                console.log(yums)
            }

        } catch(error: any) {
            console.error(error.message || error.description)

        } finally {
            setLoading(false)
        }
    }
    

    return(
        <>
            
        </>
    )
}

export default MyYumchas

/* yoo, put supabase stuff here, import yumcha cards here
Our DB should have 3 tables, my yumchas includes yumchas created by us and yumchas we have joined*/