import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongodburi = process.env.MONGODB_URI??(() => {
      throw new Error("MONGODB_URI is not defined");
    })();
    await mongoose.connect(mongodburi);
  } 
  catch (error) {
    process.exit(1);
  }
};

export default connectDB;