import { Account } from "../models/Account.js";
import { accounts, setCurrentAccount } from "../data/accounts.js";
import { currentAccount } from "../data/accounts.js";

// creates an account using the api
export async function createAccount(req, res) {
  const params = req?.body ?? {};

  if (!params.acctNumber || !params.firstName || !params.lastName || !params.password) {
    return res.status(400).json({
      error: "Missing required fields: acctNumber, firstName, lastName, password"
    });
  }

  if (accounts[params.acctNumber]) {
    return res.status(409).json({
      error: "Account already exists."
    });
  }
  const account = new Account(params.acctNumber, params.firstName, params.lastName, params.password);



  setCurrentAccount(account);
  accounts[params.acctNumber] = account;

  return res.status(201).json({
    message: `Account: ${account.acctNumber} successfully created by ${account.firstName} ${account.lastName}`
  });
}

// logs into an account
export function login() {
  const acctNumber = readline.question("Enter account number: ");
  if (!accounts[acctNumber]) {
    console.log("Account not found.");
    return;
  }

  setCurrentAccount(accounts[acctNumber]);

  console.log(`${currentAccount.acctNumber} logged in`)
}




// views details about the current account
export async function viewAccountDetails(req, res) {
  if (!accounts[req.params.acctNumber]) {
    return res.status(404).json({
      error: "Account not found."
    });
  }
  console.log(accounts[req.params.acctNumber]);
}
