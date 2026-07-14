// storage for account information (Temporary)
export const accounts = {
  demo: {
    name: "demo",
    firstName: "John",
    lastName: "Doe",
    password: "123",
    balance: 100,
    transactions: [],
  },
};

export let currentAccount = null;

export function setCurrentAccount(name) {
  currentAccount = name;
}

export function getCurrentAccount() {
  return currentAccount;
}
