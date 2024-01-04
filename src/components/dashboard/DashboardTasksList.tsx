"use client";
import { AppContext } from "@/context/AppContext";
import { fetchTasks } from "@/libs/FetchTasks";
import { getErrorMessage } from "@/libs/GetErrorMessage";
import { TaskProps } from "@/props/TaskProps";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import FetchError from "../FetchError";
import NoItemFound from "../NoItemFound";
import DashboardTasksListSkeleton from "../skeletons/DashboardTasksListSkeleton";
import RenderTags from "../tasks/RenderTags";
import ScrollButton from "./ScrollButton";

const DashboardTasksList: React.FC<{
  accessToken: string;
}> = ({ accessToken }) => {
  // Context
  const { isOpen } = useContext(AppContext);

  // Variable states
  const [initialTasks, setInitialTasks] = useState<TaskProps[] | undefined>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Use effect to get initial tasks
  useEffect(() => {
    // Function
    const fetchTodaysTasks = async () => {
      const date = new Date();
      try {
        const currentTasks: TaskProps[] | undefined = await fetchTasks(
          date,
          accessToken
        );
        setInitialTasks(currentTasks);
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    // Calling Function
    fetchTodaysTasks();
  }, [accessToken]);

  // Function to scroll
  const handleScroll = (direction: "left" | "right") => {
    const container = document.getElementById("tasksContainer");

    if (container && scrollPosition >= 0) {
      const scrollAmount = 252;

      const newPosition =
        direction === "left"
          ? scrollPosition - scrollAmount
          : scrollPosition + scrollAmount;
      if (scrollPosition >= 0 && newPosition < container.scrollWidth) {
        container.scrollTo({
          left: newPosition,
          behavior: "smooth",
        });

        setScrollPosition(newPosition);
      } else {
        setScrollPosition(0);
      }
    }
  };

  // If there is an error fetching tasks
  if (initialTasks === undefined) {
    return <FetchError />;
  }

  return (
    <div>
      {/* Heading */}
      <h3 className="my-5 text-2xl font-semibold text-white">
        Your today&#39;s tasks
      </h3>

      <div
        className={`w-full h-full relative text-center flex justify-between gap-[0.585rem] ${
          isOpen ? "md:w-[calc(100vw_-20rem)]" : "md:w-full"
        } `}
      >
        {/* LEFT BUTTON */}
        <ScrollButton
          direction="left"
          onClick={() => handleScroll("left")}
          disabled={initialTasks === undefined || initialTasks.length <= 0}
        />

        {/* LIST */}
        <TasksContainer isLoading={isLoading} initialTasks={initialTasks} />

        {/* Right scroll button */}
        <ScrollButton
          direction="right"
          onClick={() => handleScroll("right")}
          disabled={initialTasks === undefined || initialTasks.length <= 0}
        />
      </div>
    </div>
  );
};

export default DashboardTasksList;

// Task List item Component
const DashboardTasksListItem: React.FC<TaskProps> = ({
  taskTitle,
  tags,
  taskDesc,
}) => {
  return (
    <div className="min-w-[15rem] max-w-[15rem] h-44 overflow-hidden dark:bg-[#1D1F21] rounded-lg dark:border-0 border-[0.1rem] border-stone-200 p-3">
      {/* Tags */}
      <div className="text-right mb-4 overflow-hidden py-1">
        <RenderTags tags={tags.slice(0, 2) || []} />
      </div>

      {/* Task title */}
      <h2 className="w-full text-ellipsis overflow-hidden text-2xl font-semibold whitespace-nowrap text-center">
        {taskTitle}
      </h2>

      {/* Task Description */}
      <p className="text-sm text-left mt-2 mb-1 px-5 py-2 text-ellipsis break-words">
        {taskDesc.slice(0, 50) + (taskDesc.length > 50 ? "....." : ".")}
      </p>
    </div>
  );
};

// Task Container Component
const TasksContainer: React.FC<{
  isLoading: boolean;
  initialTasks: TaskProps[];
}> = ({ isLoading, initialTasks }) => (
  <div
    id="tasksContainer"
    className="md:w-[91%] mx-auto overflow-x-auto flex gap-3 scroll-smooth NO_SCROLLBAR"
  >
    {isLoading ? (
      <DashboardTasksListSkeleton />
    ) : initialTasks.length > 0 ? (
      initialTasks.map((task: TaskProps, index: number) => (
        <DashboardTasksListItem key={index} {...task} />
      ))
    ) : (
      <NoItemFound variant="Tasks" />
    )}
  </div>
);
