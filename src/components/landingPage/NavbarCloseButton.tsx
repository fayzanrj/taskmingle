import React from "react";

const NavbarCloseButton = ({ toggleNavbar }: { toggleNavbar: () => void }) => {
  return (
    <button
      className="text-black dark:text-white md:hidden absolute top-10 right-5"
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
  );
};

export default NavbarCloseButton;
