const nodemailer = require("nodemailer");

export const SendCodeEmail = async (email : string, name : string, subject : string, code : string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "gmail",
      port: 587,
      secure: true,
      auth: {
        user: "babufizz@gmail.com",
        pass: "mkzn lkna fhep snre ",
      },
    });

    const emailSent = await transporter.sendMail({
      from: '"Task Mingke" <babufizz@gmail.com>',
      to: email,
      subject: subject,
      html: `Hi ${name}, hope you are doing good. Your verification code is ${code}.`,
    });
    
    return emailSent;
  } catch (error) {
    console.log("email not sent!");
    console.log(error);
    return error;
  }
};
