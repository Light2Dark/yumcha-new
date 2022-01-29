import styles from "./nav.module.css"
import Link from "next/link"

export default function Navbar() {
    return (
        <div className={styles.container}>
            <Link href="/" passHref>
                <span className={styles.heading}>Yumcha</span>
            </Link>
        </div>
    )
}