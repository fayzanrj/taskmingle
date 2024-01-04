import "@/styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full h-[100svh]  bg-[#1F1F1F] BG_IMAGE dark:BG_IMAGE_DARK">
      {children}
    </main>
  );
}
