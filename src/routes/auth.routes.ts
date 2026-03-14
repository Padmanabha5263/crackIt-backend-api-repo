import { Router } from "express";
import { createUser, loginUser, ResetPasswordController, sendResetPasswordLinkEmail } from "../controllers/auth.controller";
import { signupValidators } from "../validators/authValidators";
import { validatorMiddleware } from "../middlewares/validator.middleware";
// import { isAuth } from "../middlewares/isauth.middleware.ts";

const router = Router();

// auth/login
router.post("/login", loginUser );
router.post("/signup", signupValidators, validatorMiddleware, createUser);
router.post("/resetpassword", sendResetPasswordLinkEmail)
router.post("/resetpassword/confirm", ResetPasswordController)


export default router;