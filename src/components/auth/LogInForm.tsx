"use client";
import { isValidEmail } from "@/libs/FormValidations";
import { getErrorMessage } from "@/libs/GetErrorMessage";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AuthBtn from "./AuthBtn";
import Header from "./Header";
import InputField from "./InputField";

// Error interface
interface ErrorProps {
  [key: string]: boolean;
}

const LogInForm = () => {
  // State variables for form fields
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [disableBtn, setDisableBtn] = useState<boolean>(true);
  const [errors, setErrors] = useState<ErrorProps>({ emailError: true });
  // Router to navigate
  const router = useRouter();

  // Function to handle login form submission
  const handleLogIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      toast.error("Invalid Email");
      return;
    }
    if (password.length === 0) {
      toast.error("Enter Password");
      return;
    }

    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        email: email.toLowerCase(),
        password: password,
        redirect: false,
      });

      if (res && res.ok) {
        router.push("/dashboard");
        toast.success("Logged in successfully. Redirecting to dashboard.");
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error : any) {
      console.error(error);
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // use effect to check validations status and disable button
  useEffect(() => {
    setDisableBtn(password.length <= 1 && errors.emailError);
  }, [errors, password]);

  return (
    <form
      className="w-11/12 md:w-96 h-96 bg-white shadow-lg rounded-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-7 py-8"
      onSubmit={handleLogIn}
    >
      {/* HEADING */}
      <Header variant="LOG IN" />

      {/* Email Input */}
      <InputField
        label="Email"
        type="text"
        id="email"
        disabled={isLoading}
        placeHolder="Enter your email"
        state={email}
        setState={setEmail}
        setFormError={setErrors}
      />

      {/* Password Input */}
      <InputField
        label="Password"
        type="password"
        id="password"
        disabled={isLoading}
        placeHolder="Enter your password"
        state={password}
        setState={setPassword}
        variant="NO_VALIDATION"
      />

      {/* Login Button */}
      <AuthBtn disableBtn={disableBtn} isLoading={isLoading} btnText="LOG IN" />

      {/* Signup Link */}
      <div className="text-center my-4">
        <p className="text-sm font-semibold">
          Not a user?{" "}
          <span className="underline text-lg">
            <Link href={"/signup"}>Sign up</Link>
          </span>
        </p>
      </div>
    </form>
  );
};

// Exporting LogInForm component
export default LogInForm;
