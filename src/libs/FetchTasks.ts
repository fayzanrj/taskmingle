import { TaskProps } from "@/props/TaskProps";
import axios, { AxiosError, AxiosResponse } from "axios";

export const fetchTasks = async (
  date: Date,
  accessToken: string
): Promise<TaskProps[] | undefined> => {
  const encodedDate = encodeURIComponent(new Date(date).toDateString());

  try {
    const res: AxiosResponse<{ tasks: TaskProps[] }> = await axios.get(
      `/api/tasks/getAllTasks/${encodedDate}`,
      {
        headers: {
          "Content-Type": "application/json",
          accessToken: accessToken,
        },
      }
    );

    if (res.data) {
      return res.data.tasks;
    }
  } catch (error: any) {
    console.log(error);
  }
};
