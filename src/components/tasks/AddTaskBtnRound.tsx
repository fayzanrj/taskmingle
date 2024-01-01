import Link from "next/link";
import React from "react";
import { IoMdAdd } from "react-icons/io";

const AddTaskBtnRound: React.FC = () => {
  return (
    <Link href="/dashboard/tasks/addtask">
      <button className="w-14 h-14  fixed right-5 z-40 bottom-8 rounded-full bg-[#19fa9a]">
        <IoMdAdd
          size="1.3rem"
          className="text-[#1F1F1F] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </button>
    </Link>
  );
};
export default AddTaskBtnRound;
