import React from "react";

const PreviewSection = ({
  url,
  image,
  title,
}: {
  url: string;
  title: string;
  image: string;
}) => (
  <section className="w-[95%] sm:w-96 h-56 bg-[#1F1F1F] rounded-lg SCROLL_BAR relative">
    {!url && (
      <div className="w-full text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-semibold text-lg text-white">
        Enter a URL to preview
      </div>
    )}
    {image && <img src={image} className="w-full h-full" alt="image" />}
    <p className="whitespace-nowrap md:whitespace-normal">{title}</p>
  </section>
);

export default PreviewSection;
