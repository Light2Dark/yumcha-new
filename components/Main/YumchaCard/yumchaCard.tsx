import styles from "./yum.module.css"
import Image from "next/image"
import face from "../../../public/images/profileface.png"

export interface YumchaProps {
    id?: number;
    inserted_at?: String;
    username: String;
    yumchaTitle: String;
    place: String;
    time: String;
    description: String;
    phoneNum: String;
}

const Card = ({username, yumchaTitle, time, description, phoneNum} : YumchaProps) => {
    return(
        <>
            <div className={styles.f2fyumcha}>
                <div className={styles.visible}>
                    <span><b>{username}</b></span>
                    <span className={styles.title}>{yumchaTitle}<span className = {styles.time}>1{time}</span></span>
                    {/* <div className = {styles.expandBtn} onClick = {() => console.log("expandF2FYumcha(this)")}><b>&#62;</b></div> */}
                </div>
                <div className={styles.expanded}>
                    <Image src={face} alt="Face of person" className={styles.f2fimg} height={"45px"} width={"45px"}  />
                    <span className={styles.text}>{description}</span>
                    <span className={styles.join}><a href="#">Join</a></span>
                </div>
            </div>
        </>
    )
}

export default Card