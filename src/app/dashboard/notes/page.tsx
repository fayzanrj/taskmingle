import NotesList from "@/components/notes/NotesList";
import { Metadata, NextPage } from "next";

export const metadata : Metadata = {
  title : "Notes"
}

const Notes: NextPage = async () => {
  return (
    <div className="p-5">
      <NotesList />
    </div>
  );
};

export default Notes;
