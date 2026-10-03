import { createFileRoute, Link } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  return (
    <main className="wrap miss">
      <p className="kicker">Studio desk</p>
      <h1>Owner sign in</h1>
      <p className="lede">Requests from the booking page open here after you sign in.</p>
      {authEnabled ? (
        <div className="hero-actions">
          {GROK_PROVIDERS.map((provider) => (
            <button
              key={provider.providerId}
              className="btn"
              type="button"
              onClick={() => signIn(provider.providerId, { callbackURL: "/desk" })}
            >
              Continue with {provider.label}
            </button>
          ))}
        </div>
      ) : (
        <p>Sign-in is not available yet.</p>
      )}
      <p>
        <Link to="/">Back to the studio</Link>
      </p>
    </main>
  );
}
