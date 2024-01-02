import React from "react";
import ActivityLoader from "../ActivityLoader";

const AddWatchLaterButton: React.FC<{
  isLoading: boolean;
  isDisabled: boolean;
}> = ({ isLoading, isDisabled }) => (
  <div className="w-4/5 sm:w-96 h-9 mt-5">
    <button
      type="submit"
      className="h-10 w-16 bg-[#19fa9a] rounded-lg text-[#1F1F1F] float-right font-semibold disabled:bg-[#19fa985f] disabled:text-gray-400"
      disabled={isDisabled}
    >
      {isLoading ? <ActivityLoader /> : "Add"}
    </button>
  </div>
);

export default AddWatchLaterButton;
