/** Formats lesson/course duration seconds as `45m`, `1h 12m`, or `18h 24m`. */
export function formatDuration(totalSeconds: number): string {
  const seconds = Math.max(0, Math.round(totalSeconds));
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0 && minutes > 0) return `${hours}h ${minutes}m`;
  if (hours > 0) return `${hours}h`;
  if (minutes > 0) return `${minutes}m`;
  if (seconds > 0) return "1m";
  return "0m";
}

/** Formats display enrollment as `2.1k students` or `840 students`. */
export function formatStudentCount(count: number): string {
  const safe = Math.max(0, Math.round(count));
  if (safe >= 1000) {
    const thousands = safe / 1000;
    const rounded =
      thousands >= 10
        ? Math.round(thousands).toString()
        : (Math.round(thousands * 10) / 10).toString();
    return `${rounded}k students`;
  }
  return `${safe} students`;
}
