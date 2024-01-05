"use client";
import { ROUTES } from "@/constants/NavRoutes";
import { AppContext } from "@/context/AppContext";
import useDeviceWidth from "@/hooks/useDeviceWidth";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { FC, useContext, useEffect } from "react";
import { IconType } from "react-icons";
import { CgProfile } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
import { GrTask } from "react-icons/gr";
import { IoIosArrowDropleft } from "react-icons/io";
import { MdSpaceDashboard } from "react-icons/md";
import { PiNotepadFill } from "react-icons/pi";
import { SlMenu } from "react-icons/sl";
import Logo from "../Logo";
import ToggleTheme from "../ToggleThemeButton";
import LogoutButton from "./LogoutButton";
import ToggleThemeButton from "../ToggleThemeButton";
import { pusherClient } from "@/pusher/pusher";
import { error } from "console";

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
    text: "Watch later",
    href: ROUTES.WATCH_LATER,
    Icon: FaBookmark,
    size: 1.3,
  },
  {
    text: "Notes",
    href: ROUTES.NOTES,
    Icon: PiNotepadFill,
    size: 1.5,
  },
];

const Sidebar: React.FC = () => {
  const { data: session } = useSession();

  const { isOpen, setIsOpen } = useContext(AppContext);

  // Function to show and hide sidebar
  const toggleSidebar = (): void => setIsOpen(!isOpen);

  // useEffect(() => {
  //   //@ts-ignore
  //   const user = session?.user?.id;
  //   try {
  //     console.log({ user });
  //     const pusher = pusherClient.subscribe(user);
  //     console.log(pusher);
  //   } catch (error: any) {
  //     console.error(error);
  //   }

  //   return () => {
  //     pusherClient.unsubscribe(user);
  //   };
  // }, []);

  return (
    <aside>
      {/* EMPTY DIV TO COVER THE SPACE BEHIND THE SIDE NAV BECAUSE OF USING POSTION FIXED */}
      {isOpen && <div className="hidden md:block md:min-w-[16rem] "></div>}
      <nav
        className={`min-w-[60%] md:min-w-[16rem] h-full py-2 dark:bg-[#1f1f1f] bg-white border-r-2 dark:border-[#262626] border-gray-200 duration-500 z-50 fixed ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Opening and closing button for sidebar */}
        <button
          aria-label="Nav-toggle-button"
          className={`absolute top-4 dark:text-[#8D8D8D] text-black ${
            isOpen ? "-right-4" : "-right-9 rotate-180 fixed"
          } duration-500 dark:bg-[#1f1f1f] bg-white rounded-full`}
          onClick={toggleSidebar}
        >
          <IoIosArrowDropleft size="2rem" />
        </button>

        {/* LOGO */}
        <div className="my-3">
          <Logo />
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
          <ToggleThemeButton />
          <LogoutButton />
        </ul>
      </nav>
    </aside>
  );
};

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
      className={`relative p-3 my-1 rounded-xl text-sm  ${
        isActive ? "bg-[#19fa9a] text-black" : "dark:text-[#8D8D8D] text-black"
      }`}
      onClick={handleClick}
    >
      <Link href={href === "dashboard" ? "/dashboard" : `/dashboard/${href}`}>
        {/* Icon */}
        <span>
          <Icon className="" size={`${size}rem`} />
        </span>

        {/* Text */}
        <p className=" font-bold w-fit absolute left-12 top-1/2 transform -translate-y-1/2">
          {text}
        </p>
      </Link>
    </li>
  );
};

export default Sidebar;
