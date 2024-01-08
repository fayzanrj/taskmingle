import React from "react";

const RenderTags = ({ tags }: { tags: string[] }) => {
  return tags.map((tag, index) => (
    <p
      key={index}
      className="py-0.5 text-white border-2 rounded-full inline px-4 w-fit m-1 TAGS dark:TAGS"
    >
      {tag}
    </p>
  ));
};

export default RenderTags;
