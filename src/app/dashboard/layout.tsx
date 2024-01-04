import Notifications from "@/components/dashboard/Notifications";
import Sidebar from "@/components/dashboard/Sidebar";
import "@/styles/globals.css";
import { authOptions } from "@/utils/AuthOptions";
import { Metadata } from "next";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: {
    default: "Dashboard",
    template: `%s - Task Notify`,
  },
};

async function getGreetingMessage() {
  const currentHour = new Date().getHours();

  // Determine greeting based on the hour of the day
  if (currentHour >= 5 && currentHour <= 12) {
    return "Good Morning";
  } else if (currentHour < 18 && currentHour >= 12) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
}

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

interface TopBarProps {
  message: string;
}

const TopBar: React.FC<TopBarProps> = ({ message }) => {
  return (
    <div className="w-full h-16 px-10 dark:bg-[#1F1F1F] dark:text-white bg-white text-black dark:border-b-0 border-b-2 border-gray-200 relative z-40">
      {/* GREETING */}
      <p className="max-w-[90%] text-lg md:text-2xl font-semibold absolute top-1/2 transform -translate-y-1/2">
        {message}
      </p>
      {/* NOTIFICATIONS */}
      <Notifications />
    </div>
  );
};
