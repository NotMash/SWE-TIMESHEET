import { useState } from "react";
import styles from "./UserAccountCreation.module.css";

function UserAccountCreation() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);
    const [userType, setUserType] = useState("Consultant");

    const handlePasswordToggle = () => {
        setShowPassword(!showPassword);
    };

    const handleConfirmPasswordToggle = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const validateConfirmPassword = () => {
        setIsConfirmPasswordValid(confirmPassword === password);
    };

    const handleUserTypeChange = (e) => {
        setUserType(e.target.value);
    };

    return (
        <>
            <div className={styles.card}>
                <img className={styles.main_img} src="./time_bg.png" alt="Background" />
                <div className={styles.formWrapper}>
                    <form className={styles.userAccountForm}>
                        <ul>
                            <li>
                                <h2>Create User Account</h2>
                            </li>
                            <li>
                                <label>User Type</label>
                            </li>
                            <li>
                                <select className={styles.selectInput} onChange={handleUserTypeChange}>
                                    <option value="Consultant">Consultant</option>
                                    <option value="Line Manager">Line Manager</option>
                                    <option value="Finance TeamMember">Finance Team Member</option>
                                </select>
                            </li>
                            <li>
                                <input type="text" id="firstname" name="first_name" placeholder="First Name" required className={styles.input} />
                            </li>
                            <li>
                                <input type="text" id="lastname" name="last_name" placeholder="Last Name" required className={styles.input} />
                            </li>
                            {userType == "Consultant" &&
                                <li>
                                    <input type="text" id="managername" name="manager_name" placeholder="Manager Username" required className={styles.input} />
                                </li>
                            }
                            <li>
                                <input type="text" id="uname" name="u_name" placeholder="Username" required className={styles.input} />
                            </li>
                            <li>
                                <input type="email" id="email" name="e_mail" placeholder="Email" required className={styles.input} />
                            </li>
                            <li>
                                <div className={styles.passwordInputWrapper}>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="pword"
                                        name="u_password"
                                        placeholder="Password"
                                        required
                                        className={styles.passwordInput}
                                        onChange={handlePasswordChange}
                                    />
                                    {showPassword ? (
                                        <img src="./hide.svg" className={styles.eyeIcon} onClick={handlePasswordToggle} alt="Hide" />
                                    ) : (
                                        <img src="./show.svg" className={styles.eyeIcon} onClick={handlePasswordToggle} alt="Show" />
                                    )}
                                </div>
                            </li>
                            <li>
                                <div className={styles.passwordInputWrapper}>
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        id="confirm_pword"
                                        name="confirm_u_password"
                                        placeholder="Confirm Password"
                                        required
                                        className={styles.passwordInput}
                                        onChange={handleConfirmPasswordChange}
                                        onBlur={validateConfirmPassword}
                                    />
                                    {showConfirmPassword ? (
                                        <img src="./hide.svg" className={styles.eyeIcon} onClick={handleConfirmPasswordToggle} alt="Hide" />
                                    ) : (
                                        <img src="./show.svg" className={styles.eyeIcon} onClick={handleConfirmPasswordToggle} alt="Show" />
                                    )}
                                </div>
                                {!isConfirmPasswordValid && confirmPassword && <p className={styles.validationMessage}>Passwords do not match.</p>}
                            </li>
                            <li>
                                <input id="submit_button" type="submit" name="submit_btn" value="Create" />
                            </li>
                        </ul>
                    </form>
                    <img className={styles.animatedCharacter} src={`./${userType.toLowerCase().replace(' ', '_')}.gif`} alt="User Type" />
                </div>
            </div>
        </>
    );
}

export default UserAccountCreation;
