import styles from "./yum.module.css"
import Image from "next/image"
import userIcon from "../../../public/images/usercircle.svg"
import emailjs from "@emailjs/browser"
import { useEffect, useState } from "react"
import { supabase } from "../../../utils/supabaseClient"

export interface VirtualYumchaProps {
    id?: number;
    inserted_at?: string;
    username: string;
    date: string;
    time: string;
    yumchaName: string;
    description: string;
    sameGender?: boolean;
    onlineLink: string;
    numPeopleJoin?: number;
}

const Card = ({username, yumchaName, time, description, onlineLink, numPeopleJoin, id} : VirtualYumchaProps) => {

    // const [updatingDB, setUpdatingDB] = useState(false)
    // const [loading, setLoading] = useState(false)
    // const [numPeopleYumcha, setNumPeopleYumcha] = useState(numPeopleJoin!)

    // useEffect(() => {
    //     if(updatingDB) {
    //         UpdateDB()
    //     }

    //     return () => {
    //         setUpdatingDB(false)
    //     }
    // }, [numPeopleYumcha])

    // async function UpdateDB() {
    //     try {
    //         setLoading(true)
    //         const {data, error} = await supabase
    //             .from("virtualYumcha")
    //             .update({numPeopleJoin: numPeopleYumcha})
    //             .match({id: id})
            
    //         if(data) {
    //             alert("Joining! Enjoy your virtual yumcha.")
    //         }

    //         if (error) {
    //             throw error
    //         }
    //     }
    //     catch(error) {
    //         console.error(error)
    //         alert("Error")
    //     }
    //     finally {
    //         setLoading(false)
    //     }
    // }

    // const SendEmail = (e: any) => {
    //     e.preventDefault()
    //     const email = prompt("Enter your email to receive the yumcha link!")

    //     let templateParams = {
    //         yumchaID: id,
    //         yumcha: yumchaName,
    //         userEmail: email,
    //         yumchaLink: onlineLink,
    //         time: time,
    //         description: description
    //     }

    //     emailjs.send(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_KEY || "", process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "", templateParams, process.env.NEXT_PUBLIC_EMAILJS_USER_ID)
    //         .then((result) => {
    //             console.log(result.text)
    //             setUpdatingDB(true)
    //             setNumPeopleYumcha(numPeopleYumcha + 1) // all db updates goes here

    //         }, (error) => {
    //             alert(error.text)
    //         })
    // }

    // const timeString = time
    // const timeString12hr = new Date('1970-01-01T' + timeString + 'Z')
    //   .toLocaleTimeString('en-US',
    //     {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}
    //   );

    // return(
    //     <>
    //         <div className={styles.twoCards}>
    //             <div className={styles.f2fyumcha}>
    //                 <div className={styles.visible}>
    //                     <span><b>{username}</b></span>
    //                     <span className={styles.title}>{yumchaName}</span>
    //                     <span className = {styles.time}>{timeString12hr}</span>
    //                     {/* <div className = {styles.expandBtn} onClick = {() => console.log("expandF2FYumcha(this)")}><b>&#62;</b></div> */}
    //                 </div>
    //                 <div className={styles.expanded}>
    //                     <Image src={userIcon} alt="Icon of person" className={styles.f2fimg} height={"50px"} width={"50px"}  />

    //                     <div className={styles.midText}>
    //                         <span>{description}</span>
    //                         {/* <span className={styles.place}>Zoom / Google Meet</span> */}
    //                     </div>

    //                     <button className={styles.join} onClick={SendEmail}>Join</button>
    //                 </div>
    //             </div>

    //             <div className={styles.bottomContainer}>
    //                 <div className={styles.bottomCard}>
    //                     <div className={styles.joiners}>
    //                         <Image src={userIcon} alt="Small icon of a person" height={"30px"} width={"30px"} />
    //                         <Image src={userIcon} alt="Small icon of a person" height={"30px"} width={"30px"} />
    //                         <Image src={userIcon} alt="Small icon of a person" height={"30px"} width={"30px"} />
    //                     </div>
    //                     <div>
    //                         <span>{numPeopleJoin} people joining!</span>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </>
    // )

    return (
        <>
            
        </>
    )
}

export default Card