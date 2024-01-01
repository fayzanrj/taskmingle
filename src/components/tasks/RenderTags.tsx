import React from "react";

// Tags interface
interface RenderTagsProps {
  tags: string[];
}

const RenderTags: React.FC<RenderTagsProps> = ({ tags }) => {
  return tags.map((tag, index) => (
    <p
      key={index}
      className="py-0.5 border-2 rounded-full inline px-4 w-fit m-1  TAGS"
    >
      {tag}
    </p>
  ));
};

export default RenderTags;
