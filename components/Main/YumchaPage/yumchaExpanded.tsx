import styles from "./styles.module.css"

const YumchaExpanded = () => {
    return(
        <div className={styles.expandedCard}>
            <span className={styles.heading}>Dinner</span>

            <div className={`${styles.flex} ${styles.mainDiv}`}>
                <p className={styles.mainText}>Yo! Let's meet and have some good food at a place nearby</p>
                <div className={styles.profileFlex}>
                    <div className={styles.mainAvatar}></div>
                    <span className={styles.name}>Adam</span>
                </div>
            </div>

            <div>
                <p className={styles.subheading}>People Joining</p>

                <div className={styles.people}>

                    <div className={styles.flex}>
                        <div className={styles.profileFlex}>
                            <div className={styles.otherAvatar}></div>
                            <span className={styles.otherName}>Ben</span>
                        </div>
                        <span>Hi! I'm Ben and I like popcorn and lollipops.</span>
                    </div>

                    <div className={styles.flex}>
                        <div className={styles.profileFlex}>
                            <div className={styles.otherAvatar}></div>
                            <span className={styles.otherName}>Ben</span>
                        </div>
                        <span>Hi! I'm Ben and I like popcorn and lollipops.</span>
                    </div>

                </div>
            </div>

            <div className={styles.center}>
                <button className={styles.button}>Join / End</button>
            </div>
        </div>
    )
}

export default YumchaExpanded