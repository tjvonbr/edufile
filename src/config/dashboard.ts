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
      title: "Districts",
      href: "/districts",
      icon: "district",
      disabled: false,
    },
    {
      title: "Regional Offices",
      href: "/regional-offices",
      icon: "office",
      disabled: false,
    },
    {
      title: "Users",
      href: "/",
      icon: "user",
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
