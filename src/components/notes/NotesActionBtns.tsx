import React, { useState } from "react";
import ActivityLoader from "../ActivityLoader";
import useHeaders from "@/hooks/useHeaders";
import axios from "axios";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/libs/GetErrorMessage";
import { NoteProps } from "@/props/NoteProps";
import { useRouter } from "next/navigation";

const NotesActionBtns: React.FC<{
  isRefreshing: boolean;
  setAllNotes: React.Dispatch<React.SetStateAction<NoteProps[]>>;
  handleRefresh : () => void
}> = ({ isRefreshing, handleRefresh, setAllNotes }) => {
  const [isCreatingNote, setIsCreatingNote] = useState<boolean>(false);
  const headers = useHeaders();
  const nav = useRouter();

  

  // function to create note
  const handleCreate = async () => {
    try {
      setIsCreatingNote(true);
      const res = await axios.post("/api/notes/createNote", {}, { headers });
      nav.push(`/dashboard/notes/${res.data.note.id}`);
    } catch (error: any) {
      console.error(error);
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    } finally {
      setIsCreatingNote(false);
    }
  };

  return (
    <section className=" h-10 my-2 w-full flex justify-end items-center gap-5">
      {/* Add watch later page link */}
      <button
        onClick={handleCreate}
        className="w-32 h-10 bg-[#19fa9a] text-black font-semibold rounded-lg float-right  relative"
        aria-label="add-note-button"
      >
        {isCreatingNote ? <ActivityLoader /> : "Create Note"}
      </button>

      {/* Refresh button */}
      <button
        disabled={isRefreshing}
        onClick={handleRefresh}
        className="w-16 h-10 rounded-lg"
        aria-label="refresh-notes-button"
      >
        {isRefreshing ? <ActivityLoader /> : "Refresh"}
      </button>
    </section>
  );
};

export default NotesActionBtns;
