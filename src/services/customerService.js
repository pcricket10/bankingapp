import { Account } from "../models/Account.js";
import * as accountRepo from "../repositories/accountRepository.js";

function appError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

export function createAccount({ acctNumber, firstName, lastName, password } = {}) {
  if (!acctNumber || !firstName || !lastName || !password) {
    throw appError(400, "Missing required fields: acctNumber, firstName, lastName, password");
  }

  if (accountRepo.findByAcctNumber(acctNumber)) {
    throw appError(409, "Account already exists.");
  }

  const account = new Account(acctNumber, firstName, lastName, password);
  accountRepo.save(account);

  return {
    message: `Account: ${account.acctNumber} successfully created`,
    account: {
      acctNumber: account.acctNumber,
      firstName: account.firstName,
      lastName: account.lastName
    }
  };
}

export function login({ acctNumber, password } = {}) {
  if (!acctNumber || !password) throw appError(400, "acctNumber and password are required");

  const account = accountRepo.findByAcctNumber(acctNumber);
  if (!account) throw appError(404, "Account not found.");
  if (account.password !== password) throw appError(401, "Invalid credentials.");

  accountRepo.setCurrent(account);
  return { message: `${account.acctNumber} logged in` };
}

export function getAccountDetails(acctNumber) {
  const account = accountRepo.findByAcctNumber(acctNumber);
  if (!account) throw appError(404, "Account not found.");

  return {
    acctNumber: account.acctNumber,
    firstName: account.firstName,
    lastName: account.lastName,
    balance: account.balance
  };
}