import React from "react";
import { MdOutlineSearchOff } from "react-icons/md";

const NoItemFound : React.FC<{ variant: string }> = ({ variant }) => {
  return (
    <div className="w-fit mt-20 mx-auto px-3 text-center">
      <span>
        <MdOutlineSearchOff size={"4rem"} className="inline-block" />
      </span>
      <h3 style={{ wordSpacing: ".2rem" }} className="text-3xl font-semibold">
        {variant} found : ZERO
      </h3>
    </div>
  );
};

export default NoItemFound;
