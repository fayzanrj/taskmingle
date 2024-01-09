import React from "react";
import Logo from "../../components/Logo";
import { Tailwind } from "@react-email/tailwind";
import {
  Container,
  Text,
  Head,
  Button,
  Html,
  Body,
} from "@react-email/components";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

interface CodeTemplateProps {
  taskId: string;
  name: string;
  taskTitle: string;
  taskDesc: string;
  url: string;
}
export function ReminderTemplate(props: CodeTemplateProps) {
  return (
    <Tailwind
      config={{
        theme: {
          extend: {},
        },
      }}
    >
      <Html>
        <Head />
        <Body>
          <Container className="w-96 h-fit mx-auto p-2">
            {/* LOGO */}
            <div
              className={`text-center text-2xl dark:text-white font-extrabold tracking-tighter ${montserrat.className}`}
            >
              <p>
                task<span className="logo text-[#19fa9a]">notify</span>
              </p>
            </div>

            <Text className="mt-5 font-semibold">
              Hi {props.name}&#44; hope you are doing great&#46; This email is a
              REMINDER of a task you added on Task Notify for us to remind you
              today&#46; Task Details are as following
            </Text>
            <Text
              style={{ letterSpacing: ".1rem" }}
              className="w-fit mx-auto mt-16 mb-8 text-3xl font-bold"
            >
              {props.taskTitle}
            </Text>
            <Text className="mt-5 font-semibold text-lg">
              Task Description : {props.taskDesc}
            </Text>
            <Text className="mt-5 font-semibold text-xl">
              Attached link : {props.url}
            </Text>
            <Text>For more details you can click on this button&#46;</Text>
            <Button
              href={`${process.env.HOST}/dashboard/tasks/${props.taskId}`}
              className="w-[90%] h-10 mx-auto rounded-lg  bg-white shadow-lg drop-shadow-lg"
            >
              See task details
            </Button>
            <Text className="mt-5 font-bold">
              Note :{" "}
              <Text className="font-semibold">
                If you have not scheduled this email&#44; change password of you
                account ASAP&#46; If you face any issue feel free to reply us on
                this email&#46;
              </Text>
            </Text>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
}
