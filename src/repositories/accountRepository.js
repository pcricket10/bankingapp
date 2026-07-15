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

export function setCurrent(account) {
  currentAccount = account;
}

export function getCurrent() {
  return currentAccount;
}
