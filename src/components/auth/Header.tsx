import React from "react";
import Logo from "../Logo";
import Link from "next/link";

interface HeaderProps {
  variant: "SIGN UP" | "LOG IN";
}
const Header: React.FC<HeaderProps> = ({ variant }) => {
  return (
    <header className="flex justify-between items-center">
      <Link href={"/"}>
        <Logo width={80} height={1} />
      </Link>
      <h1 className="text-3xl font-bold underline">{variant}</h1>
    </header>
  );
};

export default Header;
