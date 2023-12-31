import WatchLaterList from "@/components/watchlater/atchLaterList";
import { WatchLaterProps } from "@/props/WatchLaterProps";
import { authOptions } from "@/utils/AuthOptions";
import { Metadata, NextPage } from "next";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "Watch Laters",
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
      {/* Heading */}
      <div className="text-center">
        <h2 className="font-bold text-3xl">Watch Laters</h2>
      </div>

      {/* Watch Later List */}
      <WatchLaterList
        watchLaters={watchLaters}
        // @ts-ignore
        accessToken={data?.user?.accessToken}
      />
    </div>
  );
};

export default WatchLater;
