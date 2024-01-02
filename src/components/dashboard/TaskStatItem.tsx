import { Inter, Roboto } from "next/font/google";
import React from "react";

const roboto = Roboto({ subsets: ["latin"], weight: "500" });

// Task Counter interface
interface TasksCounterProps {
  header: string;
  totalTasks: number;
  completedTasks: number;
}

// function to get color
const getColor = (header: string): string => {
  if (header === "Today's Tasks") {
    return "#19fa9a";
  } else{
    return "#22C1C3";
  } 
};
const TaskStatItem: React.FC<TasksCounterProps> = ({
  header,
  totalTasks,
  completedTasks,
}) => {
  // Calculating percentage of completed tasks
  const completedPercentage = (completedTasks / totalTasks) * 100;

  return (
    <div className=" w-72 h-28 bg-[#1F1F1F] text-white shadow-xl drop-shadow-xl  py-3 px-4 rounded-lg relative">
      {/* Header */}
      <h3 className="text-xl font-semibold ">{header}</h3>

      <div
        className={`${roboto.className} w-[90%] absolute bottom-2 left-1/2 transform -translate-x-1/2`}
      >
        {/* No of completed and total tasks */}
        <div className="relative">
          <p className="text-sm">
            {completedTasks}/{totalTasks}
          </p>
          <p className="text-sm text-gray-400 absolute right-0 top-0">
            {completedPercentage.toFixed(2)}%
          </p>
        </div>

        {/* Task completion percentage */}
        <div className="w-full h-1.5 bg-[#323232] rounded-full mt-2 shadow-sm drop-shadow-sm">
          <div
            style={{
              width: `${completedPercentage}%`,
              backgroundColor: getColor(header),
            }}
            className={`h-full rounded-full`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default TaskStatItem;
