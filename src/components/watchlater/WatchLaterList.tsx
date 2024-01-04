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
import WatchLaterListItem from "./WatchLaterListItem";

const WatchLaterList: React.FC<{
  watchLaters: WatchLaterProps[];
  accessToken: string;
}> = ({ watchLaters, accessToken }) => {
  const [watchLaterList, setWatchLaterList] =
    useState<WatchLaterProps[]>(watchLaters);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // HEADERS FOR API REQUEST
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    // @ts-ignore
    accessToken,
  };

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

  // if there is an error fetching watch later
  if (watchLaterList === undefined) {
    return (
      <>
        <ButtonSection isLoading={isLoading} handleRefresh={handleRefresh} />
        <FetchError />;
      </>
    );
  }

  // If there are no items in watch later
  if (watchLaterList.length === 0) {
    return (
      <>
        <ButtonSection isLoading={isLoading} handleRefresh={handleRefresh} />
        <div className="mt-20">
          <NoItemFound variant="Watch Laters" />
        </div>
      </>
    );
  }

  return (
    <>
      <ButtonSection isLoading={isLoading} handleRefresh={handleRefresh} />
      {/* Watch Laters */}
      <section className="w-full flex justify-center flex-wrap  gap-5 pb-10">
        {watchLaterList.map((watchlater: WatchLaterProps, index: number) => (
          <WatchLaterListItem key={index} {...watchlater} setWatchLaterList={setWatchLaterList} />
        ))}
      </section>
    </>
  );
};

export default WatchLaterList;

// Button Section component
const ButtonSection: React.FC<{
  isLoading: boolean;
  handleRefresh: () => void;
}> = ({ isLoading, handleRefresh }) => {
  return (
    <section className=" h-10 my-2 w-full flex justify-end items-center gap-5">
      {/* Add watch later page link */}
      <Link href={"/dashboard/watchlater/addwatchlater"}>
        <button className="py-1.5 px-3 bg-[#19fa9a] rounded-lg text-[#1F1F1F] font-semibold">
          Add watch later
        </button>
      </Link>

      {/* Refresh button */}
      <button
        disabled={isLoading}
        onClick={handleRefresh}
        className="w-16 h-10 rounded-lg font-semibold"
      >
        {isLoading ? <ActivityLoader /> : "Refresh"}
      </button>
    </section>
  );
};
