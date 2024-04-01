import { LucideIcons } from "../components/ui/icons";

export interface DashboardConfig {
  sidebarNav: SidebarNavItem[];
  secondaryNav: NavItem[];
}

export interface SidebarNavItem {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
  icon: keyof LucideIcons;
}

export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
}

export const dashboardConfig = {
  sidebarNav: [
    {
      title: "Users",
      href: "/",
      icon: "user",
      disabled: false,
    },
    {
      title: "Notes",
      href: "/notes",
      icon: "notes",
      disabled: false,
    },
  ],
  secondaryNav: [
    {
      title: "Applications",
      href: "/",
    },
    {
      title: "Invitations",
      href: "dashboard/invitations",
    },
  ],
};
