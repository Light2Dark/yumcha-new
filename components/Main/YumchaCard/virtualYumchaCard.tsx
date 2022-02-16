import styles from "./yum.module.css"
import Image from "next/image"
import face from "../../../public/images/profileface.png"

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
}

const Card = ({username, yumchaName, time, description, onlineLink} : VirtualYumchaProps) => {

    const timeString = time
    const timeString12hr = new Date('1970-01-01T' + timeString + 'Z')
      .toLocaleTimeString('en-US',
        {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}
      );

    return(
        <>
            <div className={styles.f2fyumcha}>
                <div className={styles.visible}>
                    <span><b>{username}</b></span>
                    <span className={styles.title}>{yumchaName}<span className = {styles.time}>{timeString12hr}</span></span>
                    {/* <div className = {styles.expandBtn} onClick = {() => console.log("expandF2FYumcha(this)")}><b>&#62;</b></div> */}
                </div>
                <div className={styles.expanded}>
                    <Image src={face} alt="Face of person" className={styles.f2fimg} height={"45px"} width={"45px"}  />

                    <div className={styles.midText}>
                        <span>{description}</span>
                        {/* <span className={styles.place}>Zoom / Google Meet</span> */}
                    </div>

                    <span className={styles.join}><a href={onlineLink}>Join</a></span>
                </div>
            </div>
        </>
    )
}

export default Card