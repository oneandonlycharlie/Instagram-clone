import { useState, useEffect } from 'react'
import '../src/styles/home.css'

function Home() {
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
        <p>Log in instructions</p>
        <button>Click to log in</button>
      </div>
    </>
  )
}

export default Home
