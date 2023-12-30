"use client";
import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import GoBack from "@/components/GoBack";
import InputField from "@/components/auth/InputField";
import ActivityLoader from "@/components/ActivityLoader";
import toast from "react-hot-toast";
import axios from "axios";
import { useSession } from "next-auth/react";
import { getErrorMessage } from "@/libs/GetErrorMessage";

// Error types for form validation
interface ErrorProps {
  [key: string]: boolean;
}

const ChangePassword: NextPage = () => {
  const { data: session } = useSession();
  // State variables for managing component state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const [disableBtn, setDisableBtn] = useState<boolean>(true);
  const [error, setError] = useState<ErrorProps>({
    passwordError: true,
    newPasswordError: true,
    confirmPasswordError: true,
  });

  // Headers
  const headers = {
    "Content-Type": "application/json",
    //@ts-ignore
    accessToken: session?.user?.accessToken,
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      if (newPassword !== confirmNewPassword) {
        toast.error("Passwords does not matches");
        return;
      }

      // Api request
      const data = { oldPassword, newPassword };
      const res = await axios.put("/api/user/changePass", data, { headers });
      // Success message
      toast.success(res.data.message);
    } catch (error: any) {
      console.error(error.message);
      // Error message
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Update button disable state based on form errors
  useEffect(() => {
    const isButtonDisabled =
      oldPassword.length <= 1 ||
      error.newPasswordError ||
      error.confirmPasswordError;
    setDisableBtn(isButtonDisabled);
  }, [error]);

  return (
    <div className=" flex flex-col items-center py-10 relative">
      {/* GoBack button  */}
      <GoBack />

      {/* Heading */}
      <h3 className=" my-4 text-2xl font-bold">Change Password</h3>

      <form className="w-11/12 sm:w-96" onSubmit={handleSubmit}>
        {/* Input field for the old password */}
        <InputField
          variant="NO_VALIDATION"
          type="password"
          id="password"
          label={"Old Password"}
          placeHolder="Enter old password"
          disabled={isLoading}
          state={oldPassword}
          setState={setOldPassword}
          setFormError={setError}
        />

        {/* Input field for the new password */}
        <InputField
          type="password"
          id="newPassword"
          label={"New Password"}
          placeHolder="Enter new password"
          disabled={isLoading}
          state={newPassword}
          setState={setNewPassword}
          setFormError={setError}
        />

        {/* Input field for confirming the new password */}
        <InputField
          type="password"
          id="confirmPassword"
          label={"Confirm New Password"}
          placeHolder="Confirm new password"
          disabled={isLoading}
          state={confirmNewPassword}
          setState={setConfirmNewPassword}
          password={newPassword}
          setFormError={setError}
        />

        {/* Button for submitting the form */}
        <div className="text-right">
          <button
            type="submit"
            className="mt-12 w-56 h-10 font-semibold text-lg bg-[#19fa9a] rounded-lg outline-none disabled:bg-[#19fa984c] disabled:text-gray-500"
            disabled={isLoading || disableBtn}
          >
            {/* Show loading spinner during form submission */}
            {isLoading ? <ActivityLoader /> : "Change Password"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
