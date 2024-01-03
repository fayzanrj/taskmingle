"use client";
import { useState } from "react";
import ActivityLoader from "../ActivityLoader";

const AddNoteButton = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <button className="w-32 h-10 bg-[#19fa9a] rounded-lg float-right  relative">
      {isLoading ? <ActivityLoader /> : "Add Note"}
    </button>
  );
};

export default AddNoteButton;
