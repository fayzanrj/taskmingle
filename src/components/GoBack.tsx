"use client";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";

const GoBack = ({ href }: { href: string }) => {
  return (
    <>
      <Link
        href={href}
        className="absolute top-4 left-4 select-none cursor-pointer"
      >
        <FaArrowLeftLong className="inline-block" />
        <p className="ml-1 text-sm font-semibold inline-block">Go back</p>
      </Link>
      <div className="w-full h-4"></div>
    </>
  );
};

export default GoBack;
