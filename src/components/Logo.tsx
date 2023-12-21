import React from "react";
import logo from "@/assets/logo/taskMingleLogo.png";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  width: number;
  height: number;
}

const Logo: React.FC<LogoProps> = ({ width, height }) => {
  return <Image src={logo} width={width} height={height} alt="logo" />;
};

export default Logo;
