import mongoose from "mongoose";
import Transaction from "./Transaction.js";

const accountSchema = new mongoose.Schema(
  {
    acctNumber: {
      type: Number,
      required: true,
      unique: true,
      index: true
    },
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    }, // later: store hashed passwords
    balance: {
      type: Number,
      required: true,
      min: 0,
      default: 0
    },
    transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Transaction" }],
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const Account = mongoose.model("Account", accountSchema);
export default Account;
