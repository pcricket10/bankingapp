import { useState } from "react";

function NewTransaction(props) {
  const { accountId, token } = props;
  const [transactionType, setTransactionType] = useState("deposit");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError("Please enter a valid amount greater than zero.");
      return;
    }

    fetch(`http://localhost:8080/api/customer/${accountId}/transaction`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ type: transactionType, description: description, amount: Number(amount) }),
    })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((data) => {
        setSuccessMessage(`Transaction successful. New balance: $${data.balance.toFixed(2)}`);
        setAmount("");
      })
      .catch((err) => setError(`Transaction failed: ${err.message}`));
  };

  return (
    <div>
      <h2>New Transaction</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Transaction Type:
          <select value={transactionType} onChange={(e) => setTransactionType(e.target.value)}>
            <option value="deposit">Deposit</option>
            <option value="withdrawal">Withdrawal</option>
          </select>
        </label>
        <br />
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Amount:
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit Transaction</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </div>
  );
}

export default NewTransaction;
