export function HomeWave() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 h-full overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-x-0 bottom-0 flex h-full items-end justify-center gap-2.5 px-3 opacity-80 sm:gap-3.5">
        {[
          42, 68, 54, 88, 60, 36, 74, 48, 92, 58, 70, 40, 84, 52, 96, 44, 66,
          38, 78, 56, 90, 50, 62,
        ].map((height, index) => (
          <span
            key={`${height}-${index}`}
            className="w-5 shrink-0 rounded-t-md sm:w-7"
            style={{
              height: `${height}%`,
              backgroundColor:
                index % 3 === 0
                  ? "#F97316"
                  : index % 3 === 1
                    ? "#FB923C"
                    : "#FDBA74",
              opacity: 0.35 + (index % 5) * 0.08,
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-50 via-neutral-50/50 to-transparent" />
    </div>
  );
}
