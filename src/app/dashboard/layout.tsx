import Notifications from "@/components/dashboard/Notifications";
import Sidebar from "@/components/dashboard/Sidebar";
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

  return (
    <main className="w-full h-[100svh] flex">
      <Sidebar />
      <div className="w-full h-fit  duration-500">
        <div className="w-full h-16 px-10 bg-[#19fa9a]  relative z-40">
          {/* GREETING */}
          <Greeting>
            {currentTime + " " + (data && data.user ? data.user.name : "Guest")}
          </Greeting>
          <Notifications />
        </div>
        {children}
      </div>
    </main>
  );
}

const Greeting = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className="max-w-[90%] text-lg md:text-2xl font-semibold  absolute top-1/2  transform -translate-y-1/2">
      {children}
    </p>
  );
};


