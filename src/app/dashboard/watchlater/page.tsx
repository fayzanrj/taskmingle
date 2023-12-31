import GoBack from "@/components/GoBack";
import WatchLaterList from "@/components/watchlater/watchlaterList";
import { WatchLaterProps } from "@/props/WatchLaterProps";
import { authOptions } from "@/utils/AuthOptions";
import { Metadata, NextPage } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Watch Laters - Task Notify",
};

const WatchLater: NextPage = async () => {
  const data = await getServerSession(authOptions);

  // HEADERS FOR API REQUEST
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    // @ts-ignore
    accessToken: data?.user?.accessToken,
  };

  const response = await fetch(
    `${process.env.HOST}/api/watchlater/getwatchlaters`,
    { cache: "no-cache", headers: headers }
  );
  const res = await response.json();
  const watchLaters: WatchLaterProps[] = res.watchlaters;
  
  return (
    <div className="relative pt-10 px-5">
      {/* Go back button */}
      <GoBack />

      {/* Heading */}
      <div className="text-center">
        <h2 className="font-bold text-3xl">Watch Laters</h2>
      </div>

      {/* Add watch later page link */}
      <div className="relative h-10 my-10 w-full">
        <Link href={"/dashboard/watchlater/addwatchlater"}>
          <button className="py-1.5 px-3 bg-[#19fa9a] rounded-lg text-[#1F1F1F] font-semibold float-right">
            Add watch later
          </button>
        </Link>
      </div>

      {/* Watch Later List */}
      <WatchLaterList watchLaters={watchLaters} />
    </div>
  );
};

export default WatchLater;
