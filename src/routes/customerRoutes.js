import { Router } from "express";
import { createAccount, login, viewAccountDetails, deleteAccount } from "../controllers/customerController.js";

const router = Router();

router.post("/create-account", createAccount);
router.post("/login", login);
router.get("/customer/:acctNumber", viewAccountDetails);
router.delete("/customer/:acctNumber", deleteAccount);

export default router;
