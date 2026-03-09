import express from "express";
import connectDB from "./config/databaseconfig.ts";
import authRoutes from './routes/auth.routes.ts'
import session from "express-session";
import { MONGODB_URI, SESSION_SECRET_KEY } from "./util/constants.ts";
import MongoDBStoreConstructor from "connect-mongodb-session";

const MongoDBStore = MongoDBStoreConstructor(session);


const app = express();
const PORT = 3000;

const mongodbStore = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "session",
})

// connect to the mongodb database
await connectDB()

app.use(express.json());
app.use(session({
  secret: SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }, // Set to true if using HTTPS
  store: mongodbStore
}));

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
