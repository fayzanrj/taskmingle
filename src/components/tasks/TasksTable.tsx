// TaskTable.tsx
import React from "react";
import { TaskProps } from "@/props/TaskProps";
import TasksFetchError from "./TasksFetchError";
import NoTasksFound from "./NoTasksFound";

interface TaskTableProps {
  tasks: TaskProps[] | undefined;
}

const TasksTable: React.FC<TaskTableProps> = ({ tasks }) => {

  if (tasks === undefined) {
    return <TasksFetchError />;
  }
  
  if (tasks.length === 0) {
    return (
      <NoTasksFound/>
    );
  }

  return (
    <table className="min-w-full bg-white border border-gray-300 text-center">
      <thead>
        <tr>
          <th className="w-1/4 py-2 px-4 border-b text-xl font-bold">Date</th>
          <th className="w-2/4 py-2 px-4 border-b text-xl font-bold">
            Task Title
          </th>
          <th className="w-1/4 py-2 px-4 border-b text-xl font-bold">Status</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task: TaskProps, index: number) => (
          <tr className="hover:bg-gray-50" key={index}>
            <td className="w-1/4 py-2 px-4 border-b font-semibold">
              {task.date}
            </td>
            <td className="w-2/4 py-2 px-4 border-b font-semibold">
              {task.taskTitle}
            </td>
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
