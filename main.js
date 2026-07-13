import readline from 'readline-sync';





// create an account
// view account details
// deposit money
// view transaction history

class Account {
  constructor(name, balance = 0, transactions = []) {
    this.name = name;
    this.balance = balance;
    this.transactions = transactions;
  }
}

class Transaction {
  constructor(type, amount) {
    this.type = type
    this.amount = amount
  }
}
//creates demo accounts
const demo = new Account("demo", 100, [])
const accounts = { "demo": new Account("demo", 100, []) }

let accountName = ""; //super super secure

function main() {
  if (!accountName) {
    getLoginInput();
  }

  getUserInput();

}


function displayLogin() {
  console.log("+---Welcome to Simple Bank---+");
  console.log("|                            |");
  console.log("|1: Create an account        |");
  console.log("|2: Login                    |");
  console.log("|3. Exit                     |");
  console.log("+----------------------------+");
}


function displayMenu() {
  console.log(`+---Welcome ${accountName},---+`);
  console.log("|                            |");
  console.log("|1: View account details     |");
  console.log("|2. Deposit money            |");
  console.log("|3. Withdraw money           |");
  console.log("|4. View transaction history |");
  console.log("|5. Exit                     |");
  console.log("+----------------------------+");

}

function getUserInput() {
  let option;
  do {
    displayMenu()
    option = readline.question("select an option: ");
    switch (option) {
      case "1":
        viewAccountDetails();
        break;
      case "2":
        newTransaction("deposit")
        break;
      case "3":
        newTransaction("withdraw")
        break;
      case "4":
        viewTransactions()
        break;
      case "5":
        console.log("Goodbye!");
        break;
      default:
        console.log("invalid option");
        break;
    }
  } while (option !== "5")

}

function getLoginInput() {
  displayLogin();
  const option = readline.question("select an option: ");
  switch (option) {
    case "1":
      createAccount()
      break;
    case "2":
      login()
      break;
    case "3":
      console.log("Goodbye!");
      process.exit(0)
    default:
      console.log("invalid option");
      break;
  }
}

function createAccount() {
  const name = readline.question("Enter account name: ")
  const account = new Account(name);
  console.log(`Account: ${name} successfully created!`)
  accounts[name] = new Account(name);
  accountName = name;

}

function login() {
  accountName = readline.question("Enter account name: ")
  console.log(`${accountName} logged in`)
}

function viewAccountDetails() {
  const account = accounts[accountName];
  console.log(`Details for account: ${accountName}`)
  console.log(`Balance: $${accounts[accountName].balance}`);
}


function newTransaction(type) {
  const account = accounts[accountName];
  const amt = readline.question(`How much money would you like to ${type}?: $`);
  if (type === "deposit") {
    account.balance += parseFloat(amt)
  } else {
    account.balance -= parseFloat(amt)
  }
  account.transactions.push(new Transaction(type, amt))
}

function viewTransactions() {
  const account = accounts[accountName];
  console.log(account.transactions)
}





main()
