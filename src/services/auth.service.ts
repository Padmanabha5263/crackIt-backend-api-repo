import { User } from "../models/user.model.ts";
import bcrypt from "bcrypt";
import type {UserItem} from "../types/user.types.ts";


export class AuthService {
  constructor() {
     console.log('AuthService initialized');
  }
  
  validatePassword = async (password: string, hashedPassword: string): Promise<Boolean> => {
    return await bcrypt.compare(password, hashedPassword);
  };
  
  hashPassword = async (password: string): Promise<String> => {
    return await bcrypt.hash(password, 10);
  };

  // function to create a new user in the database i,e signup user function
  createUser = async (data: UserItem) => {
    try {
      const hashedPassword = await this.hashPassword(data.password);
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

      const isMatch = await this.validatePassword(password, user.password);

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