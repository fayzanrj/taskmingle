"use client";
import React, { useState } from "react";
import Logo from "../Logo";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";

const VerifyEmailMessage: React.FC = () => {
  // State to control the visibility of the verification message
  const [isOpen, setIsOpen] = useState<boolean>(true);

  // Component rendering when isOpen is true
  return (
    isOpen && (
      <div className="w-full h-screen flex justify-center items-center absolute top-0 left-0 bg-[rgb(0,0,0,0.2)]">
        <div className="w-96 h-fit bg-white shadow-lg rounded-lg p-5 text-center relative">
          {/* Logo and close button section */}
          <div>
            <Logo width={70} height={70} />
            <button
              className="absolute top-3 transform right-3"
              onClick={() => setIsOpen(false)}
            >
              {/* Close button */}
              <IoMdClose className="" size="1.5rem" />
            </button>
          </div>

          {/* Header */}
          <h3 className="my-4 text-3xl font-bold">Verify your email</h3>

          {/* Message */}
          <p className="my-5 font-semibold">
            In order to get notifications on your email, you need to verify your
            email
          </p>

          {/* Verification button */}
          <Link href={"/dashboard"}>
            <button className="py-2 px-5 bg-[#19fa9a] rounded-lg" onClick={() => setIsOpen(false)}>
              <p className="font-bold">Verify Now</p>
            </button>
          </Link>
        </div>
      </div>
    )
  );
};

export default VerifyEmailMessage;
