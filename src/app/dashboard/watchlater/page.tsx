import GoBack from "@/components/GoBack";
import { Metadata, NextPage } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Watch Laters - Task Notify",
};

const WatchLater: NextPage = () => {
  return (
    <div className="relative pt-10 px-5">
      {/* Go back button */}
      <GoBack />

      {/* Heading */}
      <div className="text-center">
        <h2 className="font-bold text-3xl">Watch Laters</h2>
      </div>

      <Link href={"/dashboard/watchlater/addwatchlater"}>
        <button className="py-1.5 px-3 bg-[#19fa9a] rounded-lg text-[#1F1F1F] font-semibold float-right">
          Add watch later
        </button>
      </Link>
    </div>
  );
};

export default WatchLater;
