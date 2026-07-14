export class Account {
  constructor(acctNumber, firstName, lastName, password, balance = 0, transactions = []) {
    this.acctNumber = acctNumber;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.balance = balance;
    this.transactions = transactions;
  }
}
