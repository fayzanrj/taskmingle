import { WatchLaterProps } from "@/props/WatchLaterProps";
import WatchLaterActionButton from "./WatchLaterActionButton";

interface WatchLaterListItemProps extends WatchLaterProps {
  setWatchLaterList: React.Dispatch<React.SetStateAction<WatchLaterProps[]>>;
}
const WatchLaterListItem: React.FC<WatchLaterListItemProps> = ({
  url,
  title,
  image,
  id,
  note,
  setWatchLaterList
}) => {
  return (
    <div>
      <div className="text-sm w-[17rem] h-60 overflow-hidden rounded-lg bg-[#1D1F21]">
        {/* Preview */}
        {image && (
          <a href={url} target="_blank" aria-label="link">
            <img src={image} className="w-full h-3/5" alt="image" />
          </a>
        )}

        {/* Link  and title*/}
        <div className="p-2 select-text overflow-hidden">
          <p className="font-bold text-[1rem] whitespace-nowrap">
            {title.slice(0, 28) + (title.length > 28 ? "...." : "")}
          </p>
          <p className="text-xs mt-2">
            Link :{" "}
            <span>
              <a href={url} className="underline underline-offset-4">
                {url}
              </a>
            </span>
          </p>
        </div>
      </div>

      {/* Action button to show note and delete button */}
      <WatchLaterActionButton note={note} id={id} setWatchLaterList={setWatchLaterList} />
    </div>
  );
};

export default WatchLaterListItem;


