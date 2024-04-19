"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Icons } from "@/components/ui/icons";
import { SidebarNavItem } from "@/config/dashboard";
import { MobileNav } from "@/components/mobile-nav";
import { usePathname } from "next/navigation";

interface MainNavbarProps {
  children?: React.ReactNode;
  items: SidebarNavItem[];
}

export function MainNavbar({ children, items }: MainNavbarProps) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    setShowMobileMenu(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container w-full flex h-16 items-center justify-between py-4">
        <Link
          className="hidden md:flex items-start space-x-2 text-lg font-black"
          href="/"
        >
          <Icons.logo />
          <p>edufile</p>
        </Link>
        <button
          className="flex items-center space-x-2 md:hidden"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          {showMobileMenu ? <Icons.close /> : <Icons.menu />}
          <span className="font-bold">Menu</span>
        </button>
      </div>

      {showMobileMenu && items && (
        <MobileNav items={items}>{children}</MobileNav>
      )}
    </header>
  );
}
