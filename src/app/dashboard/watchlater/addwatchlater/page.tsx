import WatchLaterForm from "@/components/watchlater/WatchLaterForm";
import { Metadata, NextPage } from "next";
import React, { useState } from "react";

export const metadata : Metadata = {
  title : "Add Watch Later - Task Notify"
}

const WatchLater: NextPage = () => {
  return(
    <WatchLaterForm/>
  );
};

export default WatchLater;
