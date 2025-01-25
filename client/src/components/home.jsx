import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import '../styles/home.css'
import SignUp from './signup';
import Nav from './navbar';
import Create from './create'
import { user,followees,recommendedUsers } from '../../utils/userData';

function Home() {
//hooks to control login state and server data
  const [loggedIn, setLogin]=useState(false);
  const [serverData, setServerData] = useState(null);

// userdata that will be passed on the child routes
  const [userData, setUserData] = useState({
    user: user,
    followees: followees,
    recommendations: recommendedUsers
  })

// connecting to server and fetching data from database
  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((res) => setServerData(res.message));
  }, []);
 
  // set up switch for popup
const [createPopupVisible, setCreateVisibility] = useState(false);
const openCreate = () => setCreateVisibility(true);
const closeCreate = ()=> setCreateVisibility(false)

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
          <div className="card">
            <div className="App">
              <header className="App-header">
                <p>{!serverData ? "Loading..." : serverData}</p>
              </header>
            </div>
            <button onClick={()=> {setLogin(true)}}>
              Click to pass log in 
            </button>
          </div>
          <SignUp /> 
        </section>
        </>}
    </>
  )
}

export default Home
