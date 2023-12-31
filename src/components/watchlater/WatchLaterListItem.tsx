import { WatchLaterProps } from "@/props/WatchLaterProps";

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
        <p className="font-bold text-lg whitespace-nowrap">
          {title.slice(0, 30) + (title.length > 30 ? "...." : "")}
        </p>
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

export default WatchLaterListItem
