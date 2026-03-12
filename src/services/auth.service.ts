import { User } from "../models/user.model.ts";
import bcrypt from "bcrypt";
import type {UserItem} from "../types/user.types.ts";
import { generateResetToken } from "../util/cryptoutils.ts";
import { EmailTemplates } from "../models/email.model.ts";
import { replacePlaceholders } from "../util/email.ts";
import {generateHashValueforString} from "../util/cryptoutils.ts";
import { EmailService } from "./email.service.ts";


export class AuthService {
  constructor() {
     console.log('AuthService initialized');
  }
  
  // send reset password email to the user 
  sendPasswordResetEmail = async (email: string) => {
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        throw new Error("User not found");
      }

      const [tokenResult, templateResult] = await Promise.allSettled([
        generateResetToken(32),
        EmailTemplates.findOne({ template_name: "RESET_PASSWORD" })
      ]);

      if (tokenResult.status === "rejected") {
        throw new Error("Failed to generate reset token");
      }

      if (templateResult.status === "rejected" || !templateResult.value?.is_active) {
        throw new Error("Failed to fetch or email template is inactive");
      }

      const token = tokenResult.value;
      const template = templateResult.value;

      user.passwordResetToken = token;
      user.passwordResetTokenExpiry = new Date(Date.now() + 3600000);
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
      if (!newPassword) {
        throw new Error("New password is required");
      }
      const user = await User.findOne({ email: email });
      if (!user) {
        throw new Error("User not found");
      }
      if(user.passwordResetTokenExpiry && user.passwordResetTokenExpiry < new Date()) {
        throw new Error("Reset token has expired");
      }
      if(!user.passwordResetToken || user.passwordResetToken !== token) {
        throw new Error("Invalid reset token");
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
        age: data.age,
        email: data.email,
        phone: data.phone,
        password: hashedPassword,
        usertype: data.usertype
      });
      return await user.save();
    } 
    catch (error) {
      throw new Error("Error occurred while authenticating user");
    }
  }

  // function to authenticate user i,e login user function
  authenticateUser = async (email: string, password: string) => {
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        throw new Error("User not found");
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        throw new Error("Invalid password");
      }

      return user;
    } 
    catch (error) {
      throw error
    }
  }


    
}