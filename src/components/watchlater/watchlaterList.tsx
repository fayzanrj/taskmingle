import { WatchLaterProps } from "@/props/WatchLaterProps";
import React from "react";

interface WatchLaterListProps {
  watchLaters: WatchLaterProps[];
}
const WatchLaterList: React.FC<WatchLaterListProps> = ({ watchLaters }) => {
  return (
    <div className="w-full flex justify-center flex-wrap md:px-10 lg:px-16 gap-5  lg:gap-10">
      {watchLaters.map((watchlater: WatchLaterProps, index: number) => (
        <WatchLaterListItem key={index} {...watchlater} />
      ))}
    </div>
  );
};

export default WatchLaterList;

const WatchLaterListItem: React.FC<WatchLaterProps> = ({ url }) => {
  return (
    <div className="w-[95%] h-64 text-sm sm:w-80 sm:h-56 overflow-hidden rounded-lg bg-[#1D1F21]">
      {/* Preview */}
      <iframe
        src="url"
        width={"100%"}
        height={"70%"}
        className="rounded-lg rounded-b-none"
      />

      {/* Link */}
      <div>
        <p className="p-2">
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
