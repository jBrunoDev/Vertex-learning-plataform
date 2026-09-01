import type { ReactNode } from "react";
import {
  Bell,
  Bookmark,
  CheckCircle2,
  Eye,
  Focus,
  HeartHandshake,
  Layers,
  LayoutGrid,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  User,
} from "lucide-react";
import { VertexLogo } from "@/components/icons/vertex-logo";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  CourseCard,
  LessonCardLesson,
  LessonCardVideo,
  ResourceCard,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Nav } from "@/components/ui/nav";
import { Pagination } from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";
import { Select } from "@/components/ui/select";
import { Status } from "@/components/ui/status";

const primarySwatches = [
  { name: "Primary 500", hex: "#F97316", className: "bg-primary-500" },
  { name: "Primary 400", hex: "#FB923C", className: "bg-primary-400" },
  { name: "Primary 300", hex: "#FDBA74", className: "bg-primary-300" },
  { name: "Primary 200", hex: "#FED7AA", className: "bg-primary-200" },
  { name: "Primary 100", hex: "#FFEDD5", className: "bg-primary-100" },
];

const neutralSwatches = [
  { name: "Neutral 900", hex: "#0F172A", className: "bg-neutral-900" },
  { name: "Neutral 700", hex: "#334155", className: "bg-neutral-700" },
  { name: "Neutral 500", hex: "#64748B", className: "bg-neutral-500" },
  { name: "Neutral 300", hex: "#CBD5E1", className: "bg-neutral-300" },
  { name: "Neutral 200", hex: "#E2E8F0", className: "bg-neutral-200" },
  { name: "Neutral 100", hex: "#F1F5F9", className: "bg-neutral-100" },
  { name: "Neutral 50", hex: "#FAFAFC", className: "bg-neutral-50 border border-neutral-200" },
  { name: "White", hex: "#FFFFFF", className: "bg-white border border-neutral-200" },
];

const typeScale = [
  {
    name: "Display 1",
    font: "Playfair Display",
    size: "48 / 56",
    weight: "Bold",
    use: "Page titles",
    className: "font-display text-display-1 font-bold",
  },
  {
    name: "Display 2",
    font: "Playfair Display",
    size: "36 / 44",
    weight: "Bold",
    use: "Section titles",
    className: "font-display text-display-2 font-bold",
  },
  {
    name: "Heading 1",
    font: "Inter",
    size: "28 / 36",
    weight: "Semi Bold",
    use: "Card titles",
    className: "text-heading-1 font-semibold",
  },
  {
    name: "Heading 2",
    font: "Inter",
    size: "22 / 30",
    weight: "Semi Bold",
    use: "Sub section",
    className: "text-heading-2 font-semibold",
  },
  {
    name: "Heading 3",
    font: "Inter",
    size: "18 / 26",
    weight: "Medium",
    use: "Small titles",
    className: "text-heading-3 font-medium",
  },
  {
    name: "Body Large",
    font: "Inter",
    size: "16 / 24",
    weight: "Regular",
    use: "Body copy",
    className: "text-body-lg",
  },
  {
    name: "Body",
    font: "Inter",
    size: "14 / 20",
    weight: "Regular",
    use: "Supporting text",
    className: "text-body",
  },
  {
    name: "Small",
    font: "Inter",
    size: "12 / 16",
    weight: "Regular",
    use: "Captions, meta",
    className: "text-small",
  },
];

const spacingScale = [4, 8, 12, 16, 24, 32, 40, 48, 64];

const radii = [
  { label: "4px", className: "rounded-xs" },
  { label: "8px", className: "rounded-sm" },
  { label: "12px", className: "rounded-md" },
  { label: "16px", className: "rounded-lg" },
  { label: "24px", className: "rounded-xl" },
  { label: "Full", className: "rounded-full" },
];

const shadows = [
  { label: "Sm", className: "shadow-sm" },
  { label: "Md", className: "shadow-md" },
  { label: "Lg", className: "shadow-lg" },
  { label: "Xl", className: "shadow-xl" },
];

const outlineIcons = [
  Search,
  Play,
  Bookmark,
  Bell,
  Star,
  User,
  LayoutGrid,
  Layers,
];

const filledIcons = [Search, Play, Bookmark, Bell, Star, User];

function Section({
  number,
  title,
  children,
  className = "",
}: {
  number: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-lg border border-neutral-200 bg-white p-6 shadow-sm ${className}`}
    >
      <div className="mb-5 flex items-center gap-2">
        <span className="text-small font-semibold tracking-wide text-primary-500 uppercase">
          {number}
        </span>
        <h2 className="text-small font-semibold tracking-wide text-neutral-500 uppercase">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

export default function DesignSystemPage() {
  return (
    <div className="min-h-full bg-neutral-50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-8 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-start">
          <div>
            <VertexLogo className="mb-6" />
            <h1 className="font-display text-display-1 font-bold text-neutral-900">
              Design System
            </h1>
            <p className="mt-3 max-w-md text-body-lg text-neutral-500">
              A unified design language for Vertex learning platform. Clean,
              modern and focused on clarity, consistency and intuitive learning
              experiences.
            </p>
            <p className="mt-6 text-small font-medium tracking-wide text-neutral-500 uppercase">
              Version 1.0 · May 2025
            </p>
          </div>

          <Section number="01" title="Colors">
            <div className="space-y-5">
              <div>
                <p className="mb-3 text-small font-medium text-neutral-500">
                  Primary
                </p>
                <div className="grid grid-cols-5 gap-3">
                  {primarySwatches.map((swatch) => (
                    <div key={swatch.hex} className="space-y-2">
                      <div
                        className={`aspect-square rounded-md ${swatch.className}`}
                      />
                      <div>
                        <p className="text-small font-medium text-neutral-900">
                          {swatch.name}
                        </p>
                        <p className="text-small text-neutral-500">
                          {swatch.hex}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-3 text-small font-medium text-neutral-500">
                  Neutral
                </p>
                <div className="grid grid-cols-4 gap-3 sm:grid-cols-8">
                  {neutralSwatches.map((swatch) => (
                    <div key={swatch.hex} className="space-y-2">
                      <div
                        className={`aspect-square rounded-md ${swatch.className}`}
                      />
                      <div>
                        <p className="text-small font-medium text-neutral-900">
                          {swatch.name}
                        </p>
                        <p className="text-small text-neutral-500">
                          {swatch.hex}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Section>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          <Section number="02" title="Typography">
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <p className="font-display text-[64px] leading-none font-bold text-neutral-900">
                  Ag
                </p>
                <p className="mt-3 font-display text-heading-3 font-bold text-neutral-900">
                  Playfair Display
                </p>
                <p className="mt-1 text-body text-neutral-500">
                  Elegant · Readable · Timeless
                </p>
              </div>
              <div>
                <p className="text-[64px] leading-none font-semibold text-neutral-900">
                  Ag
                </p>
                <p className="mt-3 text-heading-3 font-semibold text-neutral-900">
                  Inter
                </p>
                <p className="mt-1 text-body text-neutral-500">
                  Clean · Modern · Highly legible
                </p>
              </div>
            </div>
          </Section>

          <Section number="03" title="Type Scale">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px] text-left text-body">
                <thead>
                  <tr className="text-small text-neutral-500">
                    <th className="pb-3 font-medium">Style</th>
                    <th className="pb-3 font-medium">Font</th>
                    <th className="pb-3 font-medium">Size / Line Height</th>
                    <th className="pb-3 font-medium">Weight</th>
                    <th className="pb-3 font-medium">Use</th>
                  </tr>
                </thead>
                <tbody>
                  {typeScale.map((row) => (
                    <tr key={row.name} className="border-t border-neutral-100">
                      <td className={`py-2.5 ${row.className}`}>{row.name}</td>
                      <td className="py-2.5 text-neutral-500">{row.font}</td>
                      <td className="py-2.5 text-neutral-500">{row.size}</td>
                      <td className="py-2.5 text-neutral-500">{row.weight}</td>
                      <td className="py-2.5 text-neutral-500">{row.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Section number="04" title="Spacing System">
            <p className="mb-4 text-body text-neutral-500">Base unit: 4px</p>
            <div className="flex flex-wrap items-end gap-4">
              {spacingScale.map((size) => (
                <div key={size} className="flex flex-col items-center gap-2">
                  <div
                    className="rounded-sm bg-primary-200"
                    style={{ width: size, height: size }}
                  />
                  <span className="text-small text-neutral-500">{size}</span>
                </div>
              ))}
            </div>
          </Section>

          <Section number="05" title="Radius & Shadows">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="mb-3 text-small font-medium text-neutral-500">
                  Radius
                </p>
                <div className="flex flex-wrap gap-3">
                  {radii.map((item) => (
                    <div key={item.label} className="text-center">
                      <div
                        className={`size-12 border border-neutral-200 bg-neutral-50 ${item.className}`}
                      />
                      <p className="mt-2 text-small text-neutral-500">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-3 text-small font-medium text-neutral-500">
                  Shadows
                </p>
                <div className="flex flex-wrap gap-3">
                  {shadows.map((item) => (
                    <div key={item.label} className="text-center">
                      <div
                        className={`size-12 rounded-md bg-white ${item.className}`}
                      />
                      <p className="mt-2 text-small text-neutral-500">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Section>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <Section number="06" title="Icons">
            <div className="space-y-5">
              <div>
                <p className="mb-3 text-small font-medium text-neutral-500">
                  Outline Style
                </p>
                <div className="flex flex-wrap gap-3 text-neutral-700">
                  {outlineIcons.map((Icon, index) => (
                    <Icon
                      key={`outline-${index}`}
                      className="size-6"
                      strokeWidth={2}
                    />
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-3 text-small font-medium text-neutral-500">
                  Filled Style
                </p>
                <div className="flex flex-wrap gap-3 text-neutral-700">
                  {filledIcons.map((Icon, index) => (
                    <Icon
                      key={`filled-${index}`}
                      className="size-6 fill-current"
                      strokeWidth={0}
                    />
                  ))}
                </div>
              </div>
              <ul className="space-y-1 text-small text-neutral-500">
                <li>24×24px grid</li>
                <li>2px stroke width</li>
                <li>Rounded line caps</li>
                <li>Consistent optical balance</li>
              </ul>
            </div>
          </Section>

          <Section number="07" title="Buttons">
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-2 text-center text-small text-neutral-500">
                <span />
                <span>Primary</span>
                <span>Secondary</span>
                <span>Tertiary</span>
              </div>
              {(
                [
                  ["Default", false],
                  ["Hover", false],
                  ["Disabled", true],
                ] as const
              ).map(([label, disabled]) => (
                <div
                  key={label}
                  className="grid grid-cols-4 items-center gap-2"
                >
                  <span className="text-small text-neutral-500">{label}</span>
                  <Button variant="primary" disabled={disabled} className="px-3">
                    Get Started
                  </Button>
                  <Button
                    variant="secondary"
                    disabled={disabled}
                    className="px-3"
                  >
                    Explore Courses
                  </Button>
                  <Button
                    variant="tertiary"
                    disabled={disabled}
                    className="px-3"
                  >
                    View Lesson
                  </Button>
                </div>
              ))}
              <div className="grid grid-cols-4 items-center gap-2">
                <span className="text-small text-neutral-500">Text</span>
                <Button variant="text" className="px-3">
                  Watch Video
                </Button>
              </div>
              <ul className="space-y-1 text-small text-neutral-500">
                <li>Height: 44px</li>
                <li>Padding: 16px / 24px</li>
                <li>Radius: 12px</li>
                <li>Font: Inter Medium 14–16px</li>
              </ul>
            </div>
          </Section>

          <Section number="08" title="Inputs">
            <div className="space-y-4">
              <div>
                <p className="mb-2 text-small font-medium text-neutral-500">
                  Search / Text input
                </p>
                <Input
                  leadingIcon="search"
                  placeholder="Search anything..."
                  shortcut="⌘ K"
                  defaultValue=""
                />
              </div>
              <div>
                <p className="mb-2 text-small font-medium text-neutral-500">
                  Select
                </p>
                <Select defaultValue="relevant">
                  <option value="relevant">Most Relevant</option>
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                </Select>
              </div>
              <ul className="space-y-1 text-small text-neutral-500">
                <li>Height: 44px</li>
                <li>Radius: 12px</li>
                <li>Border: Neutral 200</li>
                <li>Padding: 0 16px</li>
                <li>Focus: Primary border</li>
              </ul>
            </div>
          </Section>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <Section number="09" title="Badges / Tags">
            <div className="flex flex-wrap gap-3">
              <div className="space-y-2">
                <p className="text-small text-neutral-500">Video</p>
                <Badge variant="video" />
              </div>
              <div className="space-y-2">
                <p className="text-small text-neutral-500">Lesson</p>
                <Badge variant="lesson" />
              </div>
              <div className="space-y-2">
                <p className="text-small text-neutral-500">Popular</p>
                <Badge variant="popular" />
              </div>
            </div>
          </Section>

          <Section number="10" title="Status / Indicators">
            <div className="flex flex-wrap gap-2">
              <Status variant="in-progress" />
              <Status variant="completed" />
              <Status variant="now-playing" />
              <Status variant="locked" />
            </div>
          </Section>

          <Section number="11" title="Progress Bar">
            <Progress value={35} />
          </Section>
        </div>

        <Section number="12" title="Cards" className="mt-6">
          <div className="grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="flex h-full flex-col gap-2">
              <p className="text-small text-neutral-500">Course Card</p>
              <CourseCard
                title="Next.js for Production"
                description="Build scalable, high-performance web applications with Next.js."
                level="Intermediate"
                duration="18h 24m"
                modules="12 modules"
                iconFallback="N"
              />
            </div>
            <div className="flex h-full flex-col gap-2">
              <p className="text-small text-neutral-500">Lesson Card (Video)</p>
              <LessonCardVideo
                courseName="Next.js for Production"
                title="Data Fetching in Server Components"
                description="Learn how to fetch data on the server using async/await and Next.js best practices."
                lessonLabel="Lesson 5.1"
                duration="12:45"
                startLabel="12:45"
              />
            </div>
            <div className="flex h-full flex-col gap-2">
              <p className="text-small text-neutral-500">Lesson Card (Lesson)</p>
              <LessonCardLesson
                courseName="Next.js for Production"
                title="Data Fetching & Caching"
                description="Explore different data fetching methods in Next.js and how to cache and revalidate data for optimal performance."
                moduleLabel="Module 5"
              />
            </div>
            <div className="flex h-full flex-col gap-2">
              <p className="text-small text-neutral-500">Resource Card</p>
              <ResourceCard
                title="Caching and Revalidation Guide"
                description="Deep dive into Next.js caching strategies."
                meta="PDF · 1.2 MB"
              />
            </div>
          </div>
        </Section>

        <Section number="13" title="Navigation" className="mt-6">
          <div className="space-y-6">
            <div className="overflow-hidden rounded-md border border-neutral-200">
              <Nav activeHref="/courses" />
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="mb-2 text-small text-neutral-500">Breadcrumb</p>
                <Breadcrumb
                  items={[
                    { label: "All Courses", href: "/courses" },
                    { label: "Next.js for Production", href: "/courses/next" },
                    { label: "Data Fetching & Caching" },
                  ]}
                />
              </div>
              <div>
                <p className="mb-2 text-small text-neutral-500">Pagination</p>
                <Pagination currentPage={1} totalPages={8} />
              </div>
            </div>
          </div>
        </Section>

        <Section number="14" title="Principles" className="mt-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Eye,
                title: "Clarity First",
                body: "Every element should communicate clearly.",
              },
              {
                icon: Layers,
                title: "Consistency",
                body: "Use components and patterns consistently across the platform.",
              },
              {
                icon: Focus,
                title: "Focus & Care",
                body: "Remove noise and help learners focus on what matters.",
              },
              {
                icon: ShieldCheck,
                title: "Accessible",
                body: "Design with accessibility and inclusivity in mind.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-md border border-neutral-100 bg-neutral-50 p-4"
              >
                <item.icon
                  className="mb-3 size-5 text-primary-500"
                  strokeWidth={2}
                />
                <h3 className="text-body font-semibold text-neutral-900">
                  {item.title}
                </h3>
                <p className="mt-1 text-small text-neutral-500">{item.body}</p>
              </div>
            ))}
          </div>
        </Section>

        <p className="mt-8 flex items-center justify-center gap-2 text-small text-neutral-500">
          <Sparkles className="size-3.5 text-primary-400" strokeWidth={2} />
          Built from design/vertex-designsystem.png for the Vertex learning
          platform.
          <HeartHandshake className="size-3.5 text-primary-400" strokeWidth={2} />
        </p>

        <div className="mt-4 flex justify-center gap-2 text-small text-neutral-400">
          <CheckCircle2 className="size-3.5" strokeWidth={2} />
          Tokens live in app/globals.css · Components in components/ui
        </div>
      </div>
    </div>
  );
}
