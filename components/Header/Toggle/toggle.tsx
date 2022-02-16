import { useState } from "react"
import styles from "./toggle.module.css"
import { useRouter } from "next/router"

export interface Props {
    initialTitle: string;
    switchedTitle: string;
    link?: string;
}

const Toggle = ({initialTitle, switchedTitle, link}: Props) => {
    const router = useRouter()
    const [title, setTitle] = useState(initialTitle)

    function switchToggle(e: any) {
        e.preventDefault()

        if (initialTitle == title) {
            setTitle(switchedTitle)
        } else {
            setTitle(initialTitle)
        }

        router.push(link || "")
    }

    return(
        <>
            <div className = {`${styles.checkboxContainer} ${styles.green}`}>
                <p className = {styles.title}>{title}</p>
                <input type="checkbox" id="toggle" />
                <label onClick = {switchToggle} htmlFor="toggle"></label>
                <span className ={styles.activeCircle}></span>
            </div>
        </>
    )
}

export default Toggle