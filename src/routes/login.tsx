import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  const [pending, setPending] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <SiteShell>
      <main className="wrap">
        <section className="panel">
          <p className="kicker">Studio desk</p>
          <h1>Owner sign in</h1>
          <p className="lede">Requests from the booking page open here after you sign in.</p>
          {authEnabled ? (
            <div className="hero-actions">
              {GROK_PROVIDERS.map((provider) => (
                <button
                  key={provider.providerId}
                  className="btn gold"
                  type="button"
                  disabled={pending !== null}
                  onClick={() => {
                    setError(null);
                    setPending(provider.providerId);
                    void signIn(provider.providerId, { callbackURL: "/desk", errorCallbackURL: "/login" }).catch(
                      (err: unknown) => {
                        setPending(null);
                        setError(err instanceof Error ? err.message : "Sign-in failed. Try again.");
                      },
                    );
                  }}
                >
                  {pending === provider.providerId ? "Opening…" : `Continue with ${provider.label}`}
                </button>
              ))}
            </div>
          ) : (
            <p>Sign-in is not available yet.</p>
          )}
          {error ? (
            <p className="form-error" role="alert">
              {error}
            </p>
          ) : null}
          <p>
            <Link className="btn ghost" to="/">
              Back to the studio
            </Link>
          </p>
        </section>
      </main>
    </SiteShell>
  );
}
