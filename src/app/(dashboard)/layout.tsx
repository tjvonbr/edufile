import DashboardNav from "@/components/dashboard-nav";
import { dashboardConfig } from "@/config/dashboard";
import { MainNavbar } from "@/components/main-nav";
import { getUserAndDistrictsById } from "@/lib/helpers/users";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col space-y-6">
      <MainNavbar items={dashboardConfig.sidebarNav} />
      <div className="container grid gap-4">
        <div className="grid flex-1 gap-0 md:gap-6 md:grid-cols-[200px_1fr]">
          <aside className="hidden w-[200px] flex-col md:flex">
            <DashboardNav items={dashboardConfig.districtUser} />
          </aside>
          <main className="flex w-full flex-1 flex-col overflow-hidden">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
