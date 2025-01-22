'use strict';

import { useState } from 'react';
import CCoin from './assets/CCoin.png';
import './App.css';
import Dashboard from './pages/dashBoard';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="" target="_blank">
          <img src={CCoin} className="logo" alt="CC logo" />
        </a>
      </div>
      <h1>Crypto Coin Dashboard</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <div>
        <Dashboard />
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
