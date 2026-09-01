import Link from "next/link";
import { Bell } from "lucide-react";
import { VertexLogo } from "@/components/icons/vertex-logo";
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
          <span
            className="size-9 overflow-hidden rounded-full bg-neutral-200 ring-2 ring-white"
            aria-hidden
          >
            {/* Soft portrait placeholder matching the home mock avatar chip */}
            <svg viewBox="0 0 36 36" className="size-full" xmlns="http://www.w3.org/2000/svg">
              <rect width="36" height="36" fill="#E8D5C4" />
              <circle cx="18" cy="14" r="7" fill="#C4A484" />
              <path
                d="M6 34c1.5-8 6.5-12 12-12s10.5 4 12 12"
                fill="#C4A484"
              />
              <path
                d="M10 12c1-5 4-7 8-7s7 2 8 7c-2-1-5-1.5-8-1.5S12 11 10 12Z"
                fill="#3F2A1D"
              />
            </svg>
          </span>
        </div>
      ) : null}
    </header>
  );
}
