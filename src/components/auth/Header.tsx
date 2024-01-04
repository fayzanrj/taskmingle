import React from "react";
import Logo from "../Logo";
import Link from "next/link";
import ThemeToggleNavbarBtn from "../landingPage/ThemeToggleNavbarBtn";

interface HeaderProps {
  variant: "SIGN UP" | "LOG IN";
}
const Header: React.FC<HeaderProps> = ({ variant }) => {
  return (
    <header className="flex justify-between items-center">
      {/* Logo */}
      <Link href={"/"}>
        <Logo width={80} height={1} />
      </Link>
      {/* Header text */}
      <h1 className="text-3xl font-bold underline">{variant}</h1>
      <ThemeToggleNavbarBtn />
    </header>
  );
};

export default Header;
