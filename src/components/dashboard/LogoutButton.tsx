import { signOut } from "next-auth/react";
import React from "react";
import { CiLogout } from "react-icons/ci";

// Log out button
const LogoutButton: React.FC = () => (
  <li className="h-[2.9rem] relative p-3 my-1 rounded-xl text-sm  dark:text-[#8D8D8D] text-black ">
    <button
      onClick={() => signOut()}
      className="w-full h-full text-left overflow-hidden"
    >
      {/* Icon */}
      <span>
        <CiLogout className="inline-block font-semibold" size="1.3rem" />
      </span>

      {/* Text */}
      <p className="font-bold w-full absolute left-12 top-1/2 transform -translate-y-1/2">
        Log out
      </p>
    </button>
  </li>
);

export default LogoutButton;
