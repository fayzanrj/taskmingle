import React from "react";

const ProfileSkeleton : React.FC = () => {
  return (
    <div className="w-[90%] md:w-[30rem] mx-auto break-words p-4 rounded-lg">
      {/* Image */}
      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#404040]  animate-pulse"></div>

      {/* User info*/}
      <div className="w-full text-left mt-10">
        <p
          className={`w-56 h-8 font-bold text-lg my-2 bg-[#404040]  animate-pulse`}
        ></p>
        <p
          className={`w-56 h-8 font-bold text-lg my-2 bg-[#404040]  animate-pulse`}
        ></p>

        <div className="my-5">
          <div className="w-40 h-8 mt-2 bg-[#404040]  animate-pulse "></div>
          <div className="w-40 h-12 mt-2 bg-[#404040]  animate-pulse"></div>
        </div>
      </div>

      {/* Change password button */}
      <div className="w-40 h-12 mt-2 bg-[#404040]  animate-pulse"></div>

      {/* Send email toggle */}
      <div className="w-full h-8 mt-2 bg-[#404040]  animate-pulse"></div>
    </div>
  );
};

export default ProfileSkeleton;
