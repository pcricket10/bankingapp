import * as customerService from "../services/customerService.js";

export async function createAccount(req, res, next) {
  try {
    const result = customerService.createAccount(req.body);
    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const result = customerService.login(req.body);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function viewAccountDetails(req, res, next) {
  try {
    const result = customerService.getAccountDetails(req.params.acctNumber);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}