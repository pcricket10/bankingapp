import { useState, useEffect } from "react";

function ViewTransactions({ accountId, token }) {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:8080/api/customer/${accountId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((data) => setTransactions(data.transactions || []))
      .catch((err) => setError(err.message));
  }, [accountId, token]);

  if (error) return <p>Error: {error}</p>;
  if (!transactions.length) return <p>No transactions found.</p>;

  return (
    <div>
      <h2>Transaction History</h2>
      <ul>
        {transactions.map((tx, index) => (
          <li key={index}>
            {tx.type} of ${tx.amount} from {tx.description} on {new Date(tx.createdAt).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewTransactions;
