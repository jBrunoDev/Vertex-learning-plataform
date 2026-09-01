import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { VertexLogo } from "@/components/icons/vertex-logo";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-neutral-50 px-6 py-24">
      <main className="flex w-full max-w-lg flex-col items-center gap-6 text-center">
        <VertexLogo />
        <h1 className="font-display text-display-2 font-bold text-neutral-900">
          Vertex
        </h1>
        <p className="text-body-lg text-neutral-500">
          Design system tokens and components are ready. Open the showcase to
          compare against the design sheet.
        </p>
        <Link
          href="/design-system"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary-500 px-6 text-body font-medium text-white transition-colors hover:bg-primary-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
        >
          Open design system
          <ArrowRight className="size-4" strokeWidth={2} aria-hidden />
        </Link>
      </main>
    </div>
  );
}
