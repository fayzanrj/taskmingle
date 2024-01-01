import { TaskProps } from "@/props/TaskProps";
import React from "react";
import FetchError from "../FetchError";
import NoItemFound from "../NoItemFound";
import TaskItem from "./TaskItem";
import TaskItemSkeleton from "./TaskItemSkeleton";

// Task List interface
interface TaskListProps {
  tasks: TaskProps[] | undefined;
  isLoading: boolean;
}

const TasksList: React.FC<TaskListProps> = ({ tasks, isLoading }) => {
  // If tasks are loading
  if (isLoading) {
    return <TaskItemSkeleton />;
  }

  // If there is error fetching tasks
  if (tasks === undefined) {
    return <FetchError />;
  }

  // If there are no tasks
  if (tasks.length === 0) {
    return (
      <div className="mt-20">
        <NoItemFound variant="Tasks" />
      </div>
    );
  }

  return (
    <div
      className={`py-10 px-10 lg:px-16 flex justify-center ${
        tasks.length >= 4 ? "sm:justify-center " : "sm:justify-start"
      } gap-5  flex-wrap`}
    >
      {tasks.map((task: TaskProps, index: number) => (
        <TaskItem key={index} {...task} />
      ))}
    </div>
  );
};

export default TasksList;
