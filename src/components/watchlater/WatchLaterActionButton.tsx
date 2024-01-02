"use client";
import React, { useState } from "react";
import WatchLaterDeleteButton from "./WatchLaterDeleteButton";
import { IoIosArrowDown } from "react-icons/io";
import { WatchLaterProps } from "@/props/WatchLaterProps";

const WatchLaterActionButton: React.FC<{
  note: string;
  id: string;
  setWatchLaterList: React.Dispatch<React.SetStateAction<WatchLaterProps[]>>;
}> = ({ note, id , setWatchLaterList}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <div
        className={`w-[17rem] my-2 relative overflow-hidden duration-200 ${
          isOpen ? "h-28" : "h-0"
        }`}
      >
        {/* Note */}
        <div className="w-10/12 h-28 overflow-y-auto rounded-lg bg-[#1D1F21] p-2 SCROLL_BAR">
          <p>
            Note : <span>{note.slice(0, 80)}</span>
          </p>
        </div>

        {/* Delete watch later button */}
        <WatchLaterDeleteButton id={id} setWatchLaterList={setWatchLaterList} setIsOpen={setIsOpen} />
      </div>

      {/* Open Menu Button */}
      <button
        className="w-[17rem] h-10 rounded-lg bg-[#1D1F21] "
        onClick={() => setIsOpen(!isOpen)}
      >
        <IoIosArrowDown
          size="1.6rem"
          className={`inline-block duration-200 transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
    </>
  );
};

export default WatchLaterActionButton;
