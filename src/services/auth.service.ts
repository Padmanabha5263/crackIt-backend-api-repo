import { User } from "../models/user.model";
import bcrypt from "bcrypt";
import type {UserItem} from "../types/common.types";
import { generateResetToken } from "../util/cryptoutils";
import { EmailTemplates } from "../models/email.model";
import { replacePlaceholders } from "../util/email";
import {generateHashValueforString} from "../util/cryptoutils";
import { EmailService } from "./email.service";
import { AppError } from "../util/AppError";
import jwt from "jsonwebtoken";


export class AuthService {
  base_url:string = process.env.BASE_APPLICATION_URL;

  constructor() {
     console.log('AuthService initialized');
  }
  
  // send reset password email to the user 
  sendPasswordResetEmail = async (email: string) => {
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        throw new AppError("User not found",404);
      }

      const [tokenResult, templateResult] = await Promise.allSettled([
        generateResetToken(32),
        EmailTemplates.findOne({ template_name: "RESET_PASSWORD" })
      ]);

      if (tokenResult.status === "rejected") {
        throw new AppError("Failed to generate reset token",500);
      }

      if (templateResult.status === "rejected" || !templateResult.value?.is_active) {
        throw new AppError("Failed to fetch or email template is inactive",500);
      }

      const token = tokenResult.value;
      const template = templateResult.value;

      user.password_reset_token = token;
      user.password_reset_token_expiry = new Date(Date.now() + 3600000);
      await user.save();

      const resetLink = `${process.env.BASE_APPLICATION_URL}/resetpassword?token=${token}`;
      const finalEmailTemplate = replacePlaceholders(template.email_body, {
        subject: template.subject,
        email: user.email,
        resetLink,
        firstName: user.name
      });

      const emailService = new EmailService();
      await emailService.sendEmailNotification(user.email, template.subject, finalEmailTemplate);
    } 
    catch (error) {
      throw error;
    }
  }

  resetAccountPassword = async (email: string, newPassword: string, token: string) => {
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        throw new AppError("User not found",404);
      }
      if(user.password_reset_token_expiry && user.password_reset_token_expiry < new Date()) {
        throw new AppError("Reset token has expired", 406);
      }
      if(!user.password_reset_token || user.password_reset_token !== token) {
        throw new AppError("Invalid reset token", 422);
      }
      const hashedPassword = await generateHashValueforString(newPassword);
      user.password = hashedPassword.toString();
      return await user.save();
    } 
    catch (error) {
      throw error;
    }
  }


  // function to create a new user in the database i,e signup user function
  createUser = async (data: UserItem) => {
    try {
      const hashedPassword = await generateHashValueforString(data.password);
      const user = new User({
        name: data.name,
        dob: data.dob,
        email: data.email,
        password: hashedPassword,
        usertype: data.usertype
      });
      return await user.save();
    } 
    catch (error) {
      throw error
    }
  }

  // function to authenticate user i,e login user function
  authenticateUser = async (email: string, password: string) => {
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        throw new AppError("User not found", 404)
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new AppError("Invalid password",401);
      }
      return user;
    } 
    catch (error) {
      throw error
    }
  }   
}