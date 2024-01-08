import { AppState } from "@/context/AppContext";
import Providers from "@/context/Providers";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import { Toaster } from "react-hot-toast";

const raleway = Raleway({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: {
    default: "Task Notify",
    template: `%s - Task Notify`,
  },
  description:
    "Difficulty remebering your chores or tasks? We will help you remeber",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${raleway.className} dark:text-white bg-white dark:bg-[#151515] SCROLL_BAR`}
      >
        <Providers>
          <AppState>
            <Toaster
              position="top-right"
              containerStyle={{ fontWeight: 500 }}
              toastOptions={{
                className:
                  "text-black dark:text-white bg-white dark:bg-[#1F1F1F]",
              }}
            />
            {children}
          </AppState>
        </Providers>
      </body>
    </html>
  );
}
