import { SidebarNavItem } from "@/config/dashboard";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useLockBody } from "@/app/hooks/use-lock-body";

interface MobileNavProps {
  children?: React.ReactNode;
  items: SidebarNavItem[];
}

export function MobileNav({ children, items }: MobileNavProps) {
  useLockBody();

  return (
    <div
      className={cn(
        "fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden"
      )}
    >
      <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
        <Link href="/" className="flex items-center space-x-2">
          <svg
            width="28"
            height="28"
            viewBox="0 0 38 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M38 9.6C38 7.05392 36.9991 4.61212 35.2175 2.81177C33.4359 1.01143 31.0196 0 28.5 0H0V32H12.6667V19.2H18.9293L25.3333 32H38L31.596 19.2H28.5C31.0196 19.2 33.4359 18.1886 35.2175 16.3882C36.9991 14.5879 38 12.1461 38 9.6V9.6ZM12.6667 12.8V6.4H22.1667C23.0065 6.4 23.812 6.73714 24.4058 7.33726C24.9997 7.93737 25.3333 8.75131 25.3333 9.6C25.3333 10.4487 24.9997 11.2626 24.4058 11.8627C23.812 12.4629 23.0065 12.8 22.1667 12.8H12.6667Z"
              className="fill-black"
            />
          </svg>
        </Link>
        <nav className="grid grid-flow-row auto-rows-max text-sm">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline",
                item.disabled && "cursor-not-allowed opacity-60"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
        {children}
      </div>
    </div>
  );
}
