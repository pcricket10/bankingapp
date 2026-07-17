// storage for account information (Temporary)
export const accounts = {
  "1": {
    acctNumber: 1,
    firstName: "John",
    lastName: "Doe",
    username: "jdoe",
    password: "123",
    balance: 100,
    transactions: [],
  },
  "2": {
    acctNumber: 2,
    firstName: "Philip",
    lastName: "McCrickard",
    username: "pmccrickard",
    password: "456",
    balance: 10000000,
    transactions: [],
  },
  "3": {
    acctNumber: 3,
    firstName: "Seung",
    lastName: "Park",
    username: "spark",
    password: "P@SSW0rd1",
    balance: 100000000,
    transactions: [],
  },
};

export let currentAccount = null;

export function setCurrentAccount(acctNumber) {
  currentAccount = accounts[acctNumber];
}

export function getCurrentAccount() {
  return currentAccount;
}
