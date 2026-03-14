import express from "express";
import connectDB from "./config/databaseconfig";
import authRoutes from './routes/auth.routes'
import session from "express-session";
import './types/session';
import MongoDBStoreConstructor from "connect-mongodb-session";
import dotenv from "dotenv";

// load environment variable from the .env file
dotenv.config();

// connect to the mongodb database
connectDB().then(() => console.log("Connected to MongoDB"))

// this is required to create a session store that will store session data in the mongodb database
const MongoDBStore = MongoDBStoreConstructor(session);


const app = express();
const PORT = process.env.EXPRESS_SERVER_PORT || 3000;

// configure session store
const mongodbStore = new MongoDBStore({
  uri: process.env.MONGODB_URI??(() => {
    throw new Error("MONGODB_URI is not defined");
  })(),
  collection: "session",
})



app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET_KEY??(() => {
    throw new Error("SESSION_SECRET_KEY is not defined");
  })(),
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }, // Set to true if using HTTPS
  store: mongodbStore
}));

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
