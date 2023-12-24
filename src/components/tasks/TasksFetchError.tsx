import React from "react";

const TasksFetchError = () => {
  return (
    <div className="w-fit mt-20 mx-auto px-3 text-center">
      <h3
        style={{ wordSpacing: ".2rem" }}
        className="text-3xl font-extrabold uppercase tracking-widest"
      >
        Error fetching task
      </h3>
    </div>
  );
};

export default TasksFetchError;
