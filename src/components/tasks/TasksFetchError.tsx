import React from "react";
import { Lia500Px } from "react-icons/lia";

const TasksFetchError = () => {
  return (
    <div className="w-fit mt-20 mx-auto px-3 text-center">
      <span>
        <Lia500Px size={"4rem"} className="inline-block" />
      </span>
      <h3 style={{ wordSpacing: ".2rem" }} className="text-3xl font-semibold px-20">
        Lets just say we are facing an error
      </h3>
    </div>
  );
};

export default TasksFetchError;
