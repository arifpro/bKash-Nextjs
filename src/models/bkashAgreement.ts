import mongoose from "mongoose";

const bkashAgreementSchema = new mongoose.Schema(
  {
    paymentID: {
      type: String,
      required: true,
    },
    agreementID: {
      type: String,
      required: true,
    },
    agreementStatus: {
      type: String,
      required: true,
    },
    agreementVoidTime: {
      type: Date,
      required: true,
    },
    payerReference: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const BkashAgreement =
  mongoose.models.BkashAgreement ||
  mongoose.model("BkashAgreement", bkashAgreementSchema);
export default BkashAgreement;
