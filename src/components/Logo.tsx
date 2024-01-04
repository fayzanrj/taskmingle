import logo from "@/assets/logo/taskNotifyLogo.png";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import React from "react";

// Logo interface
interface LogoProps {
  width: number;
  height: number;
}

const montserrat = Montserrat({ subsets: ["latin"] });

const Logo: React.FC<LogoProps> = ({ width, height }) => {
  return (
    <div
      className={`text-center text-2xl font-extrabold tracking-tighter dark:text-white ${montserrat.className}`}
    >
      <p>
        task<span className="logo">notify</span>
      </p>
    </div>
  );
};

export default Logo;

// return <Image className="mx-auto"  src={logo} width={width} height={height} quality={100} alt="logo" />;
