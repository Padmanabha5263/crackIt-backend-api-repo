import type { Request } from "express";
import type { Response } from "express";
import { AuthService } from "../services/auth.service";

const authService = new AuthService();

// reset password service using email
export const sendResetPasswordLinkEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const result = await authService.sendPasswordResetEmail(email);
    res.json({
      message: "Password reset email sent successfully",
      data: result
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({
      message: "Password reset failed",
      error: errorMessage
    });
  }
}
export const ResetPasswordController = async (req: Request, res: Response) => {
  try {
    const { email, new_password, token } = req.body;
    const result = await authService.resetAccountPassword(email, new_password, token);
    res.json({
      message: "Password updated successfully",
      data: result
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({
      message: "Password reset failed",
      error: errorMessage
    });
  }
}

export const createUser = async (req: Request, res: Response) => {
  try {

    const { name, age, email, phone, password, usertype } = req.body;

    const user = await authService.createUser({
      name,
      age,
      email,
      phone,
      password,
      usertype
    });

    res.status(201).json({
      message: "User created successfully",
      data: user
    });

  } catch (error) {

    res.status(500).json({
      message: "Error creating user",
      error
    });

  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body; 
    const user = await authService.authenticateUser(email, password);
    if(user){
      req.session.isLoggedIn = true;
      req.session.user = {
        id: user.id,
        name: user.name,
        email: user.email,
        usertype: user.usertype
      };
    }

    res.json({
      message: "Login successful",
      data: user
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(401).json({
      data: null,
      message: "Login failed",
      error: errorMessage
    });
  }
};