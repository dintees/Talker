import React from 'react'

function ActiveLight(props) {
    return (
        <div className="userBox-status-circle" style={props.status ? {backgroundColor: "#080"} : {backgroundColor: "#f44"}}></div>
    )
}

export default ActiveLight