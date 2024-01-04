"use client";
import React, { useState } from "react";
import Link from "next/link";
import Logo from "../Logo";
import Image from "next/image";
import ThemeToggleNavbarBtn from "./ThemeToggleNavbarBtn";

// Landing page navbar links interface
interface NavLink {
  text: string;
  href: string;
  className?: string;
}

// Navbar links
const navLinks: NavLink[] = [
  { text: "Repository", href: "#" },
  { text: "Twitter", href: "#" },
  { text: "Login", href: "/login" },
  {
    text: "Sign Up",
    href: "/signup",
    className:
      "bg-gradient-to-br from-[#19fa9a] to-[#22C1C3] text-white py-4 px-9 rounded-lg",
  },
];

const Navbar: React.FC = () => {
  // Variable state
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle navbar
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="p-4 w-screen bg-white dark:bg-[#1f1f1f]  md:bg-transparent fixed top-0 z-50">
      <div className=" flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Image
            width={120}
            height={100}
            quality={100}
            src={require("@/assets/logo/landingPageLogo.png")}
            alt="logo"
          />
        </Link>

        {/* Hamburger menu button for small screens */}
        <button
          className="md:hidden text-black dark:text-white focus:outline-none"
          onClick={toggleNavbar}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Navbar */}
        <div
          className={`w-4/5 sm:w-2/5 md:w-fit h-[100svh] md:h-full py-16 md:py-0 block md:flex bg-white dark:bg-[#1f1f1f] md:dark:bg-transparent md:bg-transparent text-center fixed right-0 top-0 md:relative border-l-2 border-stoner-200 md:border-0 transition-transform transform ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } md:translate-x-0 `}
        >
          {/* Close Button */}
          {isOpen && (
            <button
              className="md:hidden absolute top-10 left-5 text-black dark:text-white"
              onClick={toggleNavbar}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}

          {/* Navigation Links */}
          <ul>
            {navLinks.map((link) => (
              <li
                key={link.text}
                className="block md:inline-block md:mx-5 my-10 md:my-1 font-semibold text-lg"
              >
                <Link href={link.href} className={link.className}>
                  {link.text}
                </Link>
              </li>
            ))}
            <li className="block md:inline-block md:mx-5 my-5 md:my-1 font-semibold text-lg">
              <ThemeToggleNavbarBtn />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
