import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import DashboardNav from "@/components/dashboard-nav";
import { MainNavbar } from "@/components/main-nav";
import { dashboardConfig } from "@/config/dashboard";
import { Toaster } from "@/components/ui/toaster";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Quench Take Home",
  description: "Take home assessment for Quench Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <div className="min-h-screen flex flex-col space-y-6">
          <MainNavbar items={dashboardConfig.sidebarNav} />
          <div className="container grid gap-4">
            <div className="grid flex-1 gap-0 md:gap-6 md:grid-cols-[150px_1fr]">
              <aside className="hidden w-[150px] flex-col md:flex">
                <DashboardNav items={dashboardConfig.sidebarNav} />
              </aside>
              <main className="flex w-full flex-1 flex-col overflow-hidden">
                {children}
              </main>
              <Toaster />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
