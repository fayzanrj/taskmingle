"use client";
import { AppContext } from "@/context/AppContext";
import { WatchLaterProps } from "@/props/WatchLaterProps";
import React, { useContext, useState } from "react";
import FetchError from "../FetchError";
import NoItemFound from "../NoItemFound";
import ScrollButton from "./ScrollButton";
import { NoteProps } from "@/props/NoteProps";
import NotesListItem from "../notes/NotesListItem";

const DashboardNotesList: React.FC<{
  notes: NoteProps[] | undefined;
}> = ({ notes }) => {
  // Context
  const { isOpen } = useContext(AppContext);

  // Variable States
  const [initialNotes, setInitialNotes] = useState<NoteProps[] | undefined>(
    notes
  );

  const [scrollPosition, setScrollPosition] = useState(0);

  // Function to scroll
  const handleScroll = (direction: "left" | "right") => {
    const container = document.getElementById("notesContainer");

    if (container) {
      const scrollAmount = 252;
      const newPosition =
        direction === "left"
          ? scrollPosition - scrollAmount
          : scrollPosition + scrollAmount;

      if (newPosition >= 0 && newPosition < container.scrollWidth) {
        container.scrollTo({
          left: newPosition,
          behavior: "smooth",
        });

        setScrollPosition(newPosition);
      } else {
        setScrollPosition(0);
      }
    }
  };

  // If there is an error
  if (initialNotes === undefined) {
    return <FetchError />;
  }

  return (
    <div className="my-5">
      {/* Heading */}
      <h3 className="my-5 text-2xl font-semibold text-white">
        Your notes
      </h3>
      <div
        className={`w-full h-full relative text-center flex justify-between gap-[0.585rem] ${
          isOpen ? "md:w-[calc(100vw_-20rem)]" : "md:w-full"
        } `}
      >
        {/* LEFT BUTTON */}
        <ScrollButton
          direction="left"
          onClick={() => handleScroll("left")}
          disabled={initialNotes === undefined || initialNotes.length <= 0}
        />

        {/* LIST */}
        <div
          id="notesContainer"
          className="md:w-[91%] mx-auto overflow-x-auto flex gap-3 scroll-smooth NO_SCROLLBAR"
        >
          {initialNotes.length > 0 ? (
            initialNotes.map((note: NoteProps, index: number) => (
              <NotesListItem key={index} {...note} />
            ))
          ) : (
            <NoItemFound variant="Watch Laters" />
          )}
        </div>

        {/* Right scroll button */}
        <ScrollButton
          direction="right"
          onClick={() => handleScroll("right")}
          disabled={initialNotes === undefined || initialNotes.length <= 0}
        />
      </div>
    </div>
  );
};

export default DashboardNotesList;
