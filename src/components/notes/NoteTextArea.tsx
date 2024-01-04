"use client";
import { NoteProps } from "@/props/NoteProps";
import React, { useState } from "react";
import ScreenActivityLoader from "../ScreenActivityLoader";
import NoteTextAreaActionBtns from "./NoteTextAreaActionBtns";

const NoteTextArea: React.FC<NoteProps> = ({ content, id }) => {
  const [noteContent, setNoteContent] = useState<string>(content);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
      <NoteTextAreaActionBtns
        content={noteContent}
        setIsLoading={setIsLoading}
        id={id}
      />
      <textarea
        value={noteContent}
        placeholder="Start writing from here."
        onChange={(e) => setNoteContent(e.currentTarget.value)}
        className="mt-3 h-[70svh] w-full px-2 md:px-1 bg-transparent outline-none resize-none dark-font-normal font-semibold SCROLL_BAR"
      />
      {isLoading && <ScreenActivityLoader />}
    </>
  );
};

export default NoteTextArea;
