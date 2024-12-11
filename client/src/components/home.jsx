import { useState, useEffect } from 'react'
import '../styles/home.css'
import SignUp from './signup';

function Home() {
  const [loggedIn, setLogin]=useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

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
            {loggedIn? <p>You have logged in as user xx</p> : <SignUp /> }
      </div>
    </>
  )
}

export default Home
