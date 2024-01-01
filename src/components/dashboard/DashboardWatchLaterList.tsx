"use client";
import { WatchLaterProps } from "@/props/WatchLaterProps";
import React, { useState } from "react";
import FetchError from "../FetchError";
import NoItemFound from "../NoItemFound";
import WatchLaterList from "../watchlater/WatchLaterList";
import Link from "next/link";

interface DashboardWatchLaterListPrps {
  watchLaters: WatchLaterProps[] | undefined;
}

const DashboardWatchLaterList: React.FC<DashboardWatchLaterListPrps> = ({
  watchLaters,
}) => {
  const [initialWatchLater, setInitialWatchLater] = useState<
    WatchLaterProps[] | undefined
  >(watchLaters);

  if (initialWatchLater === undefined) {
    return <FetchError />;
  }

  // If there are no tasks
  if (initialWatchLater?.length === 0) {
    return <NoItemFound variant="Watch Laters" />;
  }

  return (
    <div className="w-80 h-fit">
      <h3 className="text-2xl font-semibold text-white">
        Maybe you wanna watch
      </h3>
      <div>
        <WatchLaterList
          watchLaters={initialWatchLater?.slice(0, 3)}
          accessToken=""
        />
      </div>{" "}
      <div className="text-center">
        <Link href={"/dashboard/watchlater"}>
          <p className="text-lg underline underline-offset-2">
            See all watch laters
          </p>
        </Link>
      </div>
    </div>
  );
};

export default DashboardWatchLaterList;
