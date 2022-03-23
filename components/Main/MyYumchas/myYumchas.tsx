import { useEffect, useState } from "react"
import { supabase } from "../../../utils/supabaseClient"
import Head from "next/head"

import styles from "./styles.module.css"
import { YumchaProps } from "../YumchaCard/yumchaCard"
import YumchaCard from "../YumchaCard/yumchaCard"

export interface Yumchas {
    yumcha: YumchaProps;
    profiles: ProfileProps
}

type ProfileProps = {
    id: string
    avatarUrl: string
}

type Props = {
    userCreatedYumcha: Boolean
}

const MyYumchas = ({userCreatedYumcha}: Props) => {
    const [loading, setLoading] = useState(false)
    // const [yumchas, setYumchas] = useState<Array<typeof YumchaCard>>([])
    const [yumchas, setYumchas] = useState<Array<Yumchas>>([])
    const user = supabase.auth.user()
    
    useEffect(() => {
        if (userCreatedYumcha) {
            GetMyYumchas()
        } else {
            GetAllYumchas()
        }

        return () => {
            // this function will be called after the above functions finish
            // can do cleanup here
        }
    }, [])
    

    async function GetMyYumchas() {
        try {
            setLoading(true)
            let {data, error, status} = await supabase
                .from("yumcha-profiles")
                .select(`
                    yumchaID,
                    userID,
                    creator,
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
                .eq("userID", user?.id)   // should only select the yumchas a user creates
            
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

    async function GetAllYumchas() {
        try {
            setLoading(true)
            let {data, error, status} = await supabase
                .from("yumcha-profiles")
                .select(`
                    yumchaID,
                    userID,
                    creator,
                    profiles (
                        id,
                        avatarUrl
                    ),
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
                .not("userID", "eq", user?.id)   
            
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
            {
                yumchas.map(yumchaData => {
                    console.log("each Yumcha", yumchaData)
                    console.log("avatarUrl", yumchaData.profiles.avatarUrl)
                    return(
                        <YumchaCard date={yumchaData.yumcha.date} description={yumchaData.yumcha.description} seat={yumchaData.yumcha.seat} yumchaName={yumchaData.yumcha.yumchaName} tempPlace={yumchaData.yumcha.tempPlace} time={yumchaData.yumcha.time} username={yumchaData.yumcha.username} key={yumchaData.yumcha.id} creator={yumchaData.yumcha.creator} avatarUrl={yumchaData.profiles.avatarUrl} />
                    )
                })
            }
        </>
    )
}

export default MyYumchas

/* yoo, put supabase stuff here, import yumcha cards here
Our DB should have 3 tables, my yumchas includes yumchas created by us and yumchas we have joined*/