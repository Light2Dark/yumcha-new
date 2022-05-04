import { useEffect, useState } from "react"
import { supabase } from "../../../utils/supabaseClient"

import styles from "./styles.module.css"
import { YumchaProps } from "../YumchaCard/yumchaCard"
import YumchaCard from "../YumchaCard/yumchaCard"
import { YumchaData } from "../YumchaPage/yumchaExpanded"

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
    yumchas: YumchaData[]
    isProfileSet: boolean
}

const MyYumchas = ({userCreatedYumcha, yumchas, isProfileSet}: Props) => {
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
            {userCreatedYumcha &&
                yumchas.map(yumchaData => {
                    return yumchaData["yumcha-profiles"].map(yumchaProfile => {
                        const creator = yumchaData.profiles.filter(profile => profile.id === user.id)
                        let avatarUrl = ""
                        if (creator.length > 0) {
                            avatarUrl = creator[0].avatarUrl
                        }
                        
                        if (user.id === yumchaProfile.userID && yumchaProfile.creator === true) {
                            return (
                                <YumchaCard id={yumchaData.id} description = {yumchaData.description} date={yumchaData.date} latLong={yumchaData.latLong} seat={yumchaData.seat} time={yumchaData.time} username={yumchaData.username} yumchaName={yumchaData.yumchaName} userCreatedYumcha={true} locationString={yumchaData.locationString} key={yumchaData.id} isProfileSet={isProfileSet} avatarUrl={avatarUrl} numPeopleJoin={yumchaData.numPeopleJoin} />
                            )
                        }
                    })
                })
            }

            {!userCreatedYumcha &&
                yumchas.map(yumchaData => {
                    return yumchaData["yumcha-profiles"].map(yumchaProfile => {
                        if (yumchaProfile.creator === true && user.id !== yumchaProfile.userID) {
                            let creator = yumchaData.profiles.filter(profile => profile.id !== user.id)
                            let avatarUrl = ""
                            if (creator.length > 0) {
                                avatarUrl = creator[0].avatarUrl
                            }

                            return (
                                <YumchaCard id={yumchaData.id} description = {yumchaData.description} date={yumchaData.date} latLong={yumchaData.latLong} seat={yumchaData.seat} time={yumchaData.time} username={yumchaData.username} yumchaName={yumchaData.yumchaName} userCreatedYumcha={true} locationString={yumchaData.locationString} key={yumchaData.id} isProfileSet={isProfileSet} avatarUrl={avatarUrl} numPeopleJoin={yumchaData.numPeopleJoin} />
                            )
                        }
                    })
                })
            }

        </>
    )
}

export default MyYumchas