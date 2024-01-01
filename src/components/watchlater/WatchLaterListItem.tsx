import { WatchLaterProps } from "@/props/WatchLaterProps";

const WatchLaterListItem: React.FC<WatchLaterProps> = ({
  url,
  title,
  image,
}) => {
  return (
    <div className="w-[95%] h-80 text-sm sm:w-[17rem] sm:h-60 overflow-hidden rounded-lg bg-[#1D1F21] my-5 ">
      {/* Preview */}
      {image && (
        <a href={url}>
          <img src={image} className="w-full h-3/5" />
        </a>
      )}

      {/* Link  and title*/}
      <div className="p-2 select-text overflow-hidden">
        <p className="font-bold text-lg sm:text-[1rem] whitespace-nowrap">
          {title.slice(0, 28) + (title.length > 28 ? "...." : "")}
        </p>
        <p className="text-sm sm:text-xs mt-2">
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

export default WatchLaterListItem;
