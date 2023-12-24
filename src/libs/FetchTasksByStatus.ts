import { TaskProps } from "@/props/TaskProps";

type StatusType = "Completed" | "Overdue";

interface FetchTasksResponse {
  tasks: TaskProps[];
}

export const fetchTasksByStatus = async (
  status: StatusType,
  accessToken: string
): Promise<TaskProps[] | undefined> => {
  // HEADERS FOR API REQUEST
  const headers = {
    "Content-Type": "application/json",
    accessToken: accessToken,
  };

  try {
    const response = await fetch(
      `${process.env.HOST}/api/tasks/getTasksByStatus/${status}`,
      { cache: "no-cache", headers: headers }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const res: FetchTasksResponse = await response.json();
    return res.tasks;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return undefined;
  }
};
