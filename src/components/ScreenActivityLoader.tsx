import React from "react";
import ActivityLoader from "./ActivityLoader";

const ScreenActivityLoader = () => {
  return (
    <div className="w-full h-full flex justify-center items-center absolute top-0 left-0 dark:bg-[rgba(108,108,108,0.4)] bg-[rgba(0,0,0,0.2)]  z-30">
      <ActivityLoader />
    </div>
  );
};

export default ScreenActivityLoader;
