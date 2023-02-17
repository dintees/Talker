import { io } from 'socket.io-client'

const URL = "http://localhost:3001";
const socket = io(URL, { autoConnect: false });


socket.on("connect_error", err => {
    if (err.message === "invalid username") {
        alert("Invalid username!")
    }
});

socket.on("session", ({ sessionID, userID }) => {
    socket.auth = { sessionID };
    localStorage.setItem("sessionID", sessionID);
    socket.userID = userID;
});

socket.on("connectedUsers", users => {
    socket.users = users;
    users.forEach(user => {
        user.self = user.userID === socket.userID
    });

    // sort user by name -> you first
    socket.users.sort((a, b) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.username < b.username) return 1; else return -1;
    })
})


export default socket;