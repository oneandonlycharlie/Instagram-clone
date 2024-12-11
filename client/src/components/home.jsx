import { useState, useEffect } from 'react'
import '../styles/home.css'

function Home() {
  const [loggedIn, setLogin]=useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  const onLoginClick = ()=>{
    console.log("button clicked!")
  }

  return (
    <>
      <div className="card">
      <div className="App">
        <header className="App-header">
          <p>{!data ? "Loading..." : data}</p>
        </header>
      </div>
        <p>
          This is going to be to be the landing page
        </p>
        <p>Log in instructions</p>
        <div className='buttonContainer'>
            <input 
              type="button" 
              value={loggedIn? "log out":"log in"}
              onClick={onLoginClick}
            />
            {loggedIn? <p>You have logged in as user xx</p> : <p>You are not logged in</p> }
        </div>
      </div>
    </>
  )
}

export default Home
