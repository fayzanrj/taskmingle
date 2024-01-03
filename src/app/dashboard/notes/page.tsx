import Link from "next/link";
import AddTask from "../tasks/addtask/page";
import AddNoteButton from "@/components/notes/AddNoteButton";

const Notes = () => {
  return (
    <div className="p-10 ">
      <div className="h-10 mb-5 ">
        <AddNoteButton />
      </div>
      <div className="flex flex-wrap justify-center md:justify-start gap-3">
        <NoteItem />
        <NoteItem />
        <NoteItem />
        <NoteItem />
        <NoteItem />
        <NoteItem />
        <NoteItem />
        <NoteItem />
        <NoteItem />
        <NoteItem />
        <NoteItem />
        <NoteItem />
        <NoteItem />
        <NoteItem />
        <NoteItem />
        <NoteItem />
      </div>
    </div>
  );
};

export default Notes;

const NoteItem = () => {
  const note =
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat asperiores quas sit? Illum quaerat obcaecati corrupti? Ratione sapiente voluptas molestiae, rerum nostrum dolor nemo. Eveniet, cumque ut a dolores minima consectetur laboriosam quos odit, aliquid beatae tempore molestiae, deserunt eaque!";
  return (
    <Link href={"/dashboard/notes/1"}>
      <div className="w-56 h-56 bg-[#1D1F21] rounded-lg shadow-lg p-4 overflow-hidden text-ellipsis cursor-pointer">
        <p className="overflow-hidden text-ellipsis h-full">{note}</p>
      </div>
    </Link>
  );
};
