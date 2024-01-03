"use client";
import React from "react";
import toast from "react-hot-toast";
import { MdContentCopy } from "react-icons/md";

const NoteActionBtns: React.FC<{ note: string }> = ({ note }) => {

  // function to copy note
  const handleCopy = () => {
    console.log('copy in')
    navigator.clipboard.writeText(note)
    toast.success('Copied')
  }

  return (
    <div className="w-full h-8 relative">
      <button className="h-8" onClick={handleCopy}>
        <MdContentCopy className="inline" size="1.4rem" />
      </button>

      <button className=" w-20 h-8 bg-red-600 rounded-lg font-semibold text-white absolute top-0 right-24">
        Delete
      </button>
      <button className=" w-20 h-8 bg-[#19fa9a] rounded-lg font-semibold text-black ml-2 absolute right-1">
        Save
      </button>
    </div>
  );
};

export default NoteActionBtns;
