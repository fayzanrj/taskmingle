"use client";
import React, { useState } from "react";
import NoteActionBtns from "./NoteActionBtns";
import ScreenActivityLoader from "../ScreenActivityLoader";

const NoteTextArea: React.FC<{ note: string }> = ({ note }) => {
  const [noteValue, setNoteValue] = useState<string>(note);
  const [isLoading, setIsLoading] = useState<boolean>(true)

  return (
    <>
      <NoteActionBtns />
      <textarea
        value={noteValue}
        onChange={(e) => setNoteValue(e.currentTarget.value)}
        className="mt-3 h-[70svh] w-full bg-transparent outline-none resize-none  SCROLL_BAR"
      />
      {isLoading && <ScreenActivityLoader/>}
    </>
  );
};

export default NoteTextArea;
