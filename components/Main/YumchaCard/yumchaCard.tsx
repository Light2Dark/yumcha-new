import styles from "./yum.module.css"
import Image from "next/image"
import userIcon from "../../../public/images/usercircle.svg"
import { supabase } from "../../../utils/supabaseClient"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
// import { YumchaCardAvatar } from "../Avatar/Avatar"
import Avatar from "../Avatar/Avatar"

export interface YumchaProps {
    id: number;
    inserted_at?: String;
    username: String;
    date: String;
    time: String;
    locationString: String;
    latLong: string; // could be array
    seat: String;
    yumchaName: String;
    description: String;
    sameGender?: Boolean;
    numPeopleJoin?: number;
    avatarUrl?: string;
    userCreatedYumcha: boolean;
    isProfileSet?: boolean
}

const Card = ({username, yumchaName, time, description, locationString, seat, numPeopleJoin, date, sameGender, id, userCreatedYumcha, isProfileSet, avatarUrl} : YumchaProps) => {

    const [numPeopleYumcha, setNumPeopleYumcha] = useState(numPeopleJoin!)
    const [loading, setLoading] = useState(false)
    const [updatingDB, setUpdatingDB] = useState(false)
    const [deletingDB, setDeletingDB] = useState(false)
    const router = useRouter()

    function GoToYumchaPage(id: number) {
        // check whether user has profile
        if (isProfileSet) {
            // redirect to yumcha page
            const link = "/yumchas/" + id
            router.push(link)
        } else if (isProfileSet === false) {
            alert("Set up your profile first!")
            router.push("./auth/profile")
        }
    } 
    

    // async function UpdateDB() {
    //     try {
    //         setLoading(true)
    //         const {data, error} = await supabase
    //             .from("yumcha")
    //             .update({numPeopleJoin: numPeopleYumcha})
    //             .match({id: id})
            
    //         if(data) {
    //             alert("Joining! Enjoy your yumcha.")
    //         }

    //         if (error) {
    //             throw error
    //         }
    //     }
    //     catch(error: any) {
    //         console.error(error.message || error.description)
    //     }
    //     finally {
    //         setLoading(false)
    //     }
    // }

    const timeString = time
    const timeString12hr = new Date('1970-01-01T' + timeString + 'Z')
      .toLocaleTimeString('en-US',
        {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}
      );

    const year = parseInt(date.slice(0,4))
    const month = parseInt(date.slice(5,7))
    const day = parseInt(date.slice(8,10))
    const dateString = new Date(Date.UTC(year, month, day))
    const options = {day: "2-digit", month: "short"} as const
    const dateStr = dateString.toLocaleDateString("en-US", options)
    if (locationString) {
        const loc = locationString.split(",")
        locationString = loc[0]
    }
    

    return(
        <>
            <div className={styles.twoCards}>
                <div className={styles.f2fyumcha}>
                    <div className={styles.visible}>
                        <span><b>{username}</b></span>
                        <span className={styles.title}>{yumchaName}</span>
                        <span className = {styles.time}>
                            {timeString12hr}<br />
                            <span>{dateStr}</span>
                        </span>
                        {/* <div className = {styles.expandBtn} onClick = {() => console.log("expandF2FYumcha(this)")}><b>&#62;</b></div> */}
                    </div>
                    <div className={styles.expanded}>
                        
                        <Avatar size={50} url={avatarUrl || ""} />
                        

                        <div className={styles.midText}>
                            <span>{description}</span>
                            <span className={styles.place}>{locationString}, {seat}</span>
                        </div>

                        <button className={styles.button} onClick={() => {GoToYumchaPage(id)}}>View</button>
                        
                    </div>
                </div>

                <div className={styles.bottomContainer}>
                    <div className={styles.bottomCard}>
                        <div className={styles.joiners}>
                            <Image src={userIcon} alt="Small icon of a person" height={"30px"} width={"30px"} />
                            <Image src={userIcon} alt="Small icon of a person" height={"30px"} width={"30px"} />
                            <Image src={userIcon} alt="Small icon of a person" height={"30px"} width={"30px"} />
                        </div>
                        <div>
                            {/* <span>{numPeopleJoin} people joining!</span> */}
                            <span> people joining!</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card