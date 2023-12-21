import "@/styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full h-[100svh] BG_IMAGE">
      {children}
    </main>
  );
}
