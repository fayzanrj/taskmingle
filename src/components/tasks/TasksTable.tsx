import { TaskProps } from "@/props/TaskProps";
import React from "react";
import NoTasksFound from "./NoTasksFound";
import TasksFetchError from "./TasksFetchError";

// Task Table interface
interface TaskTableProps {
  tasks: TaskProps[] | undefined;
}

const TasksTable: React.FC<TaskTableProps> = ({ tasks }) => {
  // If there is an error fetching tasks
  if (tasks === undefined || tasks === null) {
    return <TasksFetchError />;
  }

  // If there are no tasks
  if (tasks.length === 0) {
    return <NoTasksFound />;
  }

  return (
    <table className="min-w-full bg-white border border-gray-300 text-center">
      {/* Headers for table */}
      <thead>
        <tr>
          {/* Date */}
          <th className="w-1/4 py-2 px-4 border-b text-xl font-bold">Date</th>
          {/* Tilte */}
          <th className="w-2/4 py-2 px-4 border-b text-xl font-bold">
            Task Title
          </th>
          {/* Status */}
          <th className="w-1/4 py-2 px-4 border-b text-xl font-bold">Status</th>
        </tr>
      </thead>

      {/* Table data  */}
      <tbody>
        {tasks.map((task: TaskProps, index: number) => (
          <tr className="hover:bg-gray-50" key={index}>
            {/* Task date */}
            <td className="w-1/4 py-2 px-4 border-b font-semibold">
              {task.date}
            </td>
            {/* Task Title */}
            <td className="w-2/4 py-2 px-4 border-b font-semibold">
              {task.taskTitle}
            </td>
            {/* Task Status */}
            <td className="w-1/4 py-2 px-4 border-b font-semibold">
              {task.status}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TasksTable;
