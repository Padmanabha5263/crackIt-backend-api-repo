import mongoose from "mongoose";


const sessionSchema = new mongoose.Schema(
  {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    token: {
      type: String,
        required: true,
    },
    expiresAt: {
      type: Date,
        required: true,
    },
  },
  { timestamps: true }
);
export const SessionModel = mongoose.model("Session", sessionSchema);
