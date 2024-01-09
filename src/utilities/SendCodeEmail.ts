import { CodeTemplate } from "@/utilities/emailTemplates/CodeTemplate";
import { render } from "@react-email/render";
const nodemailer = require("nodemailer");

export const SendCodeEmail = async (
  email: string,
  name: string,
  subject: string,
  code: string
) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "gmail",
      port: 587,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    const codeTemplateHtml = render(CodeTemplate({ code: code, name: name }));

    const emailSent = await transporter.sendMail({
      from: `"Task Notify" <${process.env.EMAIL}>`,
      to: email,
      subject: subject,
      html: codeTemplateHtml,
    });

    return emailSent;
  } catch (error: any) {
    console.log(error.message);
    return error;
  }
};
