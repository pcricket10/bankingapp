
import './App.css'
import { useState } from 'react';
import ViewAccount from './ViewAccount'
import NewAccount from './NewAccount'

function App() {

  const [accountId, setAccountId] = useState(null);
  const [showAccount, setShowAccount] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  return (
    <>
    <h1>Welcome to Banking App!</h1>

    <div>
      <form className="loginForm" onSubmit={(e) => { e.preventDefault(); displayAccountDetails(accountId); }}>
        <input type="text" placeholder="Account Number" onChange={(e) => setAccountId(e.target.value)} />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>

    <button onClick={() => setShowRegister(true)}>Register</button>

    {showAccount && <ViewAccount accountId={accountId} />}
    {showRegister && <NewAccount />}

    </>
  );

  function displayAccountDetails(id) {
    setAccountId(id);
    setShowAccount(true);
  }
}

export default App
