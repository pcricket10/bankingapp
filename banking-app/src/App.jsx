
import './App.css'
import { useState } from 'react';
import ViewAccount from './ViewAccount'
import NewAccount from './NewAccount'
import LoginForm from './LoginForm'

function App() {

  const [accountId, setAccountId] = useState(null);
  const [token, setToken] = useState('');
  const [showAccount, setShowAccount] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  function handleLoginSuccess(authToken, id ) {
    setToken(authToken);
    displayAccountDetails(id);
    setShowRegister(false);
    setShowLogin(false);
  }

  function handleLogout() {
    setToken('');
    setAccountId(null);
    setShowAccount(false);
    setShowRegister(false);
    setShowLogin(true);
  }

  return (
    <>

    <img className="logo" src="./src/assets/logo.png" alt="Banking App Logo" />

    <h1>Welcome to Banking App!</h1>
    <p>Totally Legit!, 1000% Real!* certified by the Worse Business Bureau (WBB)</p>

    <div className="loginForm">
      {showLogin && <LoginForm onLoginSuccess={handleLoginSuccess} />}
      {showLogin && <button onClick={() => setShowRegister(true)}>Register</button>}
      {!showLogin && <button onClick={handleLogout}>Logout</button>}

    </div>
      {showRegister && <NewAccount />}
    {showAccount && accountId && token && <ViewAccount accountId={accountId} token={token} />}

    </>
  );

  function displayAccountDetails(id) {
    setAccountId(id);
    setShowAccount(true);
  }
}

export default App
