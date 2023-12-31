"use client";
import React, { useState } from "react";
import GoBack from "../GoBack";
import { getErrorMessage } from "@/libs/GetErrorMessage";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import axios from "axios";
import ActivityLoader from "../ActivityLoader";

const WatchLaterForm = () => {
  const { data: session } = useSession();
  // Variable states
  const [url, setUrl] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Handle change function
  const handleUrlChange = (e: React.FormEvent<HTMLInputElement>) => {
    setUrl(e.currentTarget.value);
  };

  const handleTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  // Headers
  const headers = {
    "Content-Type": "application/json",
    // @ts-ignore
    accessToken: session?.user?.accessToken,
  };

  // Handle submit function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      // API REQUEST
      const res = await axios.post(
        "/api/watchlater/addwatchlater",
        { url, title },
        { headers }
      );

      toast.success(res.data.message);
    } catch (error: any) {
      console.error(error);
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative py-10">
      {/* Go back button */}
      <GoBack />

      {/* Heading */}
      <div className="text-center">
        <h2 className="font-bold text-3xl">Add watch later</h2>
      </div>

      <form
        className="w-full flex flex-col items-center py-10"
        onSubmit={handleSubmit}
      >
        {/* Preview */}
        <PreviewSection url={url} />

        <section className="my-6">
          {/* Input */}
          <WatchLaterInputField
            type="text"
            label="Enter Title"
            placeHolder="e.g. John Doe's video"
            id="title"
            state={title}
            onChange={handleTitleChange}
            isLoading={isLoading}
          />

          {/* Input */}
          <WatchLaterInputField
            type="url"
            label="Enter URL"
            placeHolder="https://example.com"
            id="url"
            state={url}
            onChange={handleUrlChange}
            isLoading={isLoading}
          />
        </section>

        {/* Submit button */}
        <SubmitButton isLoading={isLoading} />
      </form>
    </div>
  );
};

// Preview Section component
const PreviewSection = ({ url }: { url: string }) => (
  <section className="w-4/5 sm:w-96 h-48 bg-[#1F1F1F] rounded-lg SCROLL_BAR relative">
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
      className={`SCROLL_BAR rounded-lg ${url && "bg-white"} ${
        !url && "bg-[#1F1F1F]"
      }`}
    />
  </section>
);

interface WatchLaterInputFieldProps {
  label: string;
  type: string;
  placeHolder: string;
  id: string;
  state: string;
  isLoading: boolean;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}
// Input Section component
const WatchLaterInputField: React.FC<WatchLaterInputFieldProps> = ({
  state,
  onChange,
  isLoading,
  placeHolder,
  id,
  type,
  label,
}) => (
  <div className="w-4/5 sm:w-96 mt-5">
    <label htmlFor={id} className="text-[1rem] ml-1 font-semibold">
      {label}
    </label>
    <br />
    <input
      type={type}
      id={id}
      placeholder={placeHolder}
      value={state}
      onChange={onChange}
      disabled={isLoading}
      className="w-full rounded-lg p-2 my-1 bg-[#1F1F1F] outline-none font-semibold"
    />
  </div>
);

const SubmitButton = ({ isLoading }: { isLoading: boolean }) => (
  <div className="w-4/5 sm:w-96 h-9 mt-5">
    <button
      type="submit"
      className="h-10 w-16 bg-[#19fa9a] rounded-lg text-[#1F1F1F] float-right font-semibold"
      disabled={isLoading}
    >
      {isLoading ? <ActivityLoader /> : "Add"}
    </button>
  </div>
);

export default WatchLaterForm;
