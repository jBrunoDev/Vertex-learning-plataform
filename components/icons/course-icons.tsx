import { cn } from "@/lib/cn";

type IconProps = {
  className?: string;
};

export function NextjsCourseIcon({ className }: IconProps) {
  return (
    <span
      className={cn(
        "flex size-12 items-center justify-center rounded-md bg-neutral-900 text-[20px] font-bold leading-none text-white",
        className,
      )}
      aria-hidden
    >
      N
    </span>
  );
}

export function DockerCourseIcon({ className }: IconProps) {
  return (
    <span
      className={cn(
        "flex size-12 items-center justify-center rounded-md bg-[#E8F7FC]",
        className,
      )}
      aria-hidden
    >
      <svg width="30" height="22" viewBox="0 0 30 22" fill="none">
        <rect x="8" y="2" width="3.2" height="3.2" rx="0.4" fill="#2496ED" />
        <rect x="4.4" y="5.8" width="3.2" height="3.2" rx="0.4" fill="#2496ED" />
        <rect x="8" y="5.8" width="3.2" height="3.2" rx="0.4" fill="#2496ED" />
        <rect x="11.6" y="5.8" width="3.2" height="3.2" rx="0.4" fill="#2496ED" />
        <rect x="0.8" y="9.6" width="3.2" height="3.2" rx="0.4" fill="#2496ED" />
        <rect x="4.4" y="9.6" width="3.2" height="3.2" rx="0.4" fill="#2496ED" />
        <rect x="8" y="9.6" width="3.2" height="3.2" rx="0.4" fill="#2496ED" />
        <rect x="11.6" y="9.6" width="3.2" height="3.2" rx="0.4" fill="#2496ED" />
        <rect x="15.2" y="9.6" width="3.2" height="3.2" rx="0.4" fill="#2496ED" />
        <path
          d="M27.2 11.2c-.45-.5-1.15-.8-2-.9-.15-1.2-.75-2-1.75-2.45l-.55 1.15c.55.25.9.7 1 1.4H1c.05 2.2 1.05 3.85 2.85 4.95 1.3.8 2.9 1.25 4.75 1.3v-1.3c-1.5-.05-2.8-.4-3.75-1-1.3-.8-2-2.05-2.1-3.7h16.5c.15.7.5 1.25 1 1.65.4.3.9.45 1.4.45.2 0 .4 0 .55-.05v1.25c-.2.05-.4.05-.6.05-.9 0-1.7-.25-2.4-.75-.3.8-.85 1.45-1.6 1.9-.8.45-1.75.7-2.8.75v-1.25c.75-.05 1.4-.25 1.95-.55.55-.35.95-.85 1.15-1.45h5.85v-2.35Z"
          fill="#2496ED"
        />
        <circle cx="22.6" cy="7.4" r="0.7" fill="#2496ED" />
      </svg>
    </span>
  );
}

export function TypescriptCourseIcon({ className }: IconProps) {
  return (
    <span
      className={cn(
        "flex size-12 items-center justify-center rounded-md bg-[#3178C6] text-white",
        className,
      )}
      aria-hidden
    >
      <span className="text-[15px] font-bold leading-none tracking-tight">
        TS
      </span>
    </span>
  );
}
