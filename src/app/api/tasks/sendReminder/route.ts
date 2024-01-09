import prisma from "@/app/db";
import {
  ThrowServerError,
  ThrowUnAuthorizedError,
} from "@/libs/backend/ResponseErrors";
import { SendReminderEmail } from "@/utilities/SendReminderEmail";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const reminderId = req.headers.get("sendReminderId");
    if (reminderId !== process.env.REMINDER_ID) {
      return ThrowUnAuthorizedError();
    }

    const date = new Date();
    date.setSeconds(0, 0);
    let formattedTimestamp = date.toISOString();
    formattedTimestamp = formattedTimestamp.replace("Z", "+00:00");

    const tasks = await prisma.task.findMany({
      where: { reminderAt: formattedTimestamp, sendReminder: true },
    });

    const emailPromises = tasks.map(async (task) => {
      const user = await prisma.user.findUnique({
        where: { id: task.createdById },
      });

      if (user) {
        return SendReminderEmail(
          user.name,
          user.email,
          task.taskTitle,
          task.taskDesc,
          task.id,
          task.link,
          task.status
        );
      }

      return null;
    });

    await Promise.all(emailPromises);

    // returning task as response
    return NextResponse.json({ message: "Sent successfully" }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return ThrowServerError();
  }
};
