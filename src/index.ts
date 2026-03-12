import express from "express";
import connectDB from "./config/databaseconfig.ts";
import authRoutes from './routes/auth.routes.ts'
import session from "express-session";
import MongoDBStoreConstructor from "connect-mongodb-session";
import dotenv from "dotenv";

// load environment variable from the .env file
dotenv.config();

// this is required to create a session store that will store session data in the mongodb database
const MongoDBStore = MongoDBStoreConstructor(session);


const app = express();
const PORT = 3000;

// configure session store
const mongodbStore = new MongoDBStore({
  uri: process.env.MONGODB_URI??(() => {
    throw new Error("MONGODB_URI is not defined");
  })(),
  collection: "session",
})

// connect to the mongodb database
await connectDB()

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
