import { Account } from "../models/Account.js";
import { Transaction } from "../models/Transaction.js";
import { accounts } from "../data/accounts.js";

import readline from "readline-sync";


//adds a new transaction, either "deposit" or "withdraw"
export function newTransaction(account, type) {
  const amt = readline.question(`How much money would you like to ${type}?: $`);
  if (amt <= 0) {
    console.log("amount must be positive");
  } else if (type === "deposit") {
    account.balance += parseFloat(amt)
    account.transactions.push(new Transaction(type, amt))
  } else {
    if (amt > account.balance) {
      console.log("insufficient funds")
    } else {
      account.balance -= parseFloat(amt)
      account.transactions.push(new Transaction(type, amt))
    }
  }

}

export function viewTransactions(account) {
  console.log(account.transactions)
}
