import { Link } from 'react-router-dom'
function Nav(){

    return (
        <>
        <h2>This the nav bar that goes to the left</h2>
        <p>Instagram logo</p>
        <Link to="/">Home</Link>
        {/* Search is a pop up */}
        {/* <Link>Search</Link> */}
        <Link to="/explore">Explore</Link>
        <Link to="/messages">Messages</Link>
        {/* Notification is a pop up too */}
        {/* <Link>Notifications</Link> */}
        {/* Create is a file upload module */}
        {/* <Link>Create</Link> */}
        <Link to="profile">Profile</Link>
        </>
    )

}

export default Nav