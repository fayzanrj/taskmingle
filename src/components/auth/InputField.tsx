import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import ShowPassBtn from "./ShowPassBtn";
import {
  isPasswordMatches,
  isValidEmail,
  isValidName,
  isValidPassword,
} from "@/libs/FormValidations";
import RenderIcon from "./RenderIcon";

interface ErrorProps {
  [key: string]: boolean;
}

interface InputFieldPropTypes {
  type: "password" | "text";
  id: "email" | "password" | "confirmPassword" | "fullName";
  label: "Email" | "Password" | "Confirm Password" | "Full Name";
  placeHolder: string;
  disabled: boolean;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  variant?: "LOGINPASS";
  password?: string;
  setFormError?: React.Dispatch<React.SetStateAction<ErrorProps>>;
}
// ... (imports and interfaces remain the same)

const InputField: React.FC<InputFieldPropTypes> = ({
  type,
  id,
  label,
  disabled,
  placeHolder,
  state,
  setState,
  variant,
  password,
  setFormError,
}) => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  // Validation functions for different fields
  const validationFunctions: { [key: string]: (value: string) => boolean } = {
    fullName: isValidName,
    email: isValidEmail,
    password: isValidPassword,
  };

  // Function to validate all types of fields except CONFIRM PASSWORD
  const validateField = (value: string): void => {
    const validate = validationFunctions[id];

    if (validate) {
      const isValid = validate(value);
      if (setFormError) {
        setFormError((prev): ErrorProps => {
          const newList = { ...prev };
          newList[id + "Error"] = !isValid;
          return newList;
        });
      }

      setError(!isValid);
    }
  };

  // Validating confirm password field
  const comparePassword = (value: string): void => {
    if (password) {
      const passwordMatches = isPasswordMatches(value, password);
      setError(!passwordMatches);
      if (setFormError) {
        setFormError((prev): ErrorProps => {
          const newList = { ...prev };
          newList.confirmPasswordError = !passwordMatches;
          return newList;
        });
      }
    }
  };

  // Function to decide which field to validate
  const handleValidate = (value: string): void => {
    id === "confirmPassword" ? comparePassword(value) : validateField(value);
  };

  return (
    <div className="my-3">
      <label htmlFor={id} className="text-[1rem] ml-1 font-semibold">
        {label}
        <span>
          {state.length > 0 && variant !== "LOGINPASS" && <RenderIcon error={error} label={label} />}
        </span>
      </label>
      <br />
      <div className="relative">
        <input
          id={id}
          aria-label="FormInputField"
          type={showPass ? "text" : type}
          disabled={disabled}
          placeholder={placeHolder}
          value={state}
          onChange={(e): void => {
            setState(e.currentTarget.value);
            e.currentTarget.value.length === 0
              ? setError(false)
              : handleValidate(e.target.value);
          }}
          onBlur={() => validateField(state)}
          className={`w-full rounded-lg p-2 my-1 border-gray-200 border-2 outline-none ${
            type === "password" && state.length > 0 && "pr-7"
          }`}
        />
        {type === "password" && state.length > 0 && (
          <ShowPassBtn showPass={showPass} setShowPass={setShowPass} />
        )}
      </div>
    </div>
  );
};

export default InputField;
