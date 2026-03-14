import { Router } from "express";
import { createUser, loginUser, ResetPasswordController, sendResetPasswordLinkEmail } from "../controllers/auth.controller";
import { signupValidators, logInValidators,resetPasswordValidators, resetPasswordLinkValidators } from "../validators/authValidators";
import { validatorMiddleware } from "../middlewares/validator.middleware";
// import { isAuth } from "../middlewares/isauth.middleware.ts";

const router = Router();

// auth/login
router.post("/login",logInValidators, validatorMiddleware, loginUser );
router.post("/signup", signupValidators, validatorMiddleware, createUser);
router.post("/resetpassword", resetPasswordValidators, validatorMiddleware, sendResetPasswordLinkEmail)
router.post("/resetpassword/confirm", resetPasswordLinkValidators, validatorMiddleware, ResetPasswordController)


export default router;