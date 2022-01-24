import styles from "./yum.module.css"

const Card = () => {
    return(
        <>
            <div className={styles.f2fyumcha}>
                <div className={styles.visible}>
                    <span><b>Alex</b></span>
                    <span>Dinner + D&D<span className = {styles.time}>12.30pm</span></span>
                    <div className = {styles.expandBtn} onClick = {() => console.log("expandF2FYumcha(this)")}><b>&#62;</b></div>
                </div>
                <div className={styles.expanded}>
                    <img className = {styles.f2fimg} src="./assets/images/face.png" alt="Alex" />
                    <span>I love Warlord! I'm behind the sign.</span>
                    <span><a href="#">Join</a></span>
                </div>
            </div>
        </>
    )
}

export default Card