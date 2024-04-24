import DashboardNav from "@/components/dashboard-nav";
import { dashboardConfig, renderUserDashboard } from "@/config/dashboard";
import { MainNavbar } from "@/components/main-nav";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getUserAndDistrictsById } from "@/lib/helpers/users";
import { signIn } from "next-auth/react";
import { notFound, redirect } from "next/navigation";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await getUserAndDistrictsById(userId);

  if (!user) {
    notFound();
  }

  const dashboardConfig = renderUserDashboard(user);

  return (
    <div className="min-h-screen flex flex-col space-y-6">
      <MainNavbar items={dashboardConfig} user={user} />
      <div className="container grid gap-4">
        <div className="grid flex-1 gap-0 md:gap-6 md:grid-cols-[200px_1fr]">
          <aside className="hidden w-[200px] flex-col md:flex">
            <DashboardNav items={dashboardConfig} />
          </aside>
          <main className="flex w-full flex-1 flex-col overflow-hidden">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
