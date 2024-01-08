'use client'

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const RefreshPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, []);
  return null;
};

export default RefreshPage;
