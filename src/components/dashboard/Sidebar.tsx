"use client";
import { ROUTES } from "@/constants/NavRoutes";
import useDeviceWidth from "@/hooks/useDeviceWidth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { FC, useContext, useState } from "react";
import { IconType } from "react-icons";
import { BsListTask } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
import { GrTask } from "react-icons/gr";
import { IoIosArrowDropleft } from "react-icons/io";
import { MdSpaceDashboard } from "react-icons/md";
import { SlMenu } from "react-icons/sl";
import Logo from "../Logo";
import { AppContext } from "@/context/AppContext";

// TO DO : WORK ON HREFS

// Navigation Links interface
interface NavLink {
  text: string;
  href: string;
  size: number;
  Icon: IconType;
}

// Navigaion Item interface that also contains Navigation Link interface
interface NavItem extends NavLink {
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

// Top navbar links data
const TopNavLinks: NavLink[] = [
  {
    text: "Dashboard",
    href: ROUTES.DASHBOARD,
    Icon: MdSpaceDashboard,
    size: 1.2,
  },
  { text: "My Tasks", href: ROUTES.TASKS, Icon: SlMenu, size: 1 },
  {
    text: "Completed Tasks",
    href: ROUTES.COMPLETED_TASKS,
    Icon: GrTask,
    size: 1.1,
  },
  {
    text: "Overdue Tasks",
    href: ROUTES.OVERDUE_TASKS,
    Icon: BsListTask,
    size: 1.3,
  },
  {
    text: "Watch later",
    href: ROUTES.WATCH_LATER,
    Icon: FaBookmark,
    size: 1.3,
  },
];

const Sidebar: React.FC = () => {
  const {isOpen, setIsOpen} = useContext(AppContext)

  // Function to show and hide sidebar
  const toggleSidebar = (): void => setIsOpen(!isOpen);

  return (
    <aside>
      {/* EMPTY DIV TO COVER THE SPACE BEHIND THE SIDE NAV BECAUSE OF USING POSTION FIXED */}
      {isOpen && <div className="hidden md:block md:min-w-[16rem] "></div>}
      <nav
        className={`min-w-[60%] md:min-w-[16rem] h-full py-2 bg-[#1f1f1f] border-r-2 border-[#262626] duration-500 z-50 fixed ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Opening and closing button for sidebar */}
        <button
          aria-label="Nav-toggle-button"
          className={`absolute top-4 text-[#8D8D8D] ${
            isOpen ? "-right-4" : "-right-9 rotate-180 fixed"
          } duration-500 bg-[#1f1f1f] rounded-full`}
          onClick={toggleSidebar}
        >
          <IoIosArrowDropleft size="2rem" />
        </button>

        {/* LOGO */}
        <div className="my-3">
          <Logo width={150} height={100} />
        </div>

        {/* Top navigation bar */}
        <ul className="my-10 p-3">
          {TopNavLinks.map((item, index) => (
            <NavItem key={index} {...item} setState={setIsOpen} />
          ))}
        </ul>

        {/* Bottom navigation bar */}
        <ul className="w-full p-3 absolute bottom-0">
          <NavItem
            text="Profile"
            href={ROUTES.PROFILE}
            size={1.4}
            Icon={CgProfile}
            setState={setIsOpen}
          />
          <LogoutButton />
        </ul>
      </nav>
    </aside>
  );
};

// Log out button
const LogoutButton: React.FC = () => (
  <li className="relative p-3 my-1 rounded-xl text-[#8D8D8D] text-sm">
    <button onClick={() => signOut()}>
      <span className="aboslute">
        <CiLogout className="inline-block font-semibold" size="1.3rem" />
      </span>
      <p className="absolute inline-block ml-4 font-semibold">LOG OUT</p>
    </button>
  </li>
);

// Navigation item
const NavItem: FC<NavItem> = ({ text, href, Icon, size, setState }) => {
  const pathname = usePathname();
  const path = pathname.split("/");

  // Checking the current path
  const isActive =
    path[2] === href || (path.length === 2 && href === ROUTES.DASHBOARD);

  // Closing sidebar on click in mobile devices
  const screenWidth = useDeviceWidth();
  const handleClick = () => {
    if (screenWidth <= 768) {
      setState(false);
    }
  };
  return (
    <li
      className={`p-3 my-1 rounded-xl text-sm ${
        isActive ? "bg-[#19fa9a] text-black" : "text-[#8D8D8D]"
      }`}
      onClick={handleClick}
    >
      <Link
        href={href === "dashboard" ? "/dashboard" : `/dashboard/${href}`}
        className="flex gap-5 items-center"
      >
        {/* Icon */}
        <span>
          <Icon className="" size={`${size}rem`} />
        </span>

        {/* Text */}
        <p className="font-bold w-full">{text}</p>
      </Link>
    </li>
  );
};

export default Sidebar;
