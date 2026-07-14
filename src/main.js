import express from 'express';

import { createAccount, login, viewAccountDetails } from './api/customers.js';





// create an account
// view account details
// deposit money
// view transaction history




function main() {
  const app = express();
  app.use(express.json());

  app.post('/api/create-account', createAccount);
  // app.post('/api/login', login);
  app.get('/api/customer/:acctNumber', viewAccountDetails);

  app.listen(8080, () => {
    console.log('Server is running on port 8080');
  });



  // getLoginInput();

  // getUserInput();

}

// function getUserInput() {
//   let currentAccount = getCurrentAccount()
//   if (!currentAccount) {
//     return;
//   }
//   let option;

//   do {
//     displayMenu(`Welcome, ${currentAccount.firstName} ${currentAccount.lastName}`, ["View account details", "Deposit money", "Withdraw money", "View transaction history", "Exit"])
//     option = readline.question("select an option: ");
//     switch (option) {
//       case "1":
//         viewAccountDetails();
//         break;
//       case "2":
//         newTransaction(currentAccount, "deposit")
//         break;
//       case "3":
//         newTransaction(currentAccount, "withdraw")
//         break;
//       case "4":
//         viewTransactions(currentAccount)
//         break;
//       case "5":
//         console.log("Goodbye!");
//         break;
//       default:
//         console.log("invalid option");
//         break;
//     }
//   } while (option !== "5")

// }

// function getLoginInput() {
//   displayMenu("Welcome to Simple Bank", ["Create an account", "Login", "exit"])
//   const option = readline.question("select an option: ");
//   switch (option) {
//     case "1":
//       createAccount()
//       break;
//     case "2":
//       login()
//       break;
//     case "3":
//       console.log("Goodbye!");
//       process.exit(0)
//     default:
//       console.log("invalid option");
//       break;
//   }
// }










main()


/*
refactor
timestamp
more details on transactions
*/
