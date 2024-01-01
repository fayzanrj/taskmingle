// Possible values for task status
// type TaskStatus = "Pending" | "Completed" | "Overdue";
type TaskStatus = string;

export const getCurrentStatus = (date: string, taskStatus: TaskStatus) => {
  if (taskStatus === "Completed") return "Completed";
  if (taskStatus === "Overdue") return "Overdue";
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  if (currentDate <= new Date(date)) {
    return "Pending";
  } else {
    return "Overdue";
  }
};
