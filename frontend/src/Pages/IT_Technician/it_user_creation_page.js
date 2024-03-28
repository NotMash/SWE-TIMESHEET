import UserAccountCreation from "../../Components/IT_Technician_Page/UserAccountCreation";
import styles from "./it_user_creation_page.module.css";

function IT_User_Creation_Page() {
    document.title = "IT Technician: User Creation Page";

    return (
        <>
            <img className={styles.backImg} src="./main.jpeg"/>
            <div className={styles.container}>
                <UserAccountCreation/>
            </div>
        </>
    )
}

export default IT_User_Creation_Page;