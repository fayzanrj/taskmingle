"use client";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { MdDelete, MdEdit } from "react-icons/md";
import ActivityLoader from "../ActivityLoader";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface TaskActionBtnsProps {
  href: string;
  taskId: string;
}
const TaskActionBtns: React.FC<TaskActionBtnsProps> = ({ href, taskId }) => {
  const { data: session } = useSession();
  const router = useRouter();
  // Activity state
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // HEADERS FOR API REQUEST
  const headers = {
    "Content-Type": "application/json",
    // @ts-ignore
    accessToken: session?.user?.accessToken,
  };

  const handleDelete = async () => {
    try {
      const confir = confirm("Are you sure?");

      if (!confir) {
        return;
      }

      setIsLoading(true);
      const res = await axios.delete(`/api/tasks/deleteTask/${taskId}`, {
        headers,
      });

      router.back();
        toast.success(res.data.message, {
          duration : 4000
        });
    } catch (error) {
      toast.error("Some error occured");
      console.error(error);
    } finally {
      setTimeout(() => setIsLoading(false), 3000);
    }
  };
  return (
    <div className="text-right my-4 relative">
      {/* edit button */}
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

      {/* delete button */}
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
