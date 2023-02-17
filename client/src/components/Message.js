import React from 'react'

function Message(props) {
    return (
        <div className='messageBox' style={props.self ? {float: "right"} : {float: "left", backgroundColor: "#cacaca", color: "#444"}}>
            <div className="content">{props.content}</div>
            {/* {props.self ? "Ty" : props.currentlySelectedUsername} */}
        </div>
    )
}

export default Message
