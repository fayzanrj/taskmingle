"use client";
import React, { useContext, useEffect, useState } from "react";
import GoBack from "../GoBack";
import { getTime } from "@/libs/GetTime";
import { AppContext } from "@/context/AppContext";
import toast from "react-hot-toast";
import { TaskProps } from "@/props/TaskProps";
import AddTaskTextInput from "./AddTaskTextInput";
import AddTaskTextArea from "./AddTaskTextArea";
import AddTaskTimeInput from "./AddTaskTimeInput";
import AddTaskDateInput from "./AddTaskDateInput";
import { isValidTime } from "@/libs/IsValidTime";
import ActivityLoader from "../ActivityLoader";
import axios from "axios";
import { useSession } from "next-auth/react";
import { getDate } from "date-fns";

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
  // getting sesssion
  const { data: session } = useSession();

  // Variable states
  const [title, setTitle] = useState<string>(taskTitle || "");
  const [desc, setDesc] = useState<string>(taskDesc || "");
  const [selectedDate, setSelectedDate] = useState<string>(
    //@ts-ignore
    `${new Date(date).getFullYear()}-${
      //@ts-ignore
      new Date(date).getMonth() + 1
      //@ts-ignore
    }-${new Date(date).getDate()}` || ""
  );
  const [selectedTags, setSelectedTags] = useState<string>(
    tags ? tags.join(", ") : ""
  );
  const [startingTime, setStartingTime] = useState<string>(
    // @ts-ignore
    startTime ? getTime(date, startTime) : ""
  );
  const [remindAt, setRemindAt] = useState<string>(
    // @ts-ignore
    reminderAt ? getTime(date, reminderAt) : ""
  );

  // Activity state
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // clear states
  const clearStates = () => {
    setRemindAt("");
    setTitle("");
    setDesc("");
    setStartingTime("");
    setSelectedDate("");
    setSelectedTags("");
  };

  // Function to handle save action
  const handleSave = async () => {
    setIsLoading(true);
    // Check if input time values are valid
    if (!isValidTime(startingTime) || !isValidTime(remindAt)) {
      console.error("Invalid time format");
      return;
    }

    // Create a new task object with ISO string format for date and time
    const task: TaskProps = {
      taskTitle: title,
      taskDesc: desc,
      startTime: startingTime,
      reminderAt: remindAt,
      date: new Date(selectedDate).toDateString(),
      tags: selectedTags.split(","),
      status: "Pending",
    };
    const headers = {
      "Content-Type": "application/json",
      //@ts-ignore
      accessToken: session?.user?.accessToken,
    };

    try {
      if (variant == "ADD") {
        const res = await axios.post("/api/tasks/addtask", task, {
          headers: headers,
        });

        toast.success("Task has been added");
        clearStates();
      } else {
        task.id = id;
        const res = await axios.put("/api/tasks/updateTask", task, {
          headers: headers,
        });
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Some error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // JSX structure of the component
  return (
    <div className="w-full h-full relative px-4 py-10 md:pb-2">
      <GoBack />
      <header className="text-center">
        <h1 className="text-3xl font-bold">Add a Task</h1>
      </header>
      <div className="mt-4 flex justify-center items-center flex-wrap md:gap-5">
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

      <section className="w-[90%] mx-auto my-10 relative">
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
