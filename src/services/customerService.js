import Account from "../models/Account.js";
import * as accountRepo from "../repositories/accountRepository.js";

function appError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

export async function createAccount({ acctNumber, firstName, lastName, password } = {}) {
  if (!acctNumber || !firstName || !lastName || !password) {
    throw appError(400, "Missing required fields: acctNumber, firstName, lastName, password");
  }

  const acctNum = Number(acctNumber);
  const existing = await accountRepo.findByAcctNumber(acctNum);
  if (existing) throw appError(409, "Account already exists.");

  const account = await accountRepo.create({
    acctNumber: acctNum,
    firstName,
    lastName,
    password, // later: hash this
    balance: 0,
  });

  return {
    message: `Account: ${account.acctNumber} successfully created`,
    account: {
      acctNumber: account.acctNumber,
      firstName: account.firstName,
      lastName: account.lastName,
    },
  };
}

export async function login({ acctNumber, password } = {}) {
  if (!acctNumber || !password) throw appError(400, "acctNumber and password are required");

  const account = await accountRepo.findByAcctNumber(Number(acctNumber));
  if (!account) throw appError(404, "Account not found.");
  if (account.password !== password) throw appError(401, "Invalid credentials.");

  return { message: `${account.acctNumber} logged in` };
}

export async function getAccountDetails(acctNumber) {
  const account = await accountRepo.findByAcctNumber(Number(acctNumber));
  if (!account) throw appError(404, "Account not found.");

  return {
    acctNumber: account.acctNumber,
    firstName: account.firstName,
    lastName: account.lastName,
    balance: account.balance,
  };
}
