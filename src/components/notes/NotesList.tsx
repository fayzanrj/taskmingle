"use client";
import { NoteProps } from "@/props/NoteProps";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import FetchError from "../FetchError";
import NoItemFound from "../NoItemFound";
import NotesActionBtns from "./NotesActionBtns";
import NotesSkeleton from "../skeletons/NotesSkeleton";
import NotesListItem from "./NotesListItem";
import { pusherClient } from "@/pusher/pusher";
import axios from "axios";
import { getErrorMessage } from "@/libs/GetErrorMessage";
import toast from "react-hot-toast";
import useHeaders from "@/hooks/useHeaders";

const NotesList: React.FC<{ notes: NoteProps[] }> = ({ notes }) => {
  const [allNotes, setAllNotes] = useState<NoteProps[]>(notes);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const headers = useHeaders();

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      const res = await axios.get("/api/notes/getAllNotes", { headers });
      setAllNotes(res.data.notes);
    } catch (error: any) {
      console.error(error);
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    handleRefresh();
  }, []);

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
          handleRefresh={handleRefresh}
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
        handleRefresh={handleRefresh}
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
