import Message from "@/components/tasks/addtask/Message";
import TaskForm from "@/components/tasks/addtask/TaskForm";
import { Metadata, NextPage } from "next";

export const metadata: Metadata = {
  title: "Add task",
};

const AddTask: NextPage = () => {
  return (
    <div className="relative">
      <Message/>
      <TaskForm variant="ADD" />;
    </div>
  );
};

export default AddTask;
