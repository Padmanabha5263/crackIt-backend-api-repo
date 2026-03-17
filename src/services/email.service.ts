import nodemailer from "nodemailer";

export class EmailService{
    private readonly transporter: nodemailer.Transporter;
    private readonly fromEmail: string;
    private readonly password: string;

    constructor() {
        // Validate required environment variables
        this.fromEmail = process.env.EMAIL_NOTIFICATION_FROM_MAIL;
        this.password = process.env.EMAIL_NOTIFICATION_GMAIL_API_KEY;
        
        if (!this.fromEmail || !this.password) {
            throw new Error('Missing required email configuration environment variables');
        }

        this.transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: this.fromEmail,
                pass: this.password
            }
        });
    }

    async sendEmailNotification(toEmail: string, subject: string, text: string): Promise<nodemailer.SentMessageInfo> {
        // Validate input parameters
        if (!toEmail || !subject || !text) {
            throw new Error('Missing required email parameters');
        }

        return await this.transporter.sendMail({
            from: this.fromEmail,
            to: toEmail,
            subject: subject,
            html: text
        });
    }

}
