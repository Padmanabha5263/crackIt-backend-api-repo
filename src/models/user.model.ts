import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    age: Number,
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
    usertype: {
      type: String,
      enum: ["admin", "student"],
      default: "student"
    }
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
