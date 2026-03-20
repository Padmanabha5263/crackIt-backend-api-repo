import express from "express";
import connectDB from "./config/databaseconfig";
import authRoutes from './routes/auth.routes'
import dotenv from "dotenv";

// load environment variable from the .env file
dotenv.config();

// connect to the mongodb database
connectDB().then(() => console.log("Connected to MongoDB"))

const app = express();
const PORT: number = parseInt(process.env.EXPRESS_SERVER_PORT) || 3000;

app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next()
})
app.use(express.json());
app.use("/api/auth", authRoutes);

app.use((err, req, res, next)=>{
  const statusCode:number = err.statusCode || 500;
  const message:string = err.message || "Internal Server Error"
  res.status(statusCode).json({message: message})
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
