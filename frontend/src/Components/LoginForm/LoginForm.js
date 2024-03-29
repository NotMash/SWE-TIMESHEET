import styles from './LoginForm.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('Consultant');
    const navigate = useNavigate(); // Create navigate instance

    const handleSubmit = (e) => {
    e.preventDefault();
    const loginDetails = { username, password };

    fetch('http://127.0.0.1:5000/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify(loginDetails)
    }).then(response => {
        if (response.ok) {
            console.log("Login success");
            return response.json();
        } else {
            throw new Error('Login failed with status: ' + response.status);
        }
    }).then(data => {
        console.log(data);
        navigate('/consultant_home_page#/timesheet_recording_page'); // Navigate to Timesheet page on successful login
    }).catch(error => {
        console.error(error);
    });
};






    return(
        <>
            <form onSubmit={handleSubmit} className={styles.LoginForm}>
                <ul>
                    <li>
                        <figure>
                            <img className={styles.UserIcon} src="./user_icon.png"></img>
                        </figure>
                    </li>
                    <li>
                        <label>User Type</label>
                    </li>
                    <li>
                        <select className={styles.selectInput}
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}>
                            <option>Consultant</option>
                            <option>Line Manager</option>
                            <option>Finance Team Member</option>
                            <option>IT Technician</option>
                        </select>
                    </li>
                    <li>
                        <label for="username">Username</label>
                    </li>
                    <li>
                        <input type="username" id="uname" name="u_name" required
                        className={styles.input}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}></input>
                    </li>
                    <li>
                        <label for="password">Password</label>
                    </li>
                    <li>
                        <input type="password" id="pword" name="u_password" required
                        className={styles.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}></input>
                    </li><br></br>
                    <li>
                        <a id={styles.forgotPass} href="">Forgot Password?</a>
                    </li><br></br>
                    <li>
                        <input id="submit_button" type="submit" name="submit_btn" value="Submit"></input>

                    </li><br></br>
                </ul>
            </form>
        </>
    )
}

export default LoginForm;