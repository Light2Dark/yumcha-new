import styles from "./styles.module.css"
import Image from "next/image"
import { getDateInString, getTimeInString } from "../../../utils/usefulFuncs"
import Avatar from "../Avatar/Avatar"
import {EndYumcha, JoinYumcha} from "../../../pages/api/updateDB"
import { supabase } from "../../../utils/supabaseClient"
import { useState } from "react"

interface Profile {
    id: string
    firstName: string
    avatarUrl: string
    bio: string
    gender: string
}

export interface YumchaProfile {
    yumchaID: string
    userID: string
    creator: boolean
}

export interface YumchaData {
    id: number
    username: string
    seat: string
    date: string
    time: string
    yumchaName: string
    description: string
    sameGender: boolean
    tempPlace?: string
    numPeopleJoin?: number
    latLong: string

    'yumcha-profiles': YumchaProfile[]
    profiles: Profile[]
}

export interface YumchaDataProps {
    yumchaData: YumchaData[]
}

const YumchaExpanded = ({yumchaData}: YumchaDataProps) => {
    const yumcha: YumchaData = yumchaData[0]
    const user = supabase.auth.user()
    const [loading, setLoading] = useState(false)

    const timeString = getTimeInString(yumcha.time)
    const dateString = getDateInString(yumcha.date)

    let creatorID = ""
    let creatorName = ""
    let creatorUrl = ""

    yumcha["yumcha-profiles"].map(yumchaProfile => {
        if (yumchaProfile.creator === true) {
            creatorID = yumchaProfile.userID
            yumcha.profiles.map(profile => {
                if (profile.id === yumchaProfile.userID) {
                    creatorName = profile.firstName
                    creatorUrl = profile.avatarUrl
                }
            })
        }
    })

    return(
        <div className={styles.expandedCard}>
            <span className={styles.heading}>{yumcha.yumchaName}</span>

            <div className={`${styles.flex} ${styles.mainDiv}`}>
                <p className={styles.mainText}>{yumcha.description}</p>
                <div className={styles.profileFlex}>
                    <div className={styles.mainAvatar}>
                        <Avatar size={50} url={creatorUrl} />
                    </div>
                    <span className={styles.name}>{creatorName}</span>
                </div>
            </div>

            <div className = {styles.logos}>
                <div>
                    <Image src="/logos/time.svg" alt="logo of a clock" height={25} width={25} />
                    <span>{timeString}</span>
                </div>
                
                <div>
                    <Image src="/logos/calendar.svg" alt="logo of a calendar" height={25} width={25} />
                    <span>{dateString}</span>
                </div>
                
                <div>
                    <Image src="/logos/marker.svg" alt = "Logo of a marker" height={25} width={25} />
                    <span>{yumcha.tempPlace}</span>
                </div>
            </div>

            <div>
                <p className={styles.subheading}>People Joining</p>

                <div className={styles.people}>

                    {yumcha.profiles.map(person => {
                        if (creatorID === person.id) {
                            return null
                        }

                        return(
                            <PersonJoin id = {person.id} avatarUrl={person.avatarUrl} bio={person.bio} firstName={person.firstName} gender={person.gender} key={person.id} />
                        )
                    })}

                </div>
            </div>

            <div className={styles.center}>
                {
                    loading ? <button className={styles.button}>Loading</button> :
                    user ?
                        user.id === creatorID ? 
                            <button className={styles.button} onClick = {() => {EndYumcha(yumcha.id, setLoading)}}>End Yumcha</button> :
                            <button className={styles.button} onClick = {() => {JoinYumcha(yumcha.id, user.id, setLoading)}}>Join Yumcha</button>
                    :   <button className={styles.button}>Error!</button>
                }
            </div>
        </div>
    )
}

const PersonJoin = ({id, firstName, avatarUrl, bio, gender}: Profile) => {
    return(
        <div className={styles.flex}>
            <div className={styles.profileFlex}>
                <div className={styles.otherAvatar}>
                    <Avatar size={40} url={avatarUrl} />
                </div>
                <span className={styles.otherName}>{firstName}</span>
            </div>
            <div className={styles.bio}>
                <span>{bio}</span>
            </div>
        </div>
    )
}

export default YumchaExpanded