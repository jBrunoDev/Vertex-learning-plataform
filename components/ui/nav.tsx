import Link from "next/link";
import { Bell } from "lucide-react";
import { VertexLogo } from "@/components/icons/vertex-logo";
import { NavAuth } from "@/components/ui/nav-auth";
import { cn } from "@/lib/cn";

export type NavLink = {
  href: string;
  label: string;
};

type NavProps = {
  links?: NavLink[];
  activeHref?: string;
  showActions?: boolean;
  className?: string;
};

const defaultLinks: NavLink[] = [
  { href: "/courses", label: "Courses" },
  { href: "/my-learning", label: "My Learning" },
];

export function Nav({
  links = defaultLinks,
  activeHref,
  showActions = true,
  className,
}: NavProps) {
  return (
    <header
      className={cn(
        "flex w-full items-center justify-between gap-4 border-b border-neutral-200 bg-white/80 px-6 py-4 backdrop-blur sm:gap-6",
        className,
      )}
    >
      <div className="flex min-w-0 items-center gap-4 sm:gap-8">
        <Link href="/" className="shrink-0">
          <VertexLogo />
        </Link>
        <nav
          aria-label="Primary"
          className="flex items-center gap-3 sm:gap-5"
        >
          {links.map((link) => {
            const active = Boolean(activeHref) && link.href === activeHref;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "whitespace-nowrap text-body font-medium transition-colors",
                  active
                    ? "text-primary-500"
                    : "text-neutral-500 hover:text-neutral-900",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
      {showActions ? (
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-100"
            aria-label="Notifications"
          >
            <Bell className="size-5" strokeWidth={2} />
          </button>
          <NavAuth />
        </div>
      ) : null}
    </header>
  );
}
