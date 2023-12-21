"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { FC, useState } from "react";
import { IconType } from "react-icons";
import { AiOutlineHome } from "react-icons/ai";
import { BsListTask } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";
import { GrTask } from "react-icons/gr";
import { SlMenu } from "react-icons/sl";
import { IoIosArrowDropleft } from "react-icons/io";
import Logo from "../Logo";
import { signOut } from "next-auth/react";
import { ROUTES } from "@/constants/NavRoutes";

// TO DO : WORK ON HREFS

interface NavLink {
  text: string;
  href: string;
  size: number;
  Icon: IconType;
}

// TOP NAV BAR LINKS, LABELS AND ICONS
const TopNavLinks: NavLink[] = [
  { text: "Home", href: ROUTES.DASHBOARD, Icon: AiOutlineHome, size: 1.4 },
  { text: "My Tasks", href: ROUTES.TASKS, Icon: SlMenu, size: 1.2 },
  {
    text: "Completed Tasks",
    href: ROUTES.COMPLETED_TASKS,
    Icon: GrTask,
    size: 1.3,
  },
  {
    text: "Overdue Tasks",
    href: ROUTES.OVERDUE_TASKS,
    Icon: BsListTask,
    size: 1.5,
  },
];

// sidebar props
interface SidebarProps {}

const Sidebar: FC<SidebarProps> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  // function to show and hide sidebar
  const toggleSidebar = (): void => setIsOpen(!isOpen);

  return (
    <aside>
      {/* EMPTY DIV TO COVER THE SPACE BEHIND THE SIDE NAV BECAUSE OF USING POSTION FIXED */}
      {isOpen && <div className="hidden md:block md:min-w-[16rem] "></div>}
      <nav
        className={`min-w-[60%] md:min-w-[16rem] h-full py-2 bg-white border-r-2 border-r-gray-300 duration-500 z-50 fixed ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* CLOSING BTN */}
        <button
          aria-label="Nav-toggle-button"
          className={`absolute top-4 ${
            isOpen ? "-right-4" : "-right-9 rotate-180 fixed"
          } duration-500 bg-white rounded-full`}
          onClick={toggleSidebar}
        >
          <IoIosArrowDropleft size="2rem" />
        </button>

        {/* LOGO */}
        <div className="ml-4 my-1">
          <Logo width={100} height={100} />
        </div>

        {/* TOP NAVIGATION LINKS */}
        <ul className="my-10 p-3">
          {TopNavLinks.map((item, index) => (
            <NavItem key={index} {...item} />
          ))}
        </ul>

        {/* BOTTOM NAVIGATION LINKS */}
        <ul className="w-full p-3 absolute bottom-0">
          <NavItem text="Profile" href="/" size={1.4} Icon={CgProfile} />
          <LogoutButton />
        </ul>
      </nav>
    </aside>
  );
};

// logo out button
const LogoutButton: FC = () => (
  <li className="relative p-3 my-1 rounded-xl">
    <button onClick={() => signOut()}>
      <span className="aboslute">
        <CiLogout className="inline-block" size="1.3rem" />
      </span>
      <p className="absolute inline-block ml-4 font-semibold">LOG OUT</p>
    </button>
  </li>
);

// nav item
const NavItem: FC<NavLink> = ({ text, href, Icon, size }) => {
  const pathname = usePathname();
  const path = pathname.split("/");

  // checking the current path
  const isActive =
    path[2] === href || (path.length === 2 && href === ROUTES.DASHBOARD);

  return (
    <li
      className={`relative  p-3 my-1 rounded-xl ${
        isActive ? "bg-[#19fa9a]" : ""
      }`}
    >
      <Link href={href === "dashboard" ? "/dashboard" : `/dashboard/${href}`}>
        <span className="aboslute">
          <Icon className="inline-block" size={`${size}rem`} />
        </span>
        <p className="absolute inline-block ml-4 font-semibold">{text}</p>
      </Link>
    </li>
  );
};

export default Sidebar;
