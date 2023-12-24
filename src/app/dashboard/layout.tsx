import Logo from "@/components/Logo";
import Notifications from "@/components/dashboard/Notifications";
import Sidebar from "@/components/dashboard/Sidebar";
import VerifyEmailMessage from "@/components/dashboard/VerifyEmailMessage";
import "@/styles/globals.css";
import { authOptions } from "@/utils/AuthOptions";
import { Metadata } from "next";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "Dashboard - Task Mingle",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getServerSession(authOptions);

  let currentHour = new Date().getHours();
  let currentTime: string;

  // getting greeting according to the hour of the day
  if (currentHour >= 5 && currentHour <= 12) {
    currentTime = "Good Morning";
  } else if (currentHour < 18 && currentHour >= 12) {
    currentTime = "Good Afternoon";
  } else {
    currentTime = "Good Evening";
  }

  const message =
    currentTime + " " + (data && data.user ? data.user.name : "Guest");
  return (
    <main className="w-full h-[100svh] flex">
      <Sidebar />
      <div className="w-full h-fit">
        {/* @ts-ignore */}
        <TopBar message={message} isVerified={data?.user?.isVerified} />
        {children}
      </div>
    </main>
  );
}

interface TopBarProps {
  message: string;
  isVerified: boolean;
}

const TopBar: React.FC<TopBarProps> = ({ message, isVerified }) => {
  return (
    <div className="w-full h-16 px-10 bg-[#19fa9a]  relative z-40">
      {/* GREETING */}
      <p className="max-w-[90%] text-lg md:text-2xl font-semibold  absolute top-1/2  transform -translate-y-1/2">
        {message}
      </p>
      {/* NOTIFICATIONS */}
      <Notifications />

      {/* VERIFY EMAIL MESSAGE */}
      {!isVerified && <VerifyEmailMessage />}
    </div>
  );
};
