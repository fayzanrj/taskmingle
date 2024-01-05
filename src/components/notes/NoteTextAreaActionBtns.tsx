"use client";
import useHeaders from "@/hooks/useHeaders";
import { getErrorMessage } from "@/libs/GetErrorMessage";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { MdContentCopy, MdDelete } from "react-icons/md";

const NoteTextAreaActionBtns: React.FC<{
  content: string;
  id: string;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ content, setIsLoading, id }) => {
  const headers = useHeaders();
  const nav = useRouter();

  // function to copy note
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    toast.success("Copied");
  };

  // Function to delete note
  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const res = await axios.delete(`/api/notes/deleteNote/${id}`, {headers});
      nav.back();
      toast.success(res.data.message);
      nav.push('/dashboard/notes')
    } catch (error: any) {
      console.error(error);
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to save note
  const handleSave = async () => {
    console.log(headers);
    try {
      const data = { content: content, noteId: id };
      setIsLoading(true);
      const res = await axios.put("/api/notes/updateNote", data, { headers });
      toast.success(res.data.message);
    } catch (error: any) {
      console.error(error);
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-8 relative">
      {/* Copy button */}
      <button className="h-8" onClick={handleCopy} aria-label="Copy-button">
        <MdContentCopy className="inline" size="1.4rem" />
      </button>

      {/* Delete button */}
      <button
        className="mx-4"
        onClick={handleDelete}
        aria-label="delete-button"
      >
        <MdDelete className="inline" size="1.6rem" color="red" />
      </button>

      {/* Save button */}
      <button
        onClick={handleSave}
        className=" w-20 h-8 bg-[#19fa9a] rounded-lg font-semibold text-black ml-2 absolute right-1"
        aria-label="save-button"
      >
        Save
      </button>
    </div>
  );
};

export default NoteTextAreaActionBtns;
