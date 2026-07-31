import Account from "../models/Account.js";
import Transaction from "../models/Transaction.js";

// adds a new transaction, either "deposit" or "withdrawal"
export async function newTransaction(acctNumber, type, description, amt) {
  const acctNum = Number(acctNumber);
  const txDescription = String(description ?? "").trim();
  const amount = Number(amt);

  if (!Number.isFinite(acctNum)) throw new Error("invalid account number");
  if (!["deposit", "withdrawal"].includes(type)) throw new Error("type must be 'deposit' or 'withdrawal'");
  if (!txDescription) throw new Error("description is required");
  if (!Number.isFinite(amount) || amount <= 0) throw new Error("amount must be a positive number");

  const account = await Account.findOne({ acctNumber: acctNum });
  if (!account) throw new Error("account not found");

  if (type === "withdrawal" && amount > account.balance) throw new Error("insufficient funds");

  // save transaction document
  const tx = await Transaction.create({ account: account._id, type, description: txDescription, amount });

  // update account balance + add transaction reference
  const delta = type === "deposit" ? amount : -amount;
  const updated = await Account.findOneAndUpdate(
    { acctNumber: acctNum },
    {
      $inc: { balance: delta },
      $push: { transactions: tx._id },
    },
    { new: true }
  );

  return { message: "transaction posted", balance: updated.balance, transactionId: tx._id };
}
