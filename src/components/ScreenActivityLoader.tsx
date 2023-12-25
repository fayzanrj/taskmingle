import React from "react";
import ActivityLoader from "./ActivityLoader";

const ScreenActivityLoader = () => {
  return (
    <div style={{zIndex : 999}} className="w-full h-full flex justify-center items-center absolute top-0 left-0 bg-[rgb(0,0,0,0.2)]">
      <ActivityLoader />
    </div>
  );
};

export default ScreenActivityLoader;
