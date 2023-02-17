import React from 'react'
import ActiveLight from './ActiveLight'

function UserItem(props) {
    return (
        <div className='userBox' onClick={(e) => props.handleUserClicked(e, props.user)}>
            <div className="userBox-header">
                {/* <div className='userBox-name'><ActiveLight status={props.user.online} /> {props.user.username} <i>{(props.user.self ? '(Ty)' : '')}</i></div> */}
                <div className='userBox-name'>{props.user.username} <i>{(props.user.self ? '(Ty)' : '')}</i></div>
                {props.user.hasNewMessages ? <div className="userBox-newMessage">!</div> : ''}
            </div>
            <div className='userBox-status'><ActiveLight status={props.user.online} /> {props.user.online ? "online" : "offline"}</div>
        </div>
    )
}

export default UserItem
