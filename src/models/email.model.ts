import mongoose from "mongoose";


const emailTemplateSchema = new mongoose.Schema(
  {
    template_name: {
      type: String,
        required: true,
    },
    subject: {
      type: String,
        required: true,
    },
    email_body: {
      type: String,
        required: true,
    },
    is_active: {
      type: Boolean,
        required: true,
    } 
  }
);

export const EmailTemplates = mongoose.model("email_templates", emailTemplateSchema);
