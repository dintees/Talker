import UserItem from './UserItem'

function UsersList(props) {

    return (
        <div id="usersList">
            {props.users.map((user, index) => {
                return <UserItem user={user} key={index} handleUserClicked={props.handleUserClicked} />
            })}
        </div>
    )
}

export default UsersList
