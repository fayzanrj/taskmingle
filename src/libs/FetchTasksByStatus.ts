import { TaskProps } from "@/props/TaskProps";
import { getErrorMessage } from "./GetErrorMessage";
import toast from "react-hot-toast";

// Possible values for Status
type StatusType = "Completed" | "Overdue";

// Fetch task interface
interface FetchTasksResponse {
  tasks: TaskProps[];
}

export const fetchTasksByStatus = async (
  status: StatusType,
  accessToken: string
): Promise<TaskProps[] | undefined> => {
  // Headers for API REQUEST
  const headers = {
    "Content-Type": "application/json",
    accessToken: accessToken,
  };

  try {
    //  API REQUEST
    const response = await fetch(
      `${process.env.HOST}/api/tasks/getTasksByStatus/${status}`,
      { cache: "no-cache", headers: headers }
    );
    const res: FetchTasksResponse = await response.json();
    return res.tasks;
  } catch (error) {
    console.error(error);
    const errorMessage = getErrorMessage(error);
    toast.error(errorMessage);
    return undefined;
  }
};
