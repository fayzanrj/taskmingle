import LogInForm from "@/components/auth/LogInForm";
import { Metadata, NextPage } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Log In  - Task Mingle",
};

const LogIn : NextPage = () => {
  return <LogInForm />;
};

export default LogIn;
