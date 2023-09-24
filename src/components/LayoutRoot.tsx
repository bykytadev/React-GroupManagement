import { Link, Outlet } from "react-router-dom"
import styles from "styles/root.module.scss"

export default function LayoutRoot() {
    return (
        <div className={styles.root}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <ul>
                        <li>
                            <Link to="/" className={styles["header__link"]}>Home Page</Link>
                        </li>
                        <li>
                            <Link to="login" className={styles["header__link"]}>Login</Link>
                        </li>
                        <li>
                            <Link to="create-new-account" className={styles["header__link"]}>Create new account</Link>
                        </li>
                        <li>
                            <Link to="reset-password" className={styles["header__link"]}>Reset password</Link>
                        </li>
                        <li>
                            <Link to="profile-management" className={styles["header__link"]}>Profile management</Link>
                        </li>
                        <li>
                            <Link to="Group-management" className={styles["header__link"]}>Group management</Link>
                        </li>
                    </ul>
                </div>
                <Outlet />
                <div className={styles.footer}>
                    <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of
                        classical Latin literature from 45 BC, making it over 2000 years old.</p>
                </div>
            </div>

        </div>
    )
}