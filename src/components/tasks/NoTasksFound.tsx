import React from "react";

const NoTasksFound = () => {
  return (
    <div className="w-fit mt-20 mx-auto px-3 text-center">
      <h3
        style={{ wordSpacing: ".2rem" }}
        className="text-3xl font-extrabold uppercase tracking-widest"
      >
        NO TASKS FOUND
      </h3>
    </div>
  );
};

export default NoTasksFound;
