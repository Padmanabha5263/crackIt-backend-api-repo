import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    dob: {
      type:Date,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phone: String,
    password: {
      type: String,
      required: true
    },
    user_type: {
      type: String,
      enum: ["admin", "student"],
      default: "student"
    },
    password_reset_token: {
      type: String,
      default: null
    },
    password_reset_token_expiry:{
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
