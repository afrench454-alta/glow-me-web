import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/skin-range", label: "Skin range" },
  { to: "/contact", label: "Contact" },
  { to: "/login", label: "Sign in" },
] as const;

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <>
      <a className="skip" href="#content">
        Skip to content
      </a>
      <header className="site-header">
        <div className="wrap nav">
          <Link className="brand" to="/" onClick={() => setOpen(false)}>
            <img src="/glow/portrait.png" alt="" width={900} height={900} />
            <div>
              <strong>Glow Me</strong>
              <span>Tan Studio</span>
            </div>
          </Link>
          <nav id="site-nav" className={open ? "nav-links open" : "nav-links"} aria-label="Studio">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                aria-current={pathname === item.to ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <a className="btn nav-call" href="tel:+61400856532">
            <span className="call-long">0400 856 532</span>
            <span className="call-short">Call</span>
          </a>
          <button
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls="site-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </header>
      <div id="content">{children}</div>
      <footer className="site-footer">
        <div className="wrap foot">
          <div>
            <strong>Glow Me Tan Studio</strong>
            <p>
              <a href="tel:+61400856532">0400 856 532</a>
              {" · "}
              <a href="mailto:glowme.after5@gmail.com">glowme.after5@gmail.com</a>
            </p>
            <p>Kingaroy, Qld · ABN 15219585352</p>
          </div>
          <div>
            <a href="https://instagram.com/glowmehomestudio" rel="noreferrer">
              Instagram
            </a>
            {" · "}
            <a
              href="https://maps.google.com/maps?q=Kingaroy%2C%20Queensland%2C%20Australia"
              rel="noreferrer"
            >
              Map
            </a>
            {" · "}
            <Link to="/contact">Contact</Link>
            {" · "}
            <Link to="/login">Sign in</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
