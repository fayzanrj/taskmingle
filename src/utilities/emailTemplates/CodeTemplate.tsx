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
export function CodeTemplate(props: CodeTemplateProps) {
    const customStyles = `
    .logo {
      position: relative;
      padding: 2px 13px 2px 10px;
      margin-left: 10px;
      color: black;
      z-index: 999;
    }

    .logo::before {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      transform: skewX(-33deg);
      background-color: #19fa9a;
      border-radius: 0.5rem;
      z-index: -1;
    }
  `;
  return (
    <Tailwind
      config={{
        theme: {
          extend: {},
        },
      }}
    >
      <Head>
        <title>Code Verification Email</title>
        <style>{customStyles}</style>
      </Head>
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
          Hi {props.name}&#44; hope you are doing great&#46; Here is your
          verification code.
        </Text>
        <Text
          style={{ letterSpacing: ".5rem" }}
          className="w-fit mx-auto my-5 text-6xl font-bold"
        >
          {props.code}
        </Text>
        <Text className="mt-5 font-semibold">
          Please keep in mind&#44; without verifying your account you will not
          be able to get email notifications of your scheduled tasks&#46;
        </Text>
        <Text className="mt-5 font-bold">
          Note :{" "}
          <Text className="font-semibold">
            If you have not requested this code&#44; reply us back on this email
            ASAP
          </Text>
        </Text>
      </Container>
    </Tailwind>
  );
}
