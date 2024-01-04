import Notes from "@/app/dashboard/notes/page";
import React from "react";

const NotesSkeleton = () => {
  return (
    <div className="flex flex-wrap justify-center md:justify-start gap-3">
      <NotesSkeletonItem />
      <NotesSkeletonItem />
      <NotesSkeletonItem />
      <NotesSkeletonItem />
      <NotesSkeletonItem />
      <NotesSkeletonItem />
    </div>
  );
};

export default NotesSkeleton;

const NotesSkeletonItem = () => (
  <div className="w-56 h-56 bg-[#404040] rounded-lg shadow-lg p-4 overflow-hidden text-ellipsis cursor-pointer animate-pulse"></div>
);
