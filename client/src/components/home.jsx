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
  const [serverMsg, setServerMsg] = useState(null);

// userdata that will be passed on the child routes
  const [userData, setUserData] = useState({})

// connecting to server and fetching data from database
  useEffect(() => {
    fetch("/account/user")
      .then((res) => res.json())
      .then((res) => {
        setServerMsg(res.message); 
        setUserData(res.data)});
  }, []);

 
  // set up switch for popup
const [createPopupVisible, setCreateVisibility] = useState(false);
const openCreate = () => setCreateVisibility(true);
const closeCreate = ()=> setCreateVisibility(false)

console.log(`log in is ${loggedIn}`)
console.log(serverMsg)
console.log(userData)

  return (
    <>
      {loggedIn? 
        <>
          <header>
            <Nav 
              user={userData.user}
              openWindow={openCreate}
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
        <section className='login'>
          <LogIn passLogin={()=>setLogin(true)}/> 
        </section>
        </>}
    </>
  )
}

export default Home
