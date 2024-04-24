import { User, UserRole } from "@prisma/client";
import { LucideIcons } from "../components/ui/icons";
import { UserWithSchoolDistricts } from "@/types";

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
  icon: keyof LucideIcons;
  disabled?: boolean;
}

export function renderUserDashboard(user: UserWithSchoolDistricts): NavItem[] {
  if (user.role === UserRole.DISTRICT_USER) {
    return [
      {
        title: "My district",
        href: `/districts/${user.schoolDistricts[0].id}`,
        icon: "district",
        disabled: false,
      },
      {
        title: "Messages",
        href: "#",
        icon: "message",
        disabled: true,
      },
    ];
  } else if (user.role === UserRole.REGIONAL_ADMIN) {
    return [
      {
        title: "My district",
        href: "/districts/",
        icon: "district",
        disabled: false,
      },
    ];
  } else {
    return [
      {
        title: "Regional Offices",
        href: "/regional-offices",
        icon: "office",
        disabled: false,
      },
      {
        title: "Districts",
        href: "/districts",
        icon: "district",
        disabled: false,
      },
      {
        title: "Users",
        href: "/",
        icon: "user",
        disabled: false,
      },
    ];
  }
}

export const dashboardConfig = {
  districtUser: [
    {
      title: "My district",
      href: "/districts/",
      icon: "district",
      disabled: false,
    },
    {
      title: "Messages",
      href: "#",
      icon: "district",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "Regional Offices",
      href: "/regional-offices",
      icon: "office",
      disabled: false,
    },
    {
      title: "Districts",
      href: "/districts",
      icon: "district",
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
