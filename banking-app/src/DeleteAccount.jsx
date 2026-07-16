import { useState } from 'react';

function DeleteAccount({ accountId }) {
  const [message, setMessage] = useState("");

  const handleDeleteAccount = async () => {
    console.log("Deleting account with ID:", accountId);
    try {
      const response = await fetch(`http://localhost:8080/api/customer/${accountId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMessage("Account deleted successfully.");
      } else {
        setMessage(`Failed to delete account. ${accountId} HTTP ${response.status}`);
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      setMessage("An error occurred while deleting the account.");
    }
  };

  return (
    <div>


      <button onClick={handleDeleteAccount} accountId={accountId}>Delete Account</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default DeleteAccount;
