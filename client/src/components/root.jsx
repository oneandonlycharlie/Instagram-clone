import { useState, useEffect } from 'react'
import { Outlet, Link } from 'react-router-dom';
import '../styles/root.css'
import SignUp from './signup';
import Nav from './navbar';

/* 这里应该根据是否登录来区分 
- 如果没有登录就展示登录页 
- 如果登录了就跳转到用户页 /user
*/

function Home() {
  const [loggedIn, setLogin]=useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((res) => setData(res.message));
  }, []);

  return (
    <>
      {loggedIn? 
        <>
          <header>
            <Nav /> 
          </header>
          <main>
            <h2>You are in the user page</h2>
            <Outlet />
          </main>
        </>
      : 
       <>
        <section className='login'>
          <div className="card">
            <div className="App">
              <header className="App-header">
                <p>{!data ? "Loading..." : data}</p>
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
