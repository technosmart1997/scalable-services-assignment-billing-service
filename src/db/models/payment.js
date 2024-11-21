import mongoose from "mongoose";

export const paymentSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: true,
    },
    policyId: {
      type: String,
    },
    fees: {
      type: Number,
    },
    amountPaid: {
      type: Number,
    },
    policyApplied: {
      type: Boolean,
    },
  },
  {
    collection: "payment",
    timestamps: true,
  }
);

export const Payment = mongoose.model("payment", paymentSchema);
