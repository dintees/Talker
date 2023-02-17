import { useState, useEffect, useRef } from 'react'
import MessagePanel from './MessagePanel'
import UsersList from './UsersList'
import socket from '../socket'
import './Home.css'


function Home() {
    const [generated, setGenerated] = useState(false);
    const [users, setUsers] = useState();
    const [currentlySelected, setCurrentlySelected] = useState();

    const currentlySelectedRef = useRef();
    currentlySelectedRef.current = currentlySelected;

    const usersRef = useRef();
    usersRef.current = users

    useEffect(() => {
        socket.on("user connected", user => {
            let users = [...usersRef.current];
            for (let u of users) {
                if (u.userID === user.userID) {
                    u.online = true;
                    setUsers(users)
                    return;
                }
            }
            setUsers(current => [...current, user])
        })

        socket.on("user disconnected", (userID) => {
            let users = [...usersRef.current];
            for (let user of users) {
                if (user.userID === userID) {
                    user.online = false;
                    setUsers(users);
                    break;
                }
            }
        })

        socket.on("disconnect", () => {
            console.log("TODO: user disconnected (self)!");
            // this.users.forEach((user) => {
            //     if (user.self) {
            //         user.online = false;
            //     }
            // });
        });

        socket.on("private message", ({ from, content }) => {
            let users = [...usersRef.current];
            for (let user of users) {
                if (user.userID === from) {
                    if (!currentlySelectedRef.current || user.userID !== currentlySelectedRef.current.userID) { user.hasNewMessages = true; }
                    user.messages.push({ content, self: false })
                    setUsers(users);
                    break;
                }
            }
        });


        setTimeout(() => {
            setUsers(socket.users)
            setGenerated(true)
        }, 500)
    }, [])

    const handleUserClicked = (e, user) => {
        user.hasNewMessages = false;
        setCurrentlySelected(user)
    }

    const addNewMessage = ({ userID, content }) => {
        let users = [...usersRef.current];
        for (const user of users) {
            if (user.userID === userID) {
                user.messages.push({ content, self: true })
                setUsers(users)
            }
        }
    }


    if (generated) {
        return (
            <div className="container">
                <UsersList handleUserClicked={handleUserClicked} users={users} />
                <MessagePanel currentlySelected={currentlySelected} addNewMessage={addNewMessage} />
            </div>
        )
    }
}

export default Home
