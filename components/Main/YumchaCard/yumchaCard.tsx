import styles from "./yum.module.css"
import Image from "next/image"
import userIcon from "../../../public/images/usercircle.svg"
import { supabase } from "../../../utils/supabaseClient"
import { useEffect, useState } from "react"

export interface YumchaProps {
    id?: number;
    inserted_at?: String;
    username: String;
    date: String;
    time: String;
    tempPlace: String;
    seat: String;
    yumchaName: String;
    description: String;
    sameGender?: Boolean;
    numPeopleJoin?: number;
}

const Card = ({username, yumchaName, time, description, tempPlace, seat, numPeopleJoin, id} : YumchaProps) => {

    const [numPeopleYumcha, setNumPeopleYumcha] = useState(numPeopleJoin!)
    const [loading, setLoading] = useState(false)
    const [updatingDB, setUpdatingDB] = useState(false)

    function ConfirmYumcha() {
        if (confirm("Join this yumcha?")) {
            setNumPeopleYumcha(numPeopleYumcha + 1)
            setUpdatingDB(true)
        }
    }

    async function UpdateDB() {
        try {
            setLoading(true)
            const {data, error} = await supabase
                .from("yumcha")
                .update({numPeopleJoin: numPeopleYumcha})
                .match({id: id})
            
            if(data) {
                alert("Joining! Enjoy your yumcha.")
            }

            if (error) {
                throw error
            }
        }
        catch(error) {
            console.error(error)
            alert("Error")
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if(updatingDB) {
            UpdateDB()
        }

        return () => {
            setUpdatingDB(false)
        }
    }, [numPeopleYumcha])
    

    const timeString = time
    const timeString12hr = new Date('1970-01-01T' + timeString + 'Z')
      .toLocaleTimeString('en-US',
        {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}
      );
      
    // let num = "6" + phoneNum
    // const whatsapp = `https://wa.me/${num}`

    return(
        <>
            <div className={styles.twoCards}>
                <div className={styles.f2fyumcha}>
                    <div className={styles.visible}>
                        <span><b>{username}</b></span>
                        <span className={styles.title}>{yumchaName}</span>
                        <span className = {styles.time}>{timeString12hr}</span>
                        {/* <div className = {styles.expandBtn} onClick = {() => console.log("expandF2FYumcha(this)")}><b>&#62;</b></div> */}
                    </div>
                    <div className={styles.expanded}>
                        <Image src={userIcon} alt="Icon of a person" className={styles.f2fimg} height={"50px"} width={"50px"} />

                        <div className={styles.midText}>
                            <span>{description}</span>
                            <span className={styles.place}>{tempPlace}, {seat}</span>
                        </div>

                        <button className={styles.join} onClick={ConfirmYumcha}>Join</button>
                        {/* <span className={styles.join}><a href={whatsapp}>Chat</a></span> */}
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
                            <span>{numPeopleYumcha} people joining!</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card