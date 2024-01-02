"use client";
import { DummyNotifications } from "@/constants/NotificationsData";
import Link from "next/link";
import React, { useState } from "react";
import { FaBell } from "react-icons/fa";
import CloseBtn from "../CloseBtn";

const Notifications: React.FC = () => {
  // Variable state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Handle click function
  const handleClick = (): void => {
    setIsModalOpen(!isModalOpen);
  };

  // Notifications
  const notifications = DummyNotifications;

  return (
    <div className="absolute top-1/2 right-3 text-white  transform -translate-y-1/2">
      {/* Bell Icon */}
      <button className="cursor-pointer" onClick={handleClick} aria-label="notification-btn">
        <FaBell size="1.6rem" />
      </button>

      {/* Notification Modal */}
      {isModalOpen && (
        <div
          style={{ zIndex: 9999 }}
          className="absolute w-[80vw] sm:w-96 h-96  bg-[#1F1F1F] rounded-lg shadow-lg drop-shadow-lg top-5 right-[98%]"
        >
          {/* Heading */}
          <div className="px-3 mt-3 h-10 border-b-[.1px] border-gray-400 relative">
            <h3 className="text-2xl font-extrabold">Notifications</h3>
            <CloseBtn setState={setIsModalOpen} />
          </div>

          {/* Notifications */}
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

// Notification Item interface
interface NotificationItemProps {
  id: string | number;
  type: string;
  message: string;
  time: string;
  handleClick: () => void;
}

// Notification Item Component
const NotificationItem: React.FC<NotificationItemProps> = ({
  id,
  message,
  type,
  time,
  handleClick,
}) => {
  const notificationTime = new Date(time).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    // Clicking on notification will take you to that task
    <Link href={`/dashboard/tasks/taskdetail/${id}`} onClick={handleClick}>
      <div className="px-3 py-2 min-h-[6.5rem] my-2 rounded-lg SHADOW_DIV relative">
        {/* Notification type */}
        <div className="py-[.1rem] px-2 bg-[#19fa9a] w-fit rounded-full">
          <p className="text-xs font-extrabold">{type}</p>
        </div>

        {/* Notification message */}
        <p className="text-lg mt-2">{message}</p>

        {/* Notification time */}
        <p className="text-right text-xs absolute right-3 bottom-1">
          {notificationTime}
        </p>
      </div>
    </Link>
  );
};
