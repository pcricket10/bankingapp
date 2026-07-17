import { Router } from "express";
import { createAccount, login, viewAccountDetails, deleteAccount } from "../controllers/customerController.js";
import { newTransaction } from "../controllers/transactionController.js";
import { requireAuth, requireAccountAccess } from "../middleware/auth.js";
const router = Router();

router.post("/create-account", createAccount);
router.post("/login", login);
router.get("/customer/:acctNumber", requireAuth, requireAccountAccess, viewAccountDetails);
router.delete("/customer/:acctNumber", requireAuth, requireAccountAccess, deleteAccount);

router.patch("/customer/:acctNumber/transaction", requireAuth, requireAccountAccess, newTransaction);

export default router;
