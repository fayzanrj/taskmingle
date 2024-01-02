import logo from "@/assets/logo/taskNotifyLogo.png";
import Image from "next/image";
import React from "react";

// Logo interface
interface LogoProps {
  width: number;
  height: number;
}

const Logo: React.FC<LogoProps> = ({ width, height }) => {
  return <Image className="mx-auto"  src={logo} width={width} height={height} quality={100} alt="logo" />;
};

export default Logo;
