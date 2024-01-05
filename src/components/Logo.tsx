import { Montserrat } from "next/font/google";
import React from "react";

const montserrat = Montserrat({ subsets: ["latin"] });

const Logo: React.FC = () => {
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