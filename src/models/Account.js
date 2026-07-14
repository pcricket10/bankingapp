export class Account {
  constructor(name, firstName, lastName, password, balance = 0, transactions = []) {
    this.name = name;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.balance = balance;
    this.transactions = transactions;
  }
}
