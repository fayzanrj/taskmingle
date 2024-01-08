import TaskForm from "@/components/tasks/addtask/TaskForm";
import { Metadata, NextPage } from "next";

export const metadata: Metadata = {
  title: "Add task",
};

const AddTask: NextPage = () => {
  return <TaskForm variant="ADD" />;
};

export default AddTask;
