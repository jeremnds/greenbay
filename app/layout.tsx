import NavBar from "@/src/components/organisms/NavBar";
import { ThemeProvider } from "@/src/components/organisms/ThemeProvider";
import { cn } from "@/src/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Greenbay",
    default: "Welcome | Greenbay",
  },
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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="relative flex flex-col min-h-screen">
            <NavBar />
            <div className="flex-grow flex-1">{children}</div>
          </main>

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
