import readline from "readline-sync";
import { Account } from "../models/Account.js";
import { accounts, setCurrentAccount } from "../data/accounts.js";
import { currentAccount } from "../data/accounts.js";

export function createAccount() {
  const name = readline.question("Enter account name: ")

  if (accounts[name]) {
    console.log("Account already exists.");
    return;
  }
  setCurrentAccount(new Account(name));
  console.log(`Account: ${name} successfully created!`)

}

export function login() {
  const name = readline.question("Enter account name: ");
  if (!accounts[name]) {
    console.log("Account not found.");
    return;
  }

  setCurrentAccount(accounts[name]);

  console.log(`${currentAccount.name} logged in`)
}





export function viewAccountDetails() {
  console.log(`Details for account: ${currentAccount.name}`)
  console.log(`Balance: $${currentAccount.balance}`);
}
