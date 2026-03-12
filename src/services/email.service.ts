import nodemailer from "nodemailer";

export class EmailService{
    transporter: nodemailer.Transporter;
    fromEmail: string = "padmanabha.abd@gmail.com";

    constructor() {
        this.transporter=nodemailer.createTransport({
            host: "smtp.gmail.com",
            auth: {
                user: this.fromEmail,       // your Gmail address
                pass: process.env.GMAIL_API_KEY           // generated app password
            }
        })
  
    }

    sendEmailNotification = async (toEmail: string, subject: string, text: string): Promise<any> => {
        try {
            const result = await this.transporter.sendMail({
                from: this.fromEmail,
                to: toEmail,
                subject: subject,
                html: text
            });
            return result;
        } catch (error) {
            throw error;
        }
    }

}