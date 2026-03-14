import { body } from "express-validator";

export const signupValidators = [
    body("email").isEmail().withMessage("Please provide a valid email address."),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long."),
    body("confirm_password").notEmpty().withMessage("confirm password required")
        .custom((value, { req }) => value === req.body.password)
        .withMessage("Passwords do not match."),
    body("dob").isDate().withMessage("Please provide a valid date of birth")

]

export const logInValidators =[
    body("email").notEmpty().withMessage("Email is required.")
        .isEmail().withMessage("Please provide a valid email address."),
    body("password").notEmpty().withMessage("Password is required.")
]

export const resetPasswordValidators = [
    body("email").notEmpty().withMessage("Email is required.")
        .isEmail().withMessage("Please provide a valid email address.")
]

export const resetPasswordLinkValidators = [
    body("new_password").isLength({min: 6}).withMessage("Password must be at least 6 characters long."),
    body("token").notEmpty().withMessage("Token is required."),
    body("email").notEmpty().withMessage("Email is required.")
        .isEmail().withMessage("Please provide a valid email address."),
    body("confirm_password").notEmpty().withMessage("Confirm password is required.")
        .custom((value, {req}) => value === req.body.new_password).withMessage("Passwords do not match.")
]

