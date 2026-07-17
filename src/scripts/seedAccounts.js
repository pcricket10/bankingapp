import dotenv from "dotenv";
import mongoose from "mongoose";
import { accounts } from "../data/accounts.js";
import Account from "../models/Account.js";
import bcrypt from "bcryptjs";

dotenv.config();

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const docs = await Promise.all(
      Object.values(accounts).map(async (a) => ({
        acctNumber: a.acctNumber,
        firstName: a.firstName,
        lastName: a.lastName,
        username: a.username,
        password: await bcrypt.hash(a.password, 10),
        balance: a.balance,
        transactions: [],
      }))
    );

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
