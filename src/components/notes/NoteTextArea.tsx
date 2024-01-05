"use client";
import { NoteProps } from "@/props/NoteProps";
import React, { use, useEffect, useState } from "react";
import ScreenActivityLoader from "../ScreenActivityLoader";
import NoteTextAreaActionBtns from "./NoteTextAreaActionBtns";
import axios from "axios";
import useHeaders from "@/hooks/useHeaders";
import { getErrorMessage } from "@/libs/GetErrorMessage";
import toast from "react-hot-toast";

const NoteTextArea: React.FC<NoteProps> = ({ content, id }) => {
  const [noteContent, setNoteContent] = useState<string>(content);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const headers = useHeaders();

  useEffect(() => {
    const refresh = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`/api/notes/getNote/${id}`, { headers });
        console.log(res.data.note.content);
        setNoteContent(res.data.note.content);
      } catch (error: any) {
        console.error(error);
        const errorMessage = getErrorMessage(error);
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };
    refresh();
  }, []);

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
