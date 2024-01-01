"use client";
import { AppContext } from "@/context/AppContext";
import { TaskProps } from "@/props/TaskProps";
import React, { useContext, useState } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import FetchError from "../FetchError";
import NoItemFound from "../NoItemFound";
import RenderTags from "../tasks/RenderTags";

interface DashboardTasksListProps {
  tasks: TaskProps[] | undefined;
}

// if (initialTasks?.length === 0) {
//   return (
//     <div className="my-5">
//       <h3 className="my-5 text-2xl font-semibold text-white">
//         Your today&#39;s tasks
//       </h3>{" "}
//       <NoItemFound variant="Tasks" />
//     </div>
//   );
// }

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
      const scrollAmount = 252; // You can adjust this value based on your preference
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

  return (
    <div>
      <h3 className="my-5 text-2xl font-semibold text-white">
        Your today&#39;s tasks
      </h3>

      <div
        className={`w-full h-full ${
          isOpen ? "md:w-[calc(100vw_-20rem)]" : "md:w-full"
        }  relative text-center flex justify-between gap-[0.575rem]`}
      >
        {/* LEFT BUTTON */}
        <button
          className="w-fit h-40 rounded-lg  z-20 disabled:text-stone-800"
          onClick={() => handleScroll("left")}
          disabled={tasks === undefined || tasks?.length <= 0}
        >
          <MdArrowBackIos size={"2rem"} className="inline-block" />
        </button>

        {/* LIST */}
        <div
          id="tasksContainer"
          className="md:w-[91%] mx-auto overflow-x-auto flex gap-3 scroll-smooth NO_SCROLLBAR"
        >
          {initialTasks?.length > 0 ? (
            initialTasks?.map((task: TaskProps, index: number) => (
              <DashboardTasksListItem key={index} {...task} />
            ))
          ) : (
            <NoItemFound variant="Tasks" />
          )}
        </div>

        {/* Right scroll button */}
        <button
          className="w-fit h-40 rounded-lg  z-20 disabled:text-stone-800"
          onClick={() => handleScroll("right")}
          disabled={tasks === undefined || tasks?.length <= 0}
        >
          <MdArrowForwardIos size={"2rem"} className="inline-block" />
        </button>
      </div>
    </div>
  );
};

export default DashboardTasksList;

const DashboardTasksListItem: React.FC<TaskProps> = ({
  taskTitle,
  tags,
  taskDesc,
  startTime,
  status,
}) => {
  return (
    <div className="min-w-[15rem] max-w-[15rem] h-44 rounded-lg overflow-hidden bg-[#1D1F21] p-3">
      {/* Tags */}
      <div className="text-right mb-4 overflow-hidden py-1">
        <RenderTags tags={tags.slice(0,2) || []} />
      </div>

      {/* Task title */}
      <h2 className="text-2xl font-semibold whitespace-nowrap text-center">
        {taskTitle.slice(0, 18) + (taskTitle.length > 18 ? "...." : "")}
      </h2>

      {/* Task Description */}
      <p className="text-sm text-left mt-2 mb-1 px-5 py-2 text-ellipsis break-words">
        {taskDesc.slice(0, 40) + (taskDesc.length > 40 ? "....." : ".")}
      </p>
    </div>
  );
};
