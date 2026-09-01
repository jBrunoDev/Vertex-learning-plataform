import { Check, Lock, Play } from "lucide-react";
import { cn } from "@/lib/cn";

export type StatusVariant =
  | "in-progress"
  | "completed"
  | "now-playing"
  | "locked";

type StatusProps = {
  variant: StatusVariant;
  className?: string;
};

const config: Record<
  StatusVariant,
  { label: string; className: string; icon: "dot" | "check" | "play" | "lock" }
> = {
  "in-progress": {
    label: "In Progress",
    className: "bg-status-in-progress-bg text-status-in-progress",
    icon: "dot",
  },
  completed: {
    label: "Completed",
    className: "bg-status-completed-bg text-status-completed",
    icon: "check",
  },
  "now-playing": {
    label: "Now Playing",
    className: "bg-primary-100 text-primary-500",
    icon: "play",
  },
  locked: {
    label: "Locked",
    className: "bg-status-locked-bg text-status-locked",
    icon: "lock",
  },
};

function StatusIcon({
  icon,
}: {
  icon: (typeof config)[StatusVariant]["icon"];
}) {
  if (icon === "dot") {
    return <span className="size-1.5 rounded-full bg-current" aria-hidden />;
  }
  if (icon === "check") {
    return <Check className="size-3" strokeWidth={2.5} aria-hidden />;
  }
  if (icon === "play") {
    return <Play className="size-3 fill-current" strokeWidth={0} aria-hidden />;
  }
  return <Lock className="size-3" strokeWidth={2} aria-hidden />;
}

export function Status({ variant, className }: StatusProps) {
  const item = config[variant];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-small font-medium",
        item.className,
        className,
      )}
    >
      <StatusIcon icon={item.icon} />
      {item.label}
    </span>
  );
}
