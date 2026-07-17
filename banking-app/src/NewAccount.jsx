import { useState } from "react";

function NewAccount() {
  const [acctNumber, setAcctNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("");

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
      <form onSubmit={handleSubmit}>
        <label>
          Account Number:
          <input type="text" name="acctNumber" value={acctNumber} onChange={(e) => setAcctNumber(e.target.value)} />
        </label>
        <label>
          First Name:
          <input type="text" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </label>
        <label>
          Last Name:
          <input type="text" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </label>
        <label>
          Username:
          <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Create Account</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}

export default NewAccount;
