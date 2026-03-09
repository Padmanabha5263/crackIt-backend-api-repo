import mongoose from "mongoose";
import { MONGODB_URI } from "../util/constants.ts";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);

    console.log("MongoDB connected");
  } catch (error) {
    console.error("DB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;