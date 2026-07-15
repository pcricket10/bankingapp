import dotenv from "dotenv";
import mongoose from "mongoose";
import { accounts } from "../data/accounts.js";
import { Account } from "../models/Account.js";

dotenv.config();

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const docs = Object.values(accounts).map((a) => ({
      acctNumber: a.acctNumber,
      firstName: a.firstName,
      lastName: a.lastName,
      password: a.password,
      balance: a.balance,
      transactions: [],
    }));

    for (const doc of docs) {
      await Account.updateOne({ acctNumber: doc.acctNumber }, { $set: doc }, { upsert: true });
    }

    console.log(`Seeded ${docs.length} accounts`);
  } catch (err) {
    console.error("Seed failed:", err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seed();
