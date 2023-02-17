import { useEffect, useState } from 'react'
import socket from '../socket';

function LoginForm({ setUserLoggedIn }) {
    const [username, setUsername] = useState("");

    const handleChangeUsername = e => {
        setUsername(e.target.value)
    }

    const handleFormSubmit = async e => {
        e.preventDefault();
        console.log(`Logowanie --- ${username}`);
        socket.connect();
        socket.auth = { username }
        setUserLoggedIn(true)
        // setTimeout(() => {
            // if (socket.users) setUserLoggedIn(true)
        // }, 80)
    }

    useEffect(() => {
        const sessionID = localStorage.getItem("sessionID")
        if (sessionID) {
            socket.auth = { sessionID }
            socket.connect();
            setUserLoggedIn(true)
        }
    })

    return (
        <div>
            <header>Talker v0.2</header>
            <div id='loginForm'>
                <input type="text" placeholder='Username...' onChange={handleChangeUsername} />
                <button onClick={handleFormSubmit}>Log In</button>
            </div>
            <div id='loginFormBackground'></div>
        </div>
    );
}

export default LoginForm
