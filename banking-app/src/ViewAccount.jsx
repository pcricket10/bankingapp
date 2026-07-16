import "./ViewAccount.css";
import { useState, useEffect } from "react";
import DeleteAccount from "./DeleteAccount";

function ViewAccount(props) {
  const { accountId } = props;
  const [accountDetails, setAccountDetails] = useState(null);
  const [error, setError] = useState("");
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/api/customer/${accountId}`)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((data) => setAccountDetails(data))
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p>Error: {error}</p>;
  if (!accountDetails) return <p>Loading account details...</p>;

  return (

    <>
    <div>
      <h2>Account Details</h2>
      <p>Account Number: {accountDetails.acctNumber}</p>
      <p>Name: {accountDetails.firstName} {accountDetails.lastName}</p>
      <p>Balance: ${Number(accountDetails.balance ?? 0).toFixed(2)}</p>
      <p>Transactions: {accountDetails.transactions?.length ?? 0}</p>
      <p>Account ID: {accountDetails._id ?? "N/A"}</p>
    </div>
    <button onClick={() => setShowDelete(true)}>Delete Account</button>
    {showDelete && <DeleteAccount accountId={accountId} />}
    </>
  );
}

export default ViewAccount;
