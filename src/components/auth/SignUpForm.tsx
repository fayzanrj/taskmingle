"use client";
import { CapitalizeName } from "@/libs/CapitalizeName";
import {
  isValidEmail,
  isValidName,
  isValidPassword,
} from "@/libs/FormValidations";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AuthBtn from "./AuthBtn";
import Header from "./Header";
import InputField from "./InputField";

interface ErrorProps {
  [key: string]: boolean;
}

// SignUpForm component
const SignUpForm = () => {
  // State variables for form fields
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [disableBtn, setDisableBtn] = useState<boolean>(true);
  const [error, setError] = useState<ErrorProps>({
    fullNameError: true,
    emailError: true,
    passwordError: true,
    confirmPasswordError: true,
  });

  // function to clear all the previous data
  const clearStates = (): void => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  // Handle sign-up form submission
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords does not match");
      return;
    }

    if (
      !isValidName(name) ||
      !isValidEmail(email) ||
      !isValidPassword(password)
    ) {
      toast.error("Please enter valid information");
      return;
    }

    const data = {
      name: CapitalizeName(name),
      email,
      password,
    };

    try {
      setIsLoading(true);

      //  api request
      const response = await axios.post("api/auth/signup", data);
      clearStates();
      toast.success(response.data.message);
    } catch (error: any) {
      const errorMessage =
        error.response?.data.message || "An error occurred. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const isButtonDisabled =
      error.fullNameError ||
      error.emailError ||
      error.passwordError ||
      error.confirmPasswordError;
    setDisableBtn(isButtonDisabled);
  }, [error]);

  // JSX for SignUpForm component
  return (
    <form
      className="w-11/12 md:w-96 h-[33rem] bg-white shadow-lg rounded-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-7 py-5"
      onSubmit={handleSignUp}
    >
      {/* HEADING */}
      <Header variant="SIGN UP" />

      {/* Full Name Input */}
      <InputField
        label="Full Name"
        type="text"
        id="fullName"
        disabled={isLoading}
        placeHolder="e.g. John Doe"
        state={name}
        setState={setName}
        setFormError={setError}
      />

      {/* Email Input */}
      <InputField
        label="Email"
        type="text"
        id="email"
        disabled={isLoading}
        placeHolder="e.g. johndoe@mail.com"
        state={email}
        setState={setEmail}
        setFormError={setError}
      />

      {/* Password Input */}
      <InputField
        label="Password"
        type="password"
        id="password"
        disabled={isLoading}
        placeHolder="e.g. ********"
        state={password}
        setState={setPassword}
        setFormError={setError}
      />

      {/* Confirm Password Input */}
      <InputField
        label="Confirm Password"
        type="password"
        id="confirmPassword"
        disabled={isLoading}
        placeHolder="e.g. ********"
        state={confirmPassword}
        setState={setConfirmPassword}
        password={password}
        setFormError={setError}
      />

      {/* SIGN UP Button */}
      <AuthBtn
        disableBtn={disableBtn}
        isLoading={isLoading}
        btnText="SIGN UP"
      />

      {/* Login Link */}
      <div className="text-center my-4">
        <p className="text-sm font-semibold">
          Already a user?{" "}
          <span className="underline text-lg">
            <Link href={"/login"}>Log in</Link>
          </span>
        </p>
      </div>
    </form>
  );
};

export default SignUpForm;
