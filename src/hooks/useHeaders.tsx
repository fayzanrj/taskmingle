import { useSession } from "next-auth/react";

const useHeaders = () => {
  const { data: session } = useSession(); // Assuming useSession is a custom hook from your authentication package

  // Create headers object
  const headers = {
    'Content-Type': 'application/json',
    // @ts-ignore
    accessToken: session?.user?.accessToken,
  };

  return headers;
};

export default useHeaders;
