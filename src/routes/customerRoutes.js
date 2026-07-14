import { Router } from "express";
import { createAccount, login, viewAccountDetails } from "../controllers/customerController.js";

const router = Router();

router.post("/create-account", createAccount);
router.post("/login", login);
router.get("/customer/:acctNumber", viewAccountDetails);

export default router;
