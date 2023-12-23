import { AppState } from "@/context/AppContext";
import Providers from "@/context/Providers";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import { Toaster } from "react-hot-toast";

const raleway = Raleway({ subsets: ["latin"], weight: "700" });

export const metadata: Metadata = {
  title: "Task Mingle",
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
      <body className={`${raleway.className} SCROLL_BAR `}>
        <Providers>
          <AppState>
            <Toaster position="top-right" />
            {children}
          </AppState>
        </Providers>
      </body>
    </html>
  );
}
