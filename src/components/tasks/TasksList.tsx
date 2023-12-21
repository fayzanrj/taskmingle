import React from "react";
import TaskItem from "./TaskItem";
import TaskItemSkeleton from "./TaskItemSkeleton";
import { TaskProps } from "@/props/TaskProps";

interface TaskListProps {
  tasks: TaskProps[];
  isLoading: boolean;
}

const TasksList: React.FC<TaskListProps> = ({ tasks, isLoading }) => {
  // if tasks are loading
  if (isLoading) {
    return <TaskItemSkeleton />;
  }

  // if there are no tasks
  if (tasks.length === 0) {
    return (
      <div className="w-fit mt-20 mx-auto px-3 text-center">
        <h3
          style={{ wordSpacing: ".2rem" }}
          className="text-3xl font-extrabold uppercase tracking-widest"
        >
          No tasks for today
        </h3>
      </div>
    );
  }
  return (
    <div
      className={`py-10 px-10 lg:px-16 flex justify-center ${
        tasks.length >= 4 ? "sm:justify-center " : "sm:justify-start"
      } gap-5  lg:gap-10 flex-wrap`}
    >
      {tasks.map((task: TaskProps, index: number) => (
        <TaskItem key={index} {...task} />
      ))}
    </div>
  );
};

export default TasksList;
