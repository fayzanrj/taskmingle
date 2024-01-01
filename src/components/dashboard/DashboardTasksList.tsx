"use client";
import { AppContext } from "@/context/AppContext";
import { TaskProps } from "@/props/TaskProps";
import React, { useContext, useState } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import FetchError from "../FetchError";
import NoItemFound from "../NoItemFound";
import TaskItem from "../tasks/TaskItem";

interface DashboardTasksListProps {
  tasks: TaskProps[] | undefined;
}

const DashboardTasksList: React.FC<DashboardTasksListProps> = ({ tasks }) => {
  const { isOpen } = useContext(AppContext);
  //   const { setInitialTasks, initialTasks } = useContext(AppContext);
  const [initialTasks, setInitialTasks] = useState<TaskProps[] | undefined>(
    tasks
  );

  // State to keep track of the current scroll position
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = (direction: "left" | "right") => {
    const container = document.getElementById("tasksContainer");

    if (container) {
      const scrollAmount = 300; // You can adjust this value based on your preference
      const newPosition =
        direction === "left"
          ? scrollPosition - scrollAmount
          : scrollPosition + scrollAmount;

      container.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });

      setScrollPosition(newPosition);
    }
  };

  if (initialTasks === undefined) {
    return <FetchError />;
  }

  // If there are no tasks
  if (initialTasks?.length === 0) {
    return <NoItemFound variant="Tasks" />;
  }

  return (
    <div>
      <h3 className="my-5 text-2xl font-semibold text-white">
        Your today&#39;s tasks
      </h3>

      <div
        className={`w-full h-full ${
          isOpen ? "md:w-[calc(100vw_-20rem)]" : "md:w-full"
        }  relative text-center flex justify-between gap-3`}
      >
        {/* LEFT BUTTON */}
        <button className="w-fit h-40 rounded-lg  z-20" onClick={() => handleScroll("left")}>
          <MdArrowBackIos size={"2rem"} className="inline-block"  />
        </button>

        {/* LIST */}
        <div
          id="tasksContainer"
          className="md:w-[91%] mx-auto overflow-x-auto flex gap-3 scroll-smooth NO_SCROLLBAR"
        >
          {initialTasks?.map((task: TaskProps, index: number) => (
            <TaskItem key={index} {...task} />
          ))}
        </div>

        {/* Right scroll button */}
        <button className="w-fit h-40 rounded-lg  z-20" onClick={() => handleScroll("right")}>
          <MdArrowForwardIos size={"2rem"} className="inline-block" />
        </button>
      </div>
    </div>
  );
};

export default DashboardTasksList;
