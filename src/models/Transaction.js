import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
      index: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["deposit", "withdrawal"],
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
