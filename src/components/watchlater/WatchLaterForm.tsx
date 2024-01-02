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
import PreviewSection from "./PreviewSection";
import AddWatchLaterButton from "./AddWatchLaterButton";

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
        <AddWatchLaterButton isLoading={isLoading} />
      </form>
    </div>
  );
};

export default WatchLaterForm;
