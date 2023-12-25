import React from "react";
import { IoMdClose } from "react-icons/io";

interface CloseBtnProps {
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}
const CloseBtn: React.FC<CloseBtnProps> = ({ setState }) => {
  // Function to handle click i.e. set provided state to false
  const handleClick = () => {
    setState(false);
  };
  return (
    <button
      className="absolute top-[35%] transform -translate-y-1/2 right-3"
      onClick={handleClick}
    >
      <IoMdClose className="" size="1.5rem" />
    </button>
  );
};

export default CloseBtn;
