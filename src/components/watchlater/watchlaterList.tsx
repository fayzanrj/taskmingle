"use client";
import { getErrorMessage } from "@/libs/GetErrorMessage";
import { WatchLaterProps } from "@/props/WatchLaterProps";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import ActivityLoader from "../ActivityLoader";
import FetchError from "../FetchError";
import NoItemFound from "../NoItemFound";

interface WatchLaterListProps {
  watchLaters: WatchLaterProps[];
  accessToken: string;
}

const WatchLaterList: React.FC<WatchLaterListProps> = ({
  watchLaters,
  accessToken,
}) => {
  const [watchLaterList, setWatchLaterList] =
    useState<WatchLaterProps[]>(watchLaters);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // HEADERS FOR API REQUEST
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    // @ts-ignore
    accessToken,
  };

  // if there is an error fetching watch later
  if (watchLaters === undefined) {
    return <FetchError />;
  }

  // If there are no items in watch later
  if (watchLaters.length === 0) {
    return <NoItemFound variant="Watch Laters" />;
  }

  // Handle Refresh
  const handleRefresh = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/watchlater/getwatchlaters", {
        headers,
      });
      setWatchLaterList(res.data.watchlaters);
    } catch (error: any) {
      console.error(error.message);
      const message = getErrorMessage(error);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <section className=" h-10 my-10 w-full flex justify-end items-center gap-5">
        {/* Add watch later page link */}
        <Link href={"/dashboard/watchlater/addwatchlater"}>
          <button className="py-1.5 px-3 bg-[#19fa9a] rounded-lg text-[#1F1F1F] font-semibold">
            Add watch later
          </button>
        </Link>

        <button
          disabled={isLoading}
          onClick={handleRefresh}
          className="w-16 h-10 rounded-lg"
        >
          {isLoading ? <ActivityLoader /> : "Refresh"}
        </button>
      </section>

      <div className="w-full flex justify-center flex-wrap  gap-5  lg:gap-10">
        {watchLaterList.map((watchlater: WatchLaterProps, index: number) => (
          <WatchLaterListItem key={index} {...watchlater} />
        ))}
      </div>
    </>
  );
};

export default WatchLaterList;

const WatchLaterListItem: React.FC<WatchLaterProps> = ({ url, title }) => {
  return (
    <div className="w-[95%] h-72 text-sm sm:w-80 sm:h-56 overflow-hidden rounded-lg bg-[#1D1F21] my-5">
      {/* Preview */}
      <iframe
        src="url"
        width={"100%"}
        height={"60%"}
        className="rounded-lg rounded-b-none"
        loading={"eager"}
      />

      {/* Link */}
      <div className="p-2 select-text">
        <p className="font-bold text-lg whitespace-nowrap">{title.slice(0, 30) + (title.length > 30 ? "...." : "")}</p>
        <p>
          Link :{" "}
          <span>
            <a href={url} className="underline underline-offset-4">
              {url}
            </a>
          </span>
        </p>
      </div>
    </div>
  );
};
