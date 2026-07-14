import readline from "readline-sync";
import { Account } from "../models/Account.js";
import { accounts, setCurrentAccount } from "../data/accounts.js";
import { currentAccount } from "../data/accounts.js";

//prompts and creates an account
export function createAccount() {
  const name = readline.question("Enter account name: ")

  if (accounts[name]) {
    console.log("Account already exists.");
    return;
  }
  setCurrentAccount(new Account(name));
  console.log(`Account: ${name} successfully created!`)

}

// logs into an account
export function login() {
  const name = readline.question("Enter account name: ");
  if (!accounts[name]) {
    console.log("Account not found.");
    return;
  }

  setCurrentAccount(accounts[name]);

  console.log(`${currentAccount.name} logged in`)
}




// views details about the current account
export function viewAccountDetails() {
  console.log(`Details for account: ${currentAccount.name}`)
  console.log(`Balance: $${currentAccount.balance}`);
}
