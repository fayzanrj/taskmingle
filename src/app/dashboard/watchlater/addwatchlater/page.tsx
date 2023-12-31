"use client";
import { NextPage } from "next";
import React, { useState } from "react";

const WatchLater: NextPage = () => {
  // State
  const [url, setUrl] = useState<string>("");

  // Event handlers
  const handleUrlChange = (e: React.FormEvent<HTMLInputElement>) => {
    setUrl(e.currentTarget.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form
      className="w-full flex flex-col items-center py-10"
      onSubmit={handleSubmit}
    >
      {/* Preview */}
      <div className="w-4/5 sm:w-96 h-48 bg-[#1F1F1F] rounded-lg SCROLL_BAR relative">
        {!url && (
          <div className="w-full text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-semibold text-lg text-white">
            Enter a URL to preview
          </div>
        )}
        <iframe
          title="urlPreview"
          src={url}
          width="100%"
          height="100%"
          className={`SCROLL_BAR rounded-lg ${url ? "bg-white" : "bg-[#1F1F1F]"}`}
        />
      </div>

      {/* Input */}
      <div className="mt-10">
        <label htmlFor="urlInput" className="text-[1rem] ml-1 font-semibold">
          Enter URL:
        </label>
        <br />
        <input
          type="url"
          id="urlInput"
          placeholder="https://example.com"
          value={url}
          onChange={handleUrlChange}
          className="w-4/5 sm:w-96 rounded-lg p-2 my-1 bg-[#1F1F1F] outline-none font-semibold"
        />
      </div>

      {/* Submit button */}
      <div className="w-4/5 sm:w-96 h-9 mt-5">
        <button
          type="submit"
          className="h-10 w-16 bg-[#19fa9a] rounded-lg text-[#1F1F1F]  float-right font-semibold"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default WatchLater;
