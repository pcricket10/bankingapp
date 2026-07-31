import { useState } from "react";

function NewAccount() {
  const [acctNumber, setAcctNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [msg, setMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("");

    if (password !== rePassword) {
      setMsg("Error: Passwords do not match.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/create-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ acctNumber, firstName, lastName, username, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || `HTTP ${res.status}`);

      setMsg("Account created successfully.");
    } catch (err) {
      setMsg(`Error: ${err.message}`);
    }
  }

  return (
    <div>
      <h2>Create New Account</h2>
    <div className="registerForm">
      <form onSubmit={handleSubmit}>

          <input type="text" placeholder="Account Number" name="acctNumber" value={acctNumber} onChange={(e) => setAcctNumber(e.target.value)} />
          <input type="text" placeholder="First Name" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <input type="text" placeholder="Last Name" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          <input type="text" placeholder="Username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <input type="password" placeholder="Re-enter Password" name="rePassword" value={rePassword} onChange={(e) => setRePassword(e.target.value)} />
        <br />
        <button type="submit">Create Account</button>
      </form>
    </div>
      {msg && <p>{msg}</p>}
    </div>
  );
}

export default NewAccount;
