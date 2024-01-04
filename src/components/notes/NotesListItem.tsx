import { NoteProps } from "@/props/NoteProps";
import Link from "next/link";
import React from "react";

const NotesListItem: React.FC<NoteProps> = ({ content, id }) => {
  return (
    <Link href={`/dashboard/notes/${id}`}>
      <div className="w-56 h-56 bg-[#1D1F21] rounded-lg shadow-lg p-4 overflow-hidden text-ellipsis cursor-pointer">
        <p className="overflow-hidden text-ellipsis h-full">{content}</p>
      </div>
    </Link>
  );
};

export default NotesListItem;