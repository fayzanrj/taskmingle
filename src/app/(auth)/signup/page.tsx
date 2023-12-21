import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Sign Up - Task Mingle",
  description: "Sign Up to Task Mingle",
};

const SignUp = () => {
  return <SignUpForm />;
};

export default SignUp;
