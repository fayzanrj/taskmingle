import Notifications from "@/components/dashboard/notifications/Notifications";
import Sidebar from "@/components/dashboard/sidebar/Sidebar";
import "@/styles/globals.css";
import { authOptions } from "@/utilities/AuthOptions";
import { Metadata } from "next";
import { getServerSession } from "next-auth";

// Metadata
export const metadata: Metadata = {
  title: {
    default: "Dashboard",
    template: `%s - Task Notify`,
  },
};

const getGreetingMessage = () => {
  const currentHour = new Date().getHours();

  // Determine greeting based on the hour of the day
  if (currentHour >= 5 && currentHour <= 12) {
    return "Good Morning";
  } else if (currentHour < 18 && currentHour >= 12) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getServerSession(authOptions);
  const greetingMessage = await getGreetingMessage();
  const userName = data && data.user ? data.user.name : "Guest";
  const message = `${greetingMessage} ${userName}`;

  return (
    <main className="w-full h-[100svh] flex">
      {/* Side component */}
      <Sidebar />
      <div className="w-full relative">
        {/* Top Bar component */}
        <TopBar message={message} />
        {/* Rest of the pages */}
        <div className="w-full">{children}</div>
      </div>
    </main>
  );
}

// Top Bar
const TopBar = ({ message }: { message: string }) => {
  return (
    <div className="w-full h-16 px-10 text-black dark:text-white border-b-2 dark:border-b-0 bg-white dark:bg-[#1F1F1F] relative z-40">
      {/* GREETING */}
      <p className="max-w-[90%] text-lg md:text-2xl font-semibold absolute top-1/2 transform -translate-y-1/2">
        {message}
      </p>
      {/* NOTIFICATIONS */}
      {/* <Notifications /> */}
    </div>
  );
};
