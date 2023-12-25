"use client";
import { getErrorMessage } from "@/libs/GetErrorMessage";
import { getTime } from "@/libs/GetFormattedData";
import { TaskProps } from "@/props/TaskProps";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import ActivityLoader from "../ActivityLoader";
import GoBack from "../GoBack";
import AddTaskDateInput from "./AddTaskDateInput";
import AddTaskTextArea from "./AddTaskTextArea";
import AddTaskTextInput from "./AddTaskTextInput";
import AddTaskTimeInput from "./AddTaskTimeInput";

// Task Form Interface
interface TaskFormProps {
  id?: string;
  taskTitle?: string;
  taskDesc?: string;
  tags?: string[];
  date?: string;
  startTime?: string;
  reminderAt?: string;
  status?: string;
  variant: "EDIT" | "ADD";
}

const TaskForm: React.FC<TaskFormProps> = ({
  id,
  status,
  taskTitle,
  taskDesc,
  tags,
  reminderAt,
  startTime,
  date,
  variant,
}) => {
  const { data: session } = useSession();
  // State variables
  const [title, setTitle] = useState<string>(taskTitle || "");
  const [desc, setDesc] = useState<string>(taskDesc || "");

  // Date state
  const [selectedDate, setSelectedDate] = useState<string>(
    //@ts-ignore
    `${new Date(date).getFullYear()}-${
      //@ts-ignore
      new Date(date).getMonth() + 1
      //@ts-ignore
    }-${new Date(date).getDate()}` || ""
  );

  // Tags state
  const [selectedTags, setSelectedTags] = useState<string>(
    tags ? tags.join(", ") : ""
  );

  // Start time state
  const [startingTime, setStartingTime] = useState<string>(
    //@ts-ignore
    startTime ? getTime(date, startTime) : ""
  );

  // Remind time state
  const [remindAt, setRemindAt] = useState<string>(
    //@ts-ignore
    reminderAt ? getTime(date, reminderAt) : ""
  );

  // activity state
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Function to make all states an empty string
  const clearStates = () => {
    setRemindAt("");
    setTitle("");
    setDesc("");
    setStartingTime("");
    setSelectedDate("");
    setSelectedTags("");
  };

  // Handle save function
  const handleSave = async () => {
    setIsLoading(true);

    // setting new task with user selected values
    const task: TaskProps = {
      taskTitle: title,
      taskDesc: desc,
      startTime: startingTime,
      reminderAt: remindAt,
      date: new Date(selectedDate).toDateString(),
      tags: selectedTags.split(","),
      status: "Pending",
    };

    // Headers
    const headers = {
      "Content-Type": "application/json",
      //@ts-ignore
      accessToken: session?.user?.accessToken,
    };

    try {
      if (variant === "ADD") {
        // If form is to variant is to add a new task
        await axios.post("/api/tasks/addtask", task, { headers });
        toast.success("Task has been added");
        clearStates();
      } else {
        // If form is to variant is to update a task
        task.id = id;
        const res = await axios.put("/api/tasks/updateTask", task, { headers });
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // JSX structure of the component
  return (
    <div className="w-full h-full relative px-4 py-10 md:pb-2">
      {/* Go back button */}
      <GoBack />

      {/* Header */}
      <header className="text-center">
        <h1 className="text-3xl font-bold">Add a Task</h1>
      </header>
      
      <div className="mt-5 flex justify-center items-center flex-wrap md:gap-5 ">
        <section className="w-4/5 sm:w-80 px-1">
          {/* Input components for task details */}
          <AddTaskTextInput
            label="Task title"
            id="taskTitle"
            placeholder="Write a title for your task"
            state={title}
            setState={setTitle}
          />
          <AddTaskTextArea
            label="Description"
            id="taskDesc"
            placeholder="Write a description for your task"
            rows={4}
            state={desc}
            setState={setDesc}
          />
          <AddTaskTextInput
            label="Tags"
            id="taskTags"
            state={selectedTags}
            setState={setSelectedTags}
            placeholder="Separate tags by adding a comma"
          />
        </section>

        <section className=" w-4/5 sm:w-48 px-1">
          {/* Input components for date and time */}
          <AddTaskDateInput
            label="Select a Date"
            id="date"
            state={selectedDate}
            setState={setSelectedDate}
          />
          <AddTaskTimeInput
            label="Select starting time"
            id="startingTime"
            state={startingTime}
            setState={setStartingTime}
          />
          <AddTaskTimeInput
            label="Remind me at"
            id="remindTime"
            state={remindAt}
            setState={setRemindAt}
          />
        </section>
      </div>

      <section className="w-[90%] h-10  mx-auto my-10  relative">
        {/* Buttons for cancel and save actions */}
        <button disabled={isLoading} className="h-10 w-24 absolute right-28">
          Cancel
        </button>

        <button
          disabled={
            isLoading ||
            !title ||
            !desc ||
            !selectedTags ||
            !startingTime ||
            !selectedDate ||
            !remindAt
          }
          className="w-24 h-10 bg-[#19fa9a] rounded-lg disabled:bg-[#19fa985f] disabled:text-gray-400 absolute right-0"
          onClick={handleSave}
        >
          {isLoading ? <ActivityLoader /> : variant === "ADD" ? "Add" : "Save"}
        </button>
      </section>
    </div>
  );
};

export default TaskForm;
