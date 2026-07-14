const accounts = {};
let currentAccount = null;

export function save(account) {
  accounts[account.acctNumber] = account;
  return account;
}

export function findByAcctNumber(acctNumber) {
  return accounts[acctNumber] ?? null;
}

export function setCurrent(account) {
  currentAccount = account;
}

export function getCurrent() {
  return currentAccount;
}