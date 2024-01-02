"use client";
import { getErrorMessage } from "@/libs/GetErrorMessage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FetchError from "../FetchError";
import TaskStatsSkeleton from "../skeletons/TaskStatsSkeleton";
import TaskStatItem from "./TaskStatItem";

interface TaskStatsArrayProps {
  todaysTasks: {
    total: number;
    completed: number;
  };
  weeklyTasks: {
    total: number;
    completed: number;
  };
}

const TaskStats: React.FC<{accessToken : string}> = ({accessToken}) => {

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [taskStats, setTaskStats] = useState<TaskStatsArrayProps | undefined>({
    todaysTasks: {
      total: 0,
      completed: 0,
    },
    weeklyTasks: {
      total: 0,
      completed: 0,
    },
  });

  // Headers for API request
  const headers = {
    "Content-Type": "application/json",
    // @ts-ignore
    accessToken,
  };

  useEffect(() => {
    const fetchTaskStats = async () => {
      const encodedDate = encodeURIComponent(new Date().toDateString());
      try {
        setIsLoading(true);
        const res = await axios.get(
          `/api/tasks/getUserTaskStats/${encodedDate}`,
          { headers }
        );
        setTaskStats(res.data.taskStats);
      } catch (error: any) {
        setTaskStats(undefined)
        console.error(error);
        const message = getErrorMessage(error);
        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    };

    // Calling function
    fetchTaskStats()
  }, [accessToken]);

  
  if (!taskStats) {
    return <FetchError />;
  }

  return (
    <section className="flex justify-center gap-3  md:gap-10 lg:gap:20 flex-wrap">
      {isLoading ? (
        <TaskStatsSkeleton />
      ) : (
        <>
          <TaskStatItem
            header="Today's Tasks"
            totalTasks={taskStats?.todaysTasks?.total}
            completedTasks={taskStats?.todaysTasks?.completed}
          />
          <TaskStatItem
            header="Weeekly Tasks"
            totalTasks={taskStats.weeklyTasks.total}
            completedTasks={taskStats.weeklyTasks.completed}
          />
        </>
      )}
    </section>
  );
};

export default TaskStats;
