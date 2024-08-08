import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./_components/ui/NavBar";
import { cn } from "./_lib/utils";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Greenbay",
  description: "Shop of plants",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn("relative h-full font-sans antialiased", inter.className)}
      >
        <main className="relative flex flex-col min-h-screen">
          <NavBar />
          <div className="flex-grow flex-1">{children}</div>
        </main>
      </body>
    </html>
  );
}
