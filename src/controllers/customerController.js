import * as customerService from "../services/customerService.js";

export async function createAccount(req, res, next) {
  try {
    const result = await customerService.createAccount(req.body);
    console.log("createAccount result:", result); // debug log
    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const result = await customerService.login(req.body);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function viewAccountDetails(req, res, next) {
  try {
    const acctNumber = req.params.acctNumber; // must match route: /:acctNumber
    if (!acctNumber) {
      const err = new Error("acctNumber route param is required");
      err.status = 400;
      throw err;
    }

    const result = await customerService.getAccountDetails(acctNumber);
    console.log("viewAccountDetails result:", result); // debug log
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}
