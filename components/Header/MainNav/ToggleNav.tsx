import styles from "./mainNav.module.css"
import Toggle from "../Toggle/toggle"

interface Props {
    currentPage: string;
    initialTitle: string;
    switchedTitle: string;
    link?: string;
}

const MainNav = ({currentPage, initialTitle, switchedTitle, link}: Props) => {

    return(
        <>
            <div className={styles.topTitle}>
                {/* <span><a className = "back-btn">&#60;</a></span> */}
                <h2>{currentPage}</h2>
                <Toggle initialTitle ={initialTitle} switchedTitle={switchedTitle} link={link} />
            </div>            
        </>
    )
}

export default MainNav