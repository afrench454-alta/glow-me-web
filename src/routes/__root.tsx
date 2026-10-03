import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { SiteShell } from "@/components/site-shell";
import { Link } from "@tanstack/react-router";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Glow Me Tan Studio" },
      { name: "description", content: "After-hours and mobile spray tans in Kingaroy." },
      { name: "theme-color", content: "#f7f1e8" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Outfit:wght@400;500;600&display=swap",
      },
    ],
  }),
  notFoundComponent: NotFound,
  component: () => (
    <html lang="en-AU" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});

function NotFound() {
  return (
    <SiteShell>
      <main className="wrap miss">
        <p className="kicker">Missing page</p>
        <h1>That page isn't here</h1>
        <p className="lede">The studio pages are home, about, the skin range, and contact.</p>
        <p>
          <Link className="btn gold" to="/">
            Back home
          </Link>
        </p>
      </main>
    </SiteShell>
  );
}
