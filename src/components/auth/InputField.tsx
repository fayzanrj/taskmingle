import {
  isPasswordMatches,
  isValidEmail,
  isValidName,
  isValidPassword,
} from "@/libs/FormValidations";
import React, { useState } from "react";
import RenderIcon from "./RenderIcon";
import ShowPassBtn from "./ShowPassBtn";

// Error interface
interface ErrorProps {
  [key: string]: boolean;
}

// Input Field interface
interface InputFieldPropTypes {
  type: "password" | "text";
  id: string;
  label: string;
  placeHolder: string;
  disabled: boolean;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  variant?: "NO_VALIDATION";
  password?: string;
  setFormError?: React.Dispatch<React.SetStateAction<ErrorProps>>;
}

// Validation functions for different fields
const validationFunctions: { [key: string]: (value: string) => boolean } = {
  fullName: isValidName,
  email: isValidEmail,
  password: isValidPassword,
  newPassword: isValidPassword,
};

// Input Field component
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
  // State variables
  const [showPass, setShowPass] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  // Function to validate all types of fields except CONFIRM PASSWORD
  const validateField = (value: string): void => {
    // Finding function for input type
    const validate = validationFunctions[id];

    // If function is found
    if (validate) {
      const isValid = validate(value);
      if (setFormError) {
        // Updating form errors
        setFormError((prev): ErrorProps => {
          const newList = { ...prev };
          newList[id + "Error"] = !isValid;
          return newList;
        });
      }

      // Setting error
      setError(!isValid);
    }
  };

  // Validating confirm password field
  const comparePassword = (value: string): void => {
    if (password) {
      // Matching password and confirm password fields values
      const passwordMatches = isPasswordMatches(value, password);
      if (setFormError) {
        // Updating form errors
        setFormError((prev): ErrorProps => {
          const newList = { ...prev };
          newList.confirmPasswordError = !passwordMatches;
          return newList;
        });
      }
      
      // Setting error
      setError(!passwordMatches);
    }
  };

  // Function to decide which field to validate
  const handleValidate = (value: string): void => {
    id === "confirmPassword" ? comparePassword(value) : validateField(value);
  };

  return (
    <div className="my-3">
      {/* Field Label */}
      <label htmlFor={id} className="text-[1rem] ml-1 font-semibold">
        {label}
        <span>
          {state.length > 0 && variant !== "NO_VALIDATION" && (
            <RenderIcon error={error} label={label} />
          )}
        </span>
      </label>
      <br />

      {/* Field */}
      <div className="relative ">
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
          className={`w-full rounded-lg p-2 my-1  bg-[#1F1F1F]  outline-none font-semibold ${
            type === "password" && state.length > 0 && "pr-7"
          }`}
        />
        {/* Eye button to toggle password type */}
        {type === "password" && state.length > 0 && (
          <ShowPassBtn showPass={showPass} setShowPass={setShowPass} />
        )}
      </div>
    </div>
  );
};

export default InputField;
