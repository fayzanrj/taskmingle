'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const RefreshPage = () => {
  const router = useRouter();
  useEffect(() => {
    console.log('refreshing')
    router.refresh();
  }, []);
  return null;
};

export default RefreshPage;
