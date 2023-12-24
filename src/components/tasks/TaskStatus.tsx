// Import dependencies and components
"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdClose, MdDone } from "react-icons/md";
import ActivityLoader from "../ActivityLoader";

// Define possible status values
type TaskStatus = "Pending" | "Completed" | "Overdue" | null;

// Define properties for MarkButton component
interface MarkButtonProps {
  taskId: string;
  date: string;
  accessToken: string;
}

// Function to determine status based on date and taskStatus
const getUpdatedStatus = (date: string, taskStatus: TaskStatus): TaskStatus => {
  if (taskStatus !== "Completed") return "Completed";
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  return currentDate <= new Date(date) ? "Pending" : "Overdue";
};

// TaskStatus component
const TaskStatus: React.FC<MarkButtonProps> = ({
  taskId,
  date,
  accessToken,
}) => {
  // State variables for taskStatus and loading
  const [taskStatus, setTaskStatus] = useState<TaskStatus | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Headers for API request
  const headers = {
    "Content-Type": "application/json",
    accessToken,
  };

  // Fetch task status on component mount
  useEffect(() => {
    const fetchTaskStatus = async () => {
      try {
        const res = await axios.get(`/api/tasks/getTaskStatus/${taskId}`, {
          headers,
        });
        if (res && res.data) {
          setTaskStatus(res.data.status);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchTaskStatus();
  }, [taskId, headers]);

  // Handle click event for marking the task
  const handleClick = async () => {
    try {
      const updatedStatus = getUpdatedStatus(date, taskStatus);
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

  // Function to get color based on taskStatus
  const getColor = (status: TaskStatus): string => {
    switch (status) {
      case "Completed":
        return "#32CD32"; // Lime Green
      case "Pending":
        return "#FFA500"; // Orange
      default:
        return "#FF6347"; // Tomato Red
    }
  };

  // Get color based on taskStatus
  const color = getColor(taskStatus);

  if (taskStatus === null) {
    return <Skeleton />;
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between">
      {/* Display current task status */}
      <p style={{ color, fontWeight: 700 }} className="text-lg">
        {taskStatus}
      </p>

      {/* Button for marking the task */}
      <button
        onClick={handleClick}
        className="relative w-56 h-10 text-right"
        style={{ userSelect: "none" }}
      >
        {isLoading ? (
          // Display loading indicator during request
          <ActivityLoader />
        ) : (
          // Display mark as completed or not completed based on current status
          <p className="font-semibold">
            Mark it as{" "}
            {taskStatus === "Completed" ? (
              <span>
                Not Completed <MdClose className="inline-block" size="1.2rem" />
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
  );
};

// Export MarkAsBtn component
export default TaskStatus;

const Skeleton = () => {
  return <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>;
};
