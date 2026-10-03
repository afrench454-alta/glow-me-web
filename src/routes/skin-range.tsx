import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";

export const Route = createFileRoute("/skin-range")({
  head: () => ({
    meta: [
      { title: "Glow Me Skin Range | Glow Me Tan Studio" },
      { name: "description", content: "Glow Me Skin Range is sold out and coming soon." },
    ],
  }),
  component: SkinRange,
});

function SkinRange() {
  return (
    <SiteShell>
      <main className="wrap product">
        <img
          className="frame"
          src="/glow/product.jpg"
          width={900}
          height={752}
          alt="Glow Me Collective mark for the skin range"
        />
        <div>
          <p className="badge">Sold out · coming soon</p>
          <h1>Glow Me Skin Range</h1>
          <p className="price">$12.00</p>
          <p>
            The range is not available to order from this page yet. Ask the studio and they can tell you
            when it is back.
          </p>
          <p>
            <Link className="btn" to="/contact" search={{ service: "skin-range" }}>
              Ask about the range
            </Link>
          </p>
        </div>
      </main>
    </SiteShell>
  );
}
