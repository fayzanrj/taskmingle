import TaskForm from "@/components/addtask/TaskForm";
import { Metadata, NextPage } from "next";

export const metadata: Metadata = {
  title: "Add task - Task Notify",
};

const AddTask: NextPage = () => {
  return <TaskForm variant="ADD" />;
};

export default AddTask;
