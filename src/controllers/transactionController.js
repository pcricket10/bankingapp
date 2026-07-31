import * as transactionService from "../services/transactionService.js";

export async function newTransaction(req, res, next) {
  try {
    const { acctNumber } = req.params;
    const { type, description, amount } = req.body;

    const result = await transactionService.newTransaction(acctNumber, type, description, amount);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}
