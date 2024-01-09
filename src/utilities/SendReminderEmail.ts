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
      html: `Hi ${name}, hope you are doing good. This is reminder that you scheduled for today`,
    });

    return emailSent;
  } catch (error: any) {
    console.log(error.message);
    return error;
  }
};