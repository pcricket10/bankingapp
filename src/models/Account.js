export class Account {
  constructor(name, balance = 0, transactions = []) {
    this.name = name;
    this.balance = balance;
    this.transactions = transactions;
  }
}
