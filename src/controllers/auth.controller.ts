import type { NextFunction, Request,Response } from "express";
import { AuthService } from "../services/auth.service";
import { UserRoles } from "../types/common.types";
import type { UserItem } from "../types/common.types";
import { AppError } from "../util/AppError";
import jwt from 'jsonwebtoken'

const authService = new AuthService();

// reset password service using email
export const sendResetPasswordLinkEmail = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const { email }:{email:string} = req.body;
    await authService.sendPasswordResetEmail(email);
    res.json({
      message: "Password reset email sent successfully",
    });
  } catch (error) {
    next(error)
  }
}
export const ResetPasswordController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, new_password, token }:{email:string; new_password:string, token:string} = req.body;
    const result = await authService.resetAccountPassword(email, new_password, token);
    res.json({
      message: "Password updated successfully",
      data: {id:result._id, email:result.email}
    });
  } catch (error) {
    next(error)
  }
}

export const createUser = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const usertype:UserRoles = "student"
    const {dob, email, password }:{dob:Date; email:string; password:string} = req.body;

    const user = await authService.createUser({
      dob,
      email,
      password,
      usertype
    } as UserItem);

    if(!user){
     throw new AppError("Error creating user", 500)
    }

    res.status(201).json({
      message: "User created successfully",
      data: {userId: user._id,email:user.email}
    });

  } 
  catch (error) {
    next(error)
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password }: {email:string; password:string} = req.body; 
    const user = await authService.authenticateUser(email, password);
    if(!user){
      throw new AppError("User not found", 404)
    }
    const token:string = jwt.sign({ id: user._id, email: user.email, group: user.user_type }, process.env.JWT_SECRET_KEY as string, { expiresIn: '1h' })
    
    res.status(200).json({
      message: "Login successful",
      data: {token, id:user._id, group:user.user_type, email:user.email}
    });
  } 
  catch (error) {
    next(error);
  }
};