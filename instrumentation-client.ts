import posthog from "posthog-js";

const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;

// Local builds (dev server and `next start`) must not send events to the shared project.
const localHostnames = ["localhost", "127.0.0.1", "[::1]"];

if (token && !localHostnames.includes(window.location.hostname)) {
  posthog.init(token, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    defaults: "2026-08-30",
    capture_exceptions: true,
  });
}
