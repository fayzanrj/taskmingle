import { getCurrentStatus } from "@/libs/GetCurrentStatus";
import { TaskProps } from "@/props/TaskProps";
import Link from "next/link";
import React from "react";

// Task Item Props
const TaskItem: React.FC<TaskProps> = ({
  taskTitle,
  taskDesc,
  startTime,
  tags,
  id,
  status,
  date,
}) => {
  // Finding current status of the task
  const currentStatus = getCurrentStatus(date, status);
  return (
    <article>
      <Link href={`/dashboard/tasks/taskdetail/${id}`}>
        <div className="w-64 h-64 sm:w-52 sm:h-52 p-3 rounded-3xl shadow-lg text-white  relative cursor-pointer select-none bg-[#1D1F21]">
          {/* Task title */}
          <h2 className="text-2xl font-semibold whitespace-nowrap">
            {taskTitle.slice(0, 12) + (taskTitle.length > 12 ? "...." : "")}
          </h2>

          {/* Task Description */}
          <p className="text-sm mt-2 mb-1 text-ellipsis break-words">
            {taskDesc.slice(0, 130) + (taskDesc.length > 30 ? "....." : ".")}
          </p>

          <div className="w-[85%] flex justify-between items-center absolute bottom-2 left-1/2 transform -translate-x-1/2">
            {/* Task Status */}
            <p>{currentStatus}</p>

            {/* Task Start Time */}
            <p className="text-right">
              {new Date(`${date} ${startTime}`).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default TaskItem;
