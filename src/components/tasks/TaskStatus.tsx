"use client";
import { getErrorMessage } from "@/libs/GetErrorMessage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdClose, MdDone } from "react-icons/md";
import ActivityLoader from "../ActivityLoader";

// Possible task status values
type TaskStatus = "Pending" | "Completed" | "Overdue" | null;

// Mark Button props
interface MarkButtonProps {
  taskId: string;
  date: string;
  accessToken: string;
}

// Function to determine updated status based on date and taskStatus
const getUpdatedStatus = (date: string, taskStatus: TaskStatus): TaskStatus => {
  if (taskStatus !== "Completed") return "Completed";
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  return currentDate <= new Date(date) ? "Pending" : "Overdue";
};

// Function to get color based on taskStatus
const getColor = (status: TaskStatus): string => {
  switch (status) {
    case "Completed":
      return "#32CD32";
    case "Pending":
      return "#FFA500";
    default:
      return "#FF6347";
  }
};

const TaskStatus: React.FC<MarkButtonProps> = ({
  taskId,
  date,
  accessToken,
}) => {
  // State variables
  const [taskStatus, setTaskStatus] = useState<TaskStatus | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Headers for API request
  const headers = {
    "Content-Type": "application/json",
    accessToken,
  };

  // Fetching task's latest status
  useEffect(() => {
    // Function
    const fetchTaskStatus = async () => {
      try {
        const res = await axios.get(`/api/tasks/getTaskStatus/${taskId}`, {
          headers,
        });
        setTaskStatus(res.data.status);
      } catch (error) {
        console.error(error);
        const errorMessage = getErrorMessage(error);
        toast.error(errorMessage);
      }
    };

    // Fetching
    fetchTaskStatus();
  }, [taskId, headers]);

  // Function to handle click i.e. updating status
  const handleClick = async () => {
    try {
      const updatedStatus = getUpdatedStatus(date, taskStatus);
      setIsLoading(true);
      const data = { taskId, updatedStatus };
      const res = await axios.put("/api/tasks/markTask", data, { headers });

      setTaskStatus(updatedStatus);
      toast.success(res.data.message);
    } catch (error) {
      console.error(error);
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Get color based on taskStatus
  const color = getColor(taskStatus);

  // If tasks status is getting fetched
  if (taskStatus === null) {
    return <Skeleton />;
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between">
      {/* Current task status */}
      <p style={{ color, fontWeight: 700 }} className="text-lg">
        {taskStatus}
      </p>

      {/* Button for updating the task's status */}
      <button
        onClick={handleClick}
        className="relative w-56 h-10 text-right"
        style={{ userSelect: "none" }}
      >
        {isLoading ? (
          <ActivityLoader />
        ) : (
          // Displaying button text based on task's current status
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

// Skeleton
const Skeleton = () => {
  return <div className="h-20 sm:h-10 bg-gray-200 rounded-lg animate-pulse"></div>;
};
