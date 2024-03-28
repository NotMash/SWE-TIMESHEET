import ITLinks from "../../Components/IT_Technician_Page/ITLinks";
import styles from "./it_technician_home_page.module.css";

function IT_Technician_HomePage() {
    document.title = "IT Technician Home Page";

    return (
        <>
            <img className={styles.backImg} src="./it_home_bg.png"/>
            <div className={styles.mainContainer}>
                <h1>Home</h1>
                <ITLinks />
            </div>
        </>
    )
}

export default IT_Technician_HomePage;