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

    const emailSent = await transporter.sendMail({
      from: `"Task Notify" <${process.env.EMAIL}>`,
      to: email,
      subject: subject,
      html: `
      <div style="text-align: center; font-size: 2xl; color: white; font-weight: bold; letter-spacing: .1rem;">
        <p>
          task<span style="color: #19fa9a;">notify</span>
        </p>
      </div>
    
      <p style="margin-top: 5px; font-weight: bold;">
        Hi ${name}, hope you are doing great. Here is your verification code.
      </p>
    
      <p style="letter-spacing: .5rem; width: fit-content; margin: 5px auto 5px auto; font-size: 6xl; font-weight: bold;">
        ${code}
      </p>
    
      <p style="margin-top: 5px; font-weight: bold;">
        Please keep in mind, without verifying your account you will not be able to get email notifications of your scheduled tasks.
      </p>
    
      <p style="margin-top: 5px; font-weight: bold;">
        Note:
        <span style="font-weight: bold;">
          If you have not requested this code, reply us back on this email ASAP.
        </span>
      </p>
    `,
    });

    return emailSent;
  } catch (error: any) {
    console.log(error.message);
    return error;
  }
};
