"use client";
import { AppContext } from "@/context/AppContext";
import { WatchLaterProps } from "@/props/WatchLaterProps";
import React, { useContext, useState } from "react";
import FetchError from "../FetchError";
import NoItemFound from "../NoItemFound";
import ScrollButton from "./ScrollButton";

const DashboardWatchList: React.FC<{
  watchLater: WatchLaterProps[] | undefined;
}> = ({ watchLater }) => {
  // Context
  const { isOpen } = useContext(AppContext);

  // Variable States
  const [initialWatchLater, setInitialWatchLater] = useState<
    WatchLaterProps[] | undefined
  >(watchLater);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Function to scroll
  const handleScroll = (direction: "left" | "right") => {
    const container = document.getElementById("watchLaterContainer");

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
  if (initialWatchLater === undefined) {
    return <FetchError />;
  }

  return (
    <div className="my-5">
      {/* Heading */}
      <h3 className="my-5 text-2xl font-semibold text-white">
        Maybe you would like to watch
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
          disabled={
            initialWatchLater === undefined || initialWatchLater.length <= 0
          }
        />

        {/* LIST */}
        <div
          id="watchLaterContainer"
          className="md:w-[91%] mx-auto overflow-x-auto flex gap-3 scroll-smooth NO_SCROLLBAR"
        >
          {initialWatchLater.length > 0 ? (
            initialWatchLater.map(
              (watchlater: WatchLaterProps, index: number) => (
                <DashboardWatchListItem key={index} {...watchlater} />
              )
            )
          ) : (
            <NoItemFound variant="Watch Laters" />
          )}
        </div>

        {/* Right scroll button */}
        <ScrollButton
          direction="right"
          onClick={() => handleScroll("right")}
          disabled={
            initialWatchLater === undefined || initialWatchLater.length <= 0
          }
        />
      </div>
    </div>
  );
};

export default DashboardWatchList;

// List Item Component
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
