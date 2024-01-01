"use client";
import { AppContext } from "@/context/AppContext";
import { TaskProps } from "@/props/TaskProps";
import React, { useContext, useState } from "react";
import FetchError from "../FetchError";
import NoItemFound from "../NoItemFound";
import TaskItem from "../tasks/TaskItem";
import { WatchLaterProps } from "@/props/WatchLaterProps";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

interface DashboardWatchList {
  watchLater: WatchLaterProps[] | undefined;
}

const DashboardWatchList: React.FC<DashboardWatchList> = ({ watchLater }) => {
  const { isOpen } = useContext(AppContext);
  //   const { setInitialTasks, initialTasks } = useContext(AppContext);
  const [initialWatchLater, setInitialWatchLater] = useState<
    WatchLaterProps[] | undefined
  >(watchLater);

  // State to keep track of the current scroll position
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = (direction: "left" | "right") => {
    const container = document.getElementById("watchLaterContainer");

    if (container) {
      const scrollAmount = 252; // You can adjust this value based on your preference
      const newPosition =
        direction === "left"
          ? scrollPosition - scrollAmount
          : scrollPosition + scrollAmount;

      container.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });

      setScrollPosition(newPosition);
    }
  };

  if (initialWatchLater === undefined) {
    return <FetchError />;
  }

  // If there are no tasks
  if (initialWatchLater?.length === 0) {
    return (
      <div className="my-5">
        <h3 className="my-5 text-2xl font-semibold text-white">
          Maybe you would like to watch
        </h3>{" "}
        <NoItemFound variant="Watch Laters" />
      </div>
    );
  }

  return (
    <div className="my-5">
      <h3 className="my-5 text-2xl font-semibold text-white">
        Maybe you would like to watch
      </h3>
      <div
        className={`w-full h-full ${
          isOpen ? "md:w-[calc(100vw_-20rem)]" : "md:w-full"
        }  relative text-center flex justify-between gap-[0.585rem]`}
      >
        {/* LEFT BUTTON */}
        <button
          className="w-fit h-40 rounded-lg  z-20 disabled:text-stone-800"
          onClick={() => handleScroll("left")}
          disabled={
            initialWatchLater === undefined || initialWatchLater?.length <= 0
          }
        >
          <MdArrowBackIos size={"2rem"} className="inline-block" />
        </button>

        {/* LIST */}
        <div
          id="watchLaterContainer"
          className="md:w-[91%] mx-auto overflow-x-auto flex gap-3 scroll-smooth NO_SCROLLBAR"
        >
          {initialWatchLater?.map(
            (watchlater: WatchLaterProps, index: number) => (
              <DashboardWatchListItem key={index} {...watchlater} />
            )
          )}
        </div>

        {/* Right scroll button */}
        <button
          className="w-fit h-40 rounded-lg  z-20 disabled:text-stone-800"
          onClick={() => handleScroll("right")}
          disabled={
            initialWatchLater === undefined || initialWatchLater?.length <= 0
          }
        >
          <MdArrowForwardIos size={"2rem"} className="inline-block" />
        </button>
      </div>
    </div>
  );
};

export default DashboardWatchList;

const DashboardWatchListItem = ({
  url,
  image,
  title,
}: {
  url: string;
  image: string;
  title: string;
}) => (
  <div className="min-w-[15rem] max-w-[15rem] h-56 rounded-lg overflow-hidden bg-[#1D1F21] ">
    {/* Image */}
    <a href={url}>
      <img src={image} className="w-full" />
    </a>
    <p className=" px-2 font-semibold">{title}</p>
  </div>
);
