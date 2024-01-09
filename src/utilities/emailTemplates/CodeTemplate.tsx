import React from "react";
import Logo from "../../components/Logo";
import { Tailwind } from "@react-email/tailwind";
import { Container, Text, Head } from "@react-email/components";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

interface CodeTemplateProps {
  code: string;
  name: string;
}

const CodeTemplate: React.FC<CodeTemplateProps> = ({ code, name }) => {
  return (
    <div>
      <div
        className={`text-center text-2xl dark:text-white font-extrabold tracking-tighter ${montserrat.className}`}
      >
        <p>
          task<span className="logo">notify</span>
        </p>
      </div>

      <p className="text-lg font-semibold">
        Hi ${name}, hope you are doing great.Welcome to Task Notify, hope we
        would be able to help your remember tasks/chores more often and manage
        your life in a better way. Here is your verification code.
      </p>

      <p style={{ letterSpacing: "0.5rem" }} className="text-6xl font-bold">
        {code}
      </p>
      <p className="text-lg font-semibold">
        Please keep in mind, without verifying your account you will not be able
        to get email notifications of your scheduled tasks.
      </p>
      <p className="text-sm font-bold">
        Note :{" "}
        <span className="font-semibold">
          If you have not requested this code, reply us back on this email ASAP.
        </span>
      </p>
    </div>
  );
};

export default CodeTemplate;
