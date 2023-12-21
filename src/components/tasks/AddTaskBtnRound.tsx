import Link from "next/link";
import React from "react";
import { IoMdAdd } from "react-icons/io";

const AddTaskBtnRound = () => {
  return (
    <Link href="/dashboard/tasks/addtask">
      <button className="w-14 h-14  fixed right-5 bottom-8 rounded-full bg-[#19fa9a]">
        <IoMdAdd
          size="1.3rem"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </button>
    </Link>
  );
};
export default AddTaskBtnRound;
