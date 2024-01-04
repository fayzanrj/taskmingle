import GoBack from "@/components/GoBack";
import NoteTextArea from "@/components/notes/NoteTextArea";
import { NoteProps } from "@/props/NoteProps";
import { authOptions } from "@/utils/AuthOptions";
import { getServerSession } from "next-auth";
import React from "react";

//@ts-ignore
const NoteDetail: React.FC<{ params: any }> = async ({ params }) => {
  const data = await getServerSession(authOptions);

  // HEADERS FOR API REQUEST
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    // @ts-ignore
    accessToken: data?.user?.accessToken,
  };

  const response = await fetch(
    `${process.env.HOST}/api/notes/getNote/${params.noteId}`,
    {
      cache: "no-cache",
      headers: headers,
    }
  );
  const res = await response.json();
  const note: NoteProps = res.note;

  if (!note) {
    return (
      <div className="mt-20 text-center">
        <h3 className="text-3xl font-semibold">No note found</h3>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Go back Button */}
      <GoBack />

      <div className="w-full min-h-[calc(100svh_-_7.5rem)] sm:w-[30rem] md:w-[32rem] p-2 mx-auto mt-10">
        <NoteTextArea {...note} />
      </div>
    </div>
  );
};

export default NoteDetail;
