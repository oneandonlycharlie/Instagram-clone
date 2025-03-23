import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import '../styles/home.css'
import LogIn from './login';
import Nav from './navbar';
import Create from './create'
// import { user,followees,recommendedUsers } from '../../utils/userData';

function Home() {
//hooks to control login state and server data
  const [loggedIn, setLogin]=useState(false);

// userdata that will be passed on the child routes
  const [userData, setUserData] = useState({})

// connecting to server and fetching data from database
  useEffect(() => {
    //refresh data every 5 seconds
    const intervalId = setInterval(() => {
      fetch("/account/user")
      .then((res) => res.json())
      .then((res) => { 
        console.log(res.ok)
        setLogin(res.isAuthenticated)
        setUserData(res.data)});
    }, 10000)

    return ()=>{clearInterval(intervalId)}
  },[loggedIn]);

  // set up switch for popup
const [createPopupVisible, setCreateVisibility] = useState(false);
const openCreate = () => setCreateVisibility(true);
const closeCreate = ()=> setCreateVisibility(false)

console.log(`log in is ${loggedIn}`)
console.log(userData)


  return (
    <>
      {loggedIn? 
        <>
          <header>
            <Nav 
              user={userData.user}
              openWindow={openCreate}
              setLogin={setLogin}
            /> 
          </header>
          <main>
            <Outlet context={[userData,setUserData]}/>
            {createPopupVisible && (
              <div className="popup-window">
                <Create closeWindow={closeCreate}
                        user={userData.user}
                 />
              </div>
              )}
          </main>
        </>
      : 
       <>
          <LogIn
            loggedIn={loggedIn} 
            setLogin={setLogin}
            setUserData={setUserData}/> 
        </>}
    </>
  )
}

export default Home
