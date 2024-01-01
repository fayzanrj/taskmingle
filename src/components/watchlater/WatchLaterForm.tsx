"use client";
import { getErrorMessage } from "@/libs/GetErrorMessage";
import { previewUrl } from "@/libs/PreviewUrl";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import ActivityLoader from "../ActivityLoader";
import GoBack from "../GoBack";
import WatchLaterInputField from "./WatchLaterInputField";

const WatchLaterForm = () => {
  const { data: session } = useSession();
  // Variable states
  const [url, setUrl] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Handle change function
  const handleUrlChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length <= 1) {
      setImage("");
      setTitle("");
    }
    setUrl(e.currentTarget.value);
  };

  // Handle blur function
  const handleBlur = async (e: React.FormEvent<HTMLInputElement>) => {
    try {
      const { title, img } = await previewUrl(e.currentTarget.value);
      setTitle(title);
      setImage(img);
    } catch (error: any) {
      console.log(error);
    }
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
        { url, title, image },
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
        <PreviewSection title={title} url={url} image={image} />

        <section className="w-4/5 sm:w-96  mt-10">
          {/* Input */}
          <WatchLaterInputField
            type="url"
            label="Enter URL"
            placeHolder="https://example.com"
            id="url"
            state={url}
            onChange={handleUrlChange}
            isLoading={isLoading}
            onBlur={handleBlur}
          />
        </section>

        {/* Submit button */}
        <SubmitButton isLoading={isLoading} />
      </form>
    </div>
  );
};

// Preview Section component
const PreviewSection = ({
  url,
  image,
  title,
}: {
  url: string;
  title: string;
  image: string;
}) => (
  <section className="w-4/5 sm:w-96 h-56 bg-[#1F1F1F] rounded-lg SCROLL_BAR relative">
    {!url && (
      <div className="w-full text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-semibold text-lg text-white">
        Enter a URL to preview
      </div>
    )}
    {image && <img src={image} className="w-full h-full" />}
    <p className="whitespace-nowrap md:whitespace-normal">{title}</p>
  </section>
);

// Submit Button
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
