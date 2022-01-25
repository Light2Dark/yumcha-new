import styles from "./yum.module.css"
import Image from "next/image"
import face from "../../../public/images/profileface.png"

const Card = () => {
    return(
        <>
            <div className={styles.f2fyumcha}>
                <div className={styles.visible}>
                    <span><b>Alex</b></span>
                    <span className={styles.title}>Dinner + D&D<span className = {styles.time}>12.30pm</span></span>
                    {/* <div className = {styles.expandBtn} onClick = {() => console.log("expandF2FYumcha(this)")}><b>&#62;</b></div> */}
                </div>
                <div className={styles.expanded}>
                    <Image src={face} alt="Face of person" className={styles.f2fimg} height={"45px"} width={"45px"}  />
                    <span className={styles.text}>I love Warlord! I'm behind the sign.</span>
                    <span className={styles.join}><a href="#">Join</a></span>
                </div>
            </div>
        </>
    )
}

export default Card