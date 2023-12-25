import React from "react";
import toast from "react-hot-toast";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

// Render Icon interface
interface RenderIconProps {
  error: boolean;
  label: string;
}

const RenderIcon: React.FC<RenderIconProps> = ({ error, label }) => (
  <span
    onClick={() =>
      error
        ? label === "Confirm Password"
          ? toast.error(`Passwords are not matching`)
          : toast.error(`Please enter a valid ${label.toLowerCase()}`)
        : toast.success(`${label} is valid`)
    }
  >
     {/* Check or Cross icon based on the error status */}
    {error ? (
      <FaTimesCircle
        size="1rem"
        color="red"
        className="inline-block ml-2 cursor-pointer"
      />
    ) : (
      <FaCheckCircle
        size="1rem"
        color="#19fa9a"
        className="inline-block ml-2 cursor-pointer"
      />
    )}
  </span>
);

export default RenderIcon;
