import { signOut } from "next-auth/react";
import React from "react";
import { CiLogout } from "react-icons/ci";

// Log out button
const LogoutButton: React.FC = () => (
  <li className="relative p-3 my-1 rounded-xl dark:text-[#8D8D8D] text-black text-sm">
    <button onClick={() => signOut()}>
      <span className="aboslute">
        <CiLogout className="inline-block font-semibold" size="1.3rem" />
      </span>
      <p className="absolute inline-block ml-4 font-semibold">LOG OUT</p>
    </button>
  </li>
);

export default LogoutButton;
