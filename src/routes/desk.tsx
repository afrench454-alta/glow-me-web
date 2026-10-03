import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { RedirectToSignIn, SignedIn, SignedOut, UserButton } from "@/lib/auth/gates";
import { prepMessage } from "@/lib/booking-request";
import { loadDesk, saveShadeNote, setRequestStatus, type DeskRequest } from "@/lib/studio.functions";

export const Route = createFileRoute("/desk")({
  component: Desk,
});

function Desk() {
  return (
    <main className="wrap miss">
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <DeskBoard />
      </SignedIn>
    </main>
  );
}

function DeskBoard() {
  const [requests, setRequests] = useState<DeskRequest[] | null>(null);
  const [allowed, setAllowed] = useState(true);
  const [role, setRole] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  async function refresh() {
    const result = await loadDesk();
    setAllowed(result.allowed);
    setRole(result.role);
    setRequests(result.requests);
  }

  useEffect(() => {
    refresh().catch(() => setRequests([]));
  }, []);

  if (!allowed) {
    return (
      <>
        <h1>Studio desk</h1>
        <p>This desk already has an owner.</p>
        <UserButton />
      </>
    );
  }

  return (
    <>
      <p className="kicker">Studio desk</p>
      <h1>Requests</h1>
      <p className="lede">Booking requests open a client record here. Confirm, then copy the prep text to send.</p>
      <div className="hero-actions">
        <UserButton />
        <Link className="btn ghost" to="/">
          Studio site
        </Link>
      </div>
      {requests === null ? <p>Loading requests.</p> : null}
      {requests?.length === 0 ? <p>No requests yet. They appear when someone uses the booking form.</p> : null}
      <div className="services">
        {requests?.map((request) => (
          <article className="service" key={request.id}>
            <div>
              <p className="kicker">{request.status}</p>
              <h2>{request.clientName}</h2>
              <p>
                {request.service} · {request.place}
                {request.suburb ? ` · ${request.suburb}` : ""}
                {request.partySize ? ` · ${request.partySize} people` : ""}
              </p>
              <p>
                {request.preferredDate} at {request.preferredTime}
              </p>
              <p>
                <a href={`tel:${request.phone}`}>{request.phone}</a>
                {" · "}
                <a href={`mailto:${request.email}`}>{request.email}</a>
              </p>
              {request.note ? <p>{request.note}</p> : null}
              <label htmlFor={`shade-${request.clientId}`}>Shade note</label>
              <textarea
                id={`shade-${request.clientId}`}
                rows={2}
                defaultValue={request.shadeNote}
                onBlur={(event) => {
                  void saveShadeNote({ data: { clientId: request.clientId, shadeNote: event.target.value } });
                }}
              />
              <div className="hero-actions">
                <button className="btn gold" type="button" onClick={() => void setRequestStatus({ data: { id: request.id, status: "confirmed" } }).then(refresh)}>
                  Confirm
                </button>
                <button className="btn" type="button" onClick={() => void setRequestStatus({ data: { id: request.id, status: "done" } }).then(refresh)}>
                  Done
                </button>
                <button className="btn ghost" type="button" onClick={() => void setRequestStatus({ data: { id: request.id, status: "declined" } }).then(refresh)}>
                  Decline
                </button>
                <button
                  className="btn ghost"
                  type="button"
                  onClick={() => {
                    const text = prepMessage({ ...request, name: request.clientName });
                    void navigator.clipboard.writeText(text).then(() => setCopied(request.id));
                  }}
                >
                  {copied === request.id ? "Copied" : "Copy prep text"}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
