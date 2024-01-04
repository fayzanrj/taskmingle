import { getErrorMessage } from "@/libs/GetErrorMessage";
import { WatchLaterProps } from "@/props/WatchLaterProps";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import ActivityLoader from "../ActivityLoader";

const WatchLaterDeleteButton: React.FC<{
  id: string;
  setWatchLaterList: React.Dispatch<React.SetStateAction<WatchLaterProps[]>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ id, setWatchLaterList, setIsOpen }) => {
  // Getting user data
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Headers for API request
  const headers = {
    "Content-Type": "application/json",
    // @ts-ignore
    accessToken: session?.user?.accessToken,
  };

  // Function to delete item
  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const res = await axios.delete(`/api/watchlater/deletewatchlater/${id}`, {
        headers,
      });
      setWatchLaterList((prevList) =>
      prevList.filter((item) => item.id !== id)
      );
      setIsOpen(false);
      toast.success(res.data.message);
    } catch (error: any) {
      console.error(error);
      const message = getErrorMessage(error);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-[15%] h-28 absolute top-0 right-0">
      <button
        className="w-full h-full rounded-lg dark:bg-[#1D1F21] bg-white border-[.1rem] border-stone-200 dark:border-0"
        onClick={handleDelete}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityLoader />
        ) : (
          <MdDelete size="2rem" className="inline-block text-red-600" />
        )}
      </button>
    </div>
  );
};

export default WatchLaterDeleteButton;
