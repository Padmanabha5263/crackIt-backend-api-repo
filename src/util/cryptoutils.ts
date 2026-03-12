import crypto from "crypto";
import bcrypt from 'bcrypt'

export const generateResetToken = (size: number):Promise<string> => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(size, (err, buf) => {
      if (err) {
        reject(err);
      } else {
        resolve(buf.toString('hex'));
      }
    });
  });
}

export const generateHashValueforString = async(value: string):Promise<string> => {
  try {
    const hashedValue =  await bcrypt.hash(value, 10);
    return hashedValue;
  } 
  catch (error) {
    throw error;
  }
}
