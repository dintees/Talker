import React, { useState } from 'react'
import socket from '../socket';
import ActiveLight from './ActiveLight';
import Message from './Message';

function MessagePanel(props) {

    const [message, setMessage] = useState("");

    const handleChangeMessage = e => {
        setMessage(e.target.value)
    }

    const handleSendMessage = () => {
        // console.log("Wysyłam wiadomość do " + props.currentlySelected.id + " o tresci " + message);
        socket.emit("private message", { to: props.currentlySelected.userID, content: message });
        props.addNewMessage({ userID: props.currentlySelected.userID, content: message })
        setMessage("");
    }

    return (
        <div id="messagesContainer">
            {props.currentlySelected ? (
                <div>
                    <div className='selectedUser'><ActiveLight status={props.currentlySelected.online} /> {props.currentlySelected.username}</div>

                    {/* {props.currentlySelected.messages.length} */}
                    <div id="messagesBox">
                        {props.currentlySelected.messages.map((msg, index) => {
                            // return <div key={index}>{msg.content}</div>
                            return <Message self={msg.self} content={msg.content} currentlySelectedUsername={props.currentlySelected.username} key={index} />
                        })}
                    </div>

                    <div className='messageForm'>
                        <input onChange={handleChangeMessage} type="text" value={message} />
                        <button onClick={handleSendMessage}>Wyślij</button>
                    </div>
                </div>) : 'Nie wybrano'}
        </div>
    )
}

export default MessagePanel
