import { TaskProps } from "@/props/TaskProps";
import axios, { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { getErrorMessage } from "./GetErrorMessage";

export const fetchTasks = async (
  date: Date,
  accessToken: string
): Promise<TaskProps[] | undefined> => {
  // Encooding given date
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
    return res.data.tasks;
  } catch (error: any) {
    console.log(error);
    const errorMessage = getErrorMessage(error);
    toast.error(errorMessage);
  }
};
