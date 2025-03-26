import mongoose from "mongoose";

const bkashSchema = new mongoose.Schema(
  {
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    accessTokenExpiresAt: {
      type: Date,
      required: true,
      default: Date.now() + 3600 * 1000, // 1 hour
    },
    refreshTokenExpiresAt: {
      type: Date,
      required: true,
      default: Date.now() + 2419200 * 1000, // 28 days
    },
  },
  { timestamps: true }
);

const Bkash = mongoose.models.Bkash || mongoose.model("Bkash", bkashSchema);
export default Bkash;
