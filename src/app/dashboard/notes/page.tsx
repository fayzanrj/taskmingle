import NotesList from "@/components/notes/NotesList";
import { NoteProps } from "@/props/NoteProps";
import { authOptions } from "@/utils/AuthOptions";
import { NextPage } from "next";
import { getServerSession } from "next-auth";

const Notes: NextPage = async () => {
  const data = await getServerSession(authOptions);

  // HEADERS FOR API REQUEST
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    // @ts-ignore
    accessToken: data?.user?.accessToken,
  };

  const response = await fetch(`${process.env.HOST}/api/notes/getAllNotes`, {
    cache: "no-cache",
    headers: headers,
  });
  const res = await response.json();
  const notes: NoteProps[] = res.notes;

  return (
    <div className="p-5">
      <NotesList notes={notes} />
    </div>
  );
};

export default Notes;
