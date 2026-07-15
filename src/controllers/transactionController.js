import * as transactionService from "../services/transactionService.js";

export async function newTransaction(req, res, next) {
  try {
    const result = await transactionService.newTransaction(req.body);
    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}
