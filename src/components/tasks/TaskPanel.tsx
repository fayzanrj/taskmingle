"use client";
import DatePicker from "@/components/DatePicker";
import { fetchTasks } from "@/libs/FetchTasks";
import { getErrorMessage } from "@/libs/GetErrorMessage";
import { getInitialDate } from "@/libs/GetInitialDate";
import { TaskProps } from "@/props/TaskProps";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import TasksList from "./TasksList";

const TaskPanel: React.FC<{ accessToken: string }> = ({ accessToken }) => {
  // Variable states
  const [tasks, setTasks] = useState<TaskProps[] | undefined>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetching current date tasks
  useEffect(() => {
    // Function
    const fetchData = async () => {
      try {
        const currentTasks: TaskProps[] | undefined = await fetchTasks(
          new Date(),
          accessToken
        );
        setTasks(currentTasks);
      } catch (error) {
        console.error(error);
        const errorMessage = getErrorMessage(error);
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    // Fetching
    fetchData();
  }, []);

  // Getting inital date for the date picker calender
  const intialDate = getInitialDate();

  return (
    <div className="w-full relative">
      {/* Date picker calender */}
      <DatePicker
        initialDate={intialDate}
        isLoading={isLoading}
        numDatesToShow={15}
        setTasks={setTasks}
        setIsLoading={setIsLoading}
      />
      {/* Tasks list */}
      <TasksList tasks={tasks} isLoading={isLoading} />
    </div>
  );
};

export default TaskPanel;
