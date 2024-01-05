"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

const GoBack: React.FC = () => {
  // Router for navigation
  const router = useRouter();
  return (
    <>
      <button
        className="absolute top-4 left-4 select-none cursor-pointer"
        onClick={() => router.back()}
      >
        <FaArrowLeftLong className="inline-block" />
        <p className="inline-block ml-1 font-semibold text-sm">Go back</p>
      </button>
      <div className="w-full h-4 "></div>
    </>
  );
};

export default GoBack;
