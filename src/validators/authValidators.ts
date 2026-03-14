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