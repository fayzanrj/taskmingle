"use client";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { MdDelete, MdEdit } from "react-icons/md";
import ActivityLoader from "../ActivityLoader";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getErrorMessage } from "@/libs/GetErrorMessage";

// TO DO : WORK ON LOADING STATE

// Task Action Props
interface TaskActionBtnsProps {
  href: string;
  taskId: string;
}

const TaskActionBtns: React.FC<TaskActionBtnsProps> = ({ href, taskId }) => {
  // Getting user data
  const { data: session } = useSession();
  // Router for navigation
  const router = useRouter();
  // Activity state
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // HEADERS FOR API REQUEST
  const headers = {
    "Content-Type": "application/json",
    // @ts-ignore
    accessToken: session?.user?.accessToken,
  };

  // Function to handle delete
  const handleDelete = async () => {
    const confir = confirm("Are you sure?");

    if (!confir) {
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.delete(`/api/tasks/deleteTask/${taskId}`, {
        headers,
      });
      router.back();
      toast.success(res.data.message, {
        duration: 4000,
      });
    } catch (error) {
      console.error(error);
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="text-right my-4 relative">
      {/* Edit button */}
      <Link href={href}>
        <button
          className="w-24 h-10 rounded-lg font-semibold absolute right-28"
          aria-label="Edit Task"
          disabled={isLoading}
        >
          Edit{" "}
          <span>
            <MdEdit size="1.3rem" className="inline" />
          </span>
        </button>
      </Link>

      {/* Delete button */}
      <button
        className="w-24 h-10 bg-red-600 rounded-lg font-semibold text-white absolute right-0"
        disabled={isLoading}
        aria-label="Delete Task"
        onClick={handleDelete}
      >
        {isLoading ? (
          <ActivityLoader />
        ) : (
          <>
            Delete
            <span>
              <MdDelete size="1.5rem" className="inline" />
            </span>
          </>
        )}
      </button>
    </div>
  );
};

export default TaskActionBtns;
