const nodemailer = require("nodemailer");
import { render } from "@react-email/render";
import { ReminderTemplate } from "./emailTemplates/ReminderTemplate";

export const SendReminderEmail = async (
  name: string,
  email: string,
  taskTitle: string,
  taskDesc: string,
  taskId: string,
  url: string | null
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

    const reminderTemplate = render(
      ReminderTemplate({
        name: name,
        taskTitle: taskTitle,
        taskDesc: taskDesc,
        taskId: taskId,
        url: url === null || url === "" ? "N/A" : url,
      })
    );

    const emailSent = await transporter.sendMail({
      from: `"Task Notify" <${process.env.EMAIL}>`,
      to: email,
      subject: "Task Reminder",
      html: reminderTemplate,
    });
    console.log(emailSent);

    return emailSent;
  } catch (error: any) {
    console.log(error.message);
    return error;
  }
};
