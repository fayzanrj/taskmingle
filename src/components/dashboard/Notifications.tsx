"use client";
import { DummyNotifications } from "@/constants/NotificationsData";
import Link from "next/link";
import React, { useState } from "react";
import { FaBell } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { MdCancel, MdOutlineCancel } from "react-icons/md";

const Notifications: React.FC = () => {
  // states
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // handle click function
  const handleClick = (): void => {
    setIsModalOpen(!isModalOpen);
  };

  // notifications
  const notifications = DummyNotifications;

  const notification = {
    id: 1,
    message: "Reminder: Meeting with Client",
    time: "2023-12-18T08:30:00.000Z",
  };

  return (
    <div className="absolute top-1/2 right-3  transform -translate-y-1/2">
      <button className="cursor-pointer" onClick={handleClick}>
        <FaBell color="black" size="1.6rem" />
      </button>

      {isModalOpen && (
        <div
          style={{ zIndex: 9999 }}
          className="absolute w-[80vw] sm:w-96 h-96  bg-white rounded-lg shadow-lg drop-shadow-lg top-5 right-[98%]"
        >
          {/* heading */}
          <div className="px-3 mt-3 h-10 border-b-[.1px] border-gray-400 relative">
            <h3 className="text-2xl font-extrabold">Notifications</h3>
            <button className="absolute top-[35%] transform -translate-y-1/2 right-3" onClick={handleClick}>
              <IoMdClose className="" size="1.5rem" />
            </button>
          </div>
          {/* notifications */}
          <div className="h-[20.5rem] px-2 overflow-x-auto SCROLL_BAR scroll-smooth">
            {notifications.map((notification, index) => (
              <NotificationItem
                key={index}
                {...notification}
                handleClick={handleClick}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;

interface NotificationItemProps {
  id: string | number;
  type: string;
  message: string;
  time: string;
  handleClick: () => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  id,
  message,
  type,
  time,
  handleClick,
}) => {
  const notiTime = new Date(time).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <Link href={`/dashboard/tasks/taskdetail/${id}`} onClick={handleClick}>
      <div className="px-3 py-2 min-h-[6.5rem] my-2 rounded-lg SHADOW_DIV relative">
        <div className="py-[.1rem] px-2 bg-[#19fa9a] w-fit rounded-full">
          <p className="text-xs font-extrabold">{type}</p>
        </div>
        <p className="text-lg mt-2">{message}</p>
        <p className="text-right text-xs absolute right-3 bottom-1">
          {notiTime}
        </p>
      </div>
    </Link>
  );
};
