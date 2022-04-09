import styles from "./nav.module.css"
import Link from "next/link"

type Props = {
    loggedIn?: boolean;
}

export default function Navbar({loggedIn}: Props) {

    let link = "/home"
    if (!loggedIn) {
        link = "/"
    } 

    return (
        <div className={styles.container}>
            <Link href={link} passHref>
                <span className={styles.heading}>Yumcha</span>
            </Link>
        </div>
    )
}