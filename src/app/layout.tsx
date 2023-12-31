import { AppState } from "@/context/AppContext";
import Providers from "@/context/Providers";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import { Toaster } from "react-hot-toast";

const raleway = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Task Notify",
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
        className={`${raleway.className} SCROLL_BAR bg-[#151515] text-white`}
      >
        <Providers>
          <AppState>
            <Toaster
              position="top-right"
              containerStyle={{ fontWeight: 500 }}
              toastOptions={{
                style: {
                  backgroundColor: "#1F1F1F",
                  color: "white",
                  marginTop: "4%",
                },
              }}
            />
            {children}
          </AppState>
        </Providers>
      </body>
    </html>
  );
}
