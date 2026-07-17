import Account from "../models/Account.js";
import Transaction from "../models/Transaction.js";
import * as accountRepo from "../repositories/accountRepository.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

function appError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

function signAuthToken(account) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw appError(500, "JWT_SECRET is not configured");
  }

  return jwt.sign(
    {
      sub: String(account._id),
      acctNumber: account.acctNumber,
      username: account.username,
    },
    secret,
    { expiresIn: "2h" }
  );
}

export async function createAccount({ acctNumber, firstName, lastName, username, password } = {}) {
  if (!acctNumber || !firstName || !lastName || !username || !password) {
    throw appError(400, "Missing required fields: acctNumber, firstName, lastName, username, password");
  }

  const acctNum = Number(acctNumber);
  const normalizedUsername = String(username).trim().toLowerCase();
  const existing = await accountRepo.findByAcctNumber(acctNum);
  if (existing) throw appError(409, "Account already exists.");

  const existingUsername = await accountRepo.findByUsername(normalizedUsername);
  if (existingUsername) throw appError(409, "Username already exists.");

  const hashedPassword = await bcrypt.hash(password, 10);

  const account = await accountRepo.create({
    acctNumber: acctNum,
    firstName,
    username: normalizedUsername,
    lastName,
    password: hashedPassword,
    balance: 0,
  });

  return {
    message: `Account: ${account.acctNumber} successfully created`,
    account: {
      acctNumber: account.acctNumber,
      firstName: account.firstName,
      lastName: account.lastName,
      username: account.username,
    },
  };
}

export async function login({ username, password } = {}) {
  if (!username || !password) throw appError(400, "username and password are required");

  const normalizedUsername = String(username).trim().toLowerCase();
  const account = await accountRepo.findByUsername(normalizedUsername);
  if (!account) throw appError(404, "Account not found.");

  const passwordMatches = await bcrypt.compare(password, account.password);
  if (!passwordMatches) throw appError(401, "Invalid credentials.");

  const token = signAuthToken(account);

  return {
    message: `${account.username} logged in`,
    token,
    account: {
      acctNumber: account.acctNumber,
      username: account.username,
      firstName: account.firstName,
      lastName: account.lastName,
    },
  };
}

export async function getAccountDetails(acctNumber) {
  const account = await accountRepo.findByAcctNumberWithTransactions(Number(acctNumber));
  if (!account) throw appError(404, "Account not found.");

  return {
    acctNumber: account.acctNumber,
    firstName: account.firstName,
    lastName: account.lastName,
    balance: account.balance,
    transactions: account.transactions ?? [],
  };
}

export async function deleteAccount(acctNumber) {
  const account = await accountRepo.findByAcctNumber(Number(acctNumber));
  if (!account) throw appError(404, "Account not found.");

  await Transaction.deleteMany({ account: account._id });
  await Account.deleteOne({ acctNumber: Number(acctNumber) });

  return { message: `Account ${acctNumber} deleted` };
}
