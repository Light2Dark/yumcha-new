import { useEffect, useState } from "react"
import { supabase } from "../../../utils/supabaseClient"
import { getAllYumchas } from "../../../pages/api/getYumchas"
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
    yumchas: Yumchas[]
}

const MyYumchas = ({userCreatedYumcha, yumchas}: Props) => {
    const user = supabase.auth.user()

    if (yumchas.length == 0) {
        return(
            <p>No yumchas created</p>
        )
    }

    if (!user) {
        console.log("user not logged in, so no user created yumchas")
        return (
            <p>Not logged in</p>
        )
    }

    return(
        <>
            {   
            userCreatedYumcha &&
                yumchas.map(yumchaData => {
                    if (user.id == yumchaData.profiles.id) {
                        return(
                            <YumchaCard date={yumchaData.yumcha.date} description={yumchaData.yumcha.description} seat={yumchaData.yumcha.seat} yumchaName={yumchaData.yumcha.yumchaName} tempPlace={yumchaData.yumcha.tempPlace} time={yumchaData.yumcha.time} username={yumchaData.yumcha.username} key={yumchaData.yumcha.id} creator={yumchaData.yumcha.creator} avatarUrl={yumchaData.profiles.avatarUrl} latLong={yumchaData.yumcha.latLong} />
                        )
                    }
                })
            }

            {   
            !userCreatedYumcha &&
                yumchas.map(yumchaData => {
                    if (user.id != yumchaData.profiles.id) {
                        return(
                            <YumchaCard date={yumchaData.yumcha.date} description={yumchaData.yumcha.description} seat={yumchaData.yumcha.seat} yumchaName={yumchaData.yumcha.yumchaName} tempPlace={yumchaData.yumcha.tempPlace} time={yumchaData.yumcha.time} username={yumchaData.yumcha.username} key={yumchaData.yumcha.id} creator={yumchaData.yumcha.creator} avatarUrl={yumchaData.profiles.avatarUrl} latLong={yumchaData.yumcha.latLong} />
                        )
                    }
                })
            }
        </>
    )
}

export default MyYumchas

/* yoo, put supabase stuff here, import yumcha cards here
Our DB should have 3 tables, my yumchas includes yumchas created by us and yumchas we have joined*/