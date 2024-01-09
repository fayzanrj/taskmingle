import NotesList from "@/components/notes/NotesList";
import { Metadata, NextPage } from "next";
import { getHeaders } from "@/libs/GetHeaders";
import { NoteProps } from "@/props/NoteProps";
import RefreshPage from "@/components/RefreshPage";

export const metadata: Metadata = {
  title: "Notes",
};

const Notes: NextPage = async () => {
  const headers = await getHeaders();

  const response = await fetch(`${process.env.HOST}/api/notes/getAllNotes`, {
    headers,
    cache: "no-cache",
  });
  const res = await response.json();
  const notes: NoteProps[] = res.notes;
  return (
    <div className="p-5">
      <RefreshPage />
      <NotesList notes={notes} />
    </div>
  );
};

export default Notes;
