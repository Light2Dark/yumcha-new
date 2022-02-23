import styles from "./yum.module.css"
import Image from "next/image"
import userIcon from "../../../public/images/usercircle.svg"

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

const Card = ({username, yumchaName, time, description, onlineLink, numPeopleJoin} : VirtualYumchaProps) => {

    const timeString = time
    const timeString12hr = new Date('1970-01-01T' + timeString + 'Z')
      .toLocaleTimeString('en-US',
        {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}
      );

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
                        <Image src={userIcon} alt="Icon of person" className={styles.f2fimg} height={"50px"} width={"50px"}  />

                        <div className={styles.midText}>
                            <span>{description}</span>
                            {/* <span className={styles.place}>Zoom / Google Meet</span> */}
                        </div>

                        <button className={styles.join}><a href={onlineLink}>Join</a></button>
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
                            <span>X people joining!</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card