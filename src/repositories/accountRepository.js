import Account from "../models/Account.js";
const accounts = {};
let currentAccount = null;


export async function create(account) {
  return await Account.create(account);
}

export async function findByAcctNumber(acctNumber) {
  // return a single plain object, not an array
  return await Account.findOne({ acctNumber: Number(acctNumber) }).lean();
}

export async function findByUsername(username) {

  return await Account.findOne({ username: String(username).toLowerCase() }).lean();
}

export async function findByAcctNumberWithTransactions(acctNumber) {
  return await Account.findOne({ acctNumber: Number(acctNumber) })
    .populate({
      path: "transactions",
      options: { sort: { createdAt: -1 } },
    })
    .lean();
}

export function setCurrent(account) {
  currentAccount = account;
}

export function getCurrent() {
  return currentAccount;
}
