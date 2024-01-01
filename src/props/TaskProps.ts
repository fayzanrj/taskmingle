export interface TaskProps {
  id?: string;
  taskTitle: string;
  taskDesc: string;
  tags: string[];
  date: string;
  startTime: string;
  reminderAt: string;
  // status: "Pending" | "Completed" | "Overdue";
  status : string
  link?: string;
}
