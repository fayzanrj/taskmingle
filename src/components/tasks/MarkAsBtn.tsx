// Import dependencies and components
"use client";
import React, { useState } from "react";
import { MdClose, MdDone } from "react-icons/md";
import ActivityLoader from "../ActivityLoader";
import { useSession } from "next-auth/react";
import axios from "axios";
import toast from "react-hot-toast";

// Define possible status values
type TaskStatus = "Pending" | "Completed" | "Overdue";

// Define properties for MarkButton component
interface MarkButtonProps {
  status: "Pending" | "Completed" | "Overdue";
  taskId: string;
  date: string;
}

// Function to determine status based on date and taskStatus
const getStatus = (date: string, taskStatus: TaskStatus): TaskStatus => {
  if (taskStatus !== "Completed") return "Completed";
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  return currentDate <= new Date(date) ? "Pending" : "Overdue";
};

// MarkAsBtn component
const MarkAsBtn: React.FC<MarkButtonProps> = ({ status, taskId, date }) => {
  // Get session data using useSession
  const { data: session } = useSession();

  // State variables for taskStatus and loading
  const [taskStatus, setTaskStatus] = useState(status);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Headers for API request
  const headers = {
    "Content-Type": "application/json",
    //@ts-ignore
    accessToken: session?.user?.accessToken,
  };

  // Handle click event for marking the task
  const handleClick = async () => {
    try {
      const updatedStatus = getStatus(date, taskStatus);
      setIsLoading(true);
      const data = { taskId, updatedStatus };
      const res = await axios.put("/api/tasks/markTask", data, { headers });
      if (res && res.data) {
        setTaskStatus(updatedStatus);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => setIsLoading(false), 2000);
    }
  };

  const getColor = (taskStatus: TaskStatus) => {
    if (taskStatus === "Completed") {
      return "#19fa9a";
    } else if (taskStatus === "Pending") {
      return "#FF8C00";
    } else {
      return "#f91515";
    }
  };

  const color = getColor(taskStatus);
  return (
    <>
      <div>
        {/* Display current task status */}
        <p className={`text-[${color}] font-bold`}>{taskStatus}</p>
      </div>
      <div className="text-right my-2">
        {/* Button for marking the task */}
        <button onClick={handleClick} className="relative w-56 h-10">
          {isLoading ? (
            // Display loading indicator during request
            <ActivityLoader />
          ) : (
            // Display mark as completed or not completed based on current status
            <p className="font-semibold">
              Mark it as{" "}
              {taskStatus === "Completed" ? (
                <span>
                  Not Completed{" "}
                  <MdClose className="inline-block" size="1.2rem" />
                </span>
              ) : (
                <span>
                  Completed <MdDone className="inline-block" size="1.2rem" />
                </span>
              )}
            </p>
          )}
        </button>
      </div>
    </>
  );
};

// Export MarkAsBtn component
export default MarkAsBtn;
