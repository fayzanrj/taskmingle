"use client";
import { NoteProps } from "@/props/NoteProps";
import Link from "next/link";
import React, { useState } from "react";
import FetchError from "../FetchError";
import NoItemFound from "../NoItemFound";
import NotesActionBtns from "./NotesActionBtns";
import NotesSkeleton from "../skeletons/NotesSkeleton";
import NotesListItem from "./NotesListItem";

const NotesList: React.FC<{ notes: NoteProps[] }> = ({ notes }) => {
  const [allNotes, setAllNotes] = useState<NoteProps[]>(notes);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  if (notes === undefined) {
    return <FetchError />;
  }

  if (notes.length <= 0) {
    return (
      <div className="mt-20">
        <NoItemFound variant="Notes" />
      </div>
    );
  }

  if (isRefreshing) {
    return (
      <>
        <NotesActionBtns
          isRefreshing={isRefreshing}
          setIsRefreshing={setIsRefreshing}
          setAllNotes={setAllNotes}
        />
        <NotesSkeleton />;
      </>
    );
  }
  return (
    <>
      <NotesActionBtns
        isRefreshing={isRefreshing}
        setIsRefreshing={setIsRefreshing}
        setAllNotes={setAllNotes}
      />
      <div className="flex flex-wrap justify-center md:justify-start gap-3">
        {allNotes.map((note: NoteProps, index: number) => (
          <NotesListItem key={index} {...note} />
        ))}
      </div>
    </>
  );
};

export default NotesList;
