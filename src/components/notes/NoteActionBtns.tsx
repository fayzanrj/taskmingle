import React from "react";

const NoteActionBtns = () => {
  return (
    <div className="w-full h-8 relative">
      <button className=" w-20 h-8 bg-red-600 rounded-lg font-semibold text-white absolute top-0 right-24">
        Delete
      </button>
      <button className=" w-20 h-8 bg-[#19fa9a] rounded-lg font-semibold text-black ml-2 absolute right-1">
        
        Save
      </button>
    </div>
  );
};

export default NoteActionBtns;
