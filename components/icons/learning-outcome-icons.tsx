import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Check,
  Clock3,
  Code2,
  Layers,
  Shield,
  Users,
  Zap,
} from "lucide-react";

const outcomeIcons: Record<string, LucideIcon> = {
  check: Check,
  code: Code2,
  layers: Layers,
  shield: Shield,
  clock: Clock3,
  users: Users,
  zap: Zap,
  book: BookOpen,
};

export function LearningOutcomeIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = outcomeIcons[name] ?? BookOpen;
  return <Icon className={className} strokeWidth={1.75} aria-hidden />;
}
