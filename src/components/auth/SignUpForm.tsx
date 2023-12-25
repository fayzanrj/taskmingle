"use client";
import { CapitalizeName } from "@/libs/CapitalizeName";
import {
  isValidEmail,
  isValidName,
  isValidPassword,
} from "@/libs/FormValidations";
import { getErrorMessage } from "@/libs/GetErrorMessage";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import VerifyEmailModal from "../VerifyEmailModal";
import AuthBtn from "./AuthBtn";
import Header from "./Header";
import InputField from "./InputField";

interface ErrorProps {
  [key: string]: boolean;
}

const SignUpForm = () => {
  // State variables
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [disableBtn, setDisableBtn] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");
  const [error, setError] = useState<ErrorProps>({
    fullNameError: true,
    emailError: true,
    passwordError: true,
    confirmPasswordError: true,
  });

  // Function to make states empty
  const clearStates = (): void => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  // Function to sign in
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Validating all values
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
      email: email.toLowerCase(),
      password,
    };

    try {
      setIsLoading(true);
      const response = await axios.post("api/auth/signup", data);
      setUserId(response.data.userId); // Set the userId
      setIsModalOpen(true);
      // clearStates();
      toast.success(response.data.message);
    } catch (error: any) {
      console.error(error);
      const errorMessage = getErrorMessage(error);
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

  return (
    <>
      {isModalOpen && (
        <VerifyEmailModal
          email={email}
          userId={userId}
          setState={setIsModalOpen}
          variant="SIGNUP"
        />
      )}
      <form
        className="w-11/12 md:w-96 h-[33rem] bg-white shadow-lg rounded-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-7 py-5"
        onSubmit={handleSignUp}
      >
        <Header variant="SIGN UP" />

        {/* Name Input Field */}
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

        {/* Email Input Field */}
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

        {/* Password Input Field */}
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

        {/* Confirm Password Input Field */}
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

        {/* Sign up button */}
        <AuthBtn
          disableBtn={disableBtn}
          isLoading={isLoading}
          btnText="SIGN UP"
        />

        {/* Log in link */}
        <div className="text-center my-4">
          <p className="text-sm font-semibold">
            Already a user?{" "}
            <span className="underline text-lg">
              <Link href={"/login"}>Log in</Link>
            </span>
          </p>
        </div>
      </form>
    </>
  );
};

export default SignUpForm;
