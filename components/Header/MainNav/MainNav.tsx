import styles from "./mainNav.module.css"

interface Props {
    currentPage: string
}

const MainNav = ({currentPage}: Props) => {

    const switchToVirtualYumchas = () => {
        console.log("switch");
    }

    return(
        <>
            <div className={styles.topTitle}>
                <span><a className = "back-btn">&#60;</a></span>
                <h2>{currentPage}</h2>
                <div className = {`${styles.checkboxContainer} ${styles.blue}`}>
                    <span>Virtual</span>
                    <input type="checkbox" id="toggle" />
                    <label htmlFor="toggle" onClick={switchToVirtualYumchas}></label>
                    <span className={styles.activeCirlce}></span>
                </div>
            </div>            
        </>
    )
}

export default MainNav