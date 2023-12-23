"use client";
import DatePicker from "@/components/DatePicker";
import { fetchTasks } from "@/libs/FetchTasks";
import { getInitialDate } from "@/libs/GetInitialDate";
import { TaskProps } from "@/props/TaskProps";
import { useEffect, useState } from "react";
import TasksList from "./TasksList";

const TaskPanel: React.FC<{accessToken : string}> = ({accessToken}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tasks, setTasks] = useState<TaskProps[] | undefined>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentTasks: TaskProps[] | undefined = await fetchTasks(
          new Date(),
          accessToken
        );
        setTasks(currentTasks);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Add dependencies to useEffect if needed

  const intialDate = getInitialDate();
  return (
    <div className="w-full relative">
      <DatePicker
        initialDate={intialDate}
        isLoading={isLoading}
        numDatesToShow={15}
        setTasks={setTasks}
        setIsLoading={setIsLoading}
      />
      <TasksList tasks={tasks} isLoading={isLoading} />
    </div>
  );
};

export default TaskPanel;
