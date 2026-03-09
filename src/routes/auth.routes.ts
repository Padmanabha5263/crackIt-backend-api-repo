import { Router } from "express";
import { createUser, loginUser } from "../controllers/auth.controller.ts";

const router = Router();

// auth/login
router.post("/login",loginUser );
router.post("/signup", createUser);

export default router;