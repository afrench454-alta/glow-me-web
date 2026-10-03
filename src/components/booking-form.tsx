import { useState } from "react";
import { validateBookingRequest, type BookingRequestErrors, type BookingRequestInput } from "@/lib/booking-request";
import { placeOptions, serviceOptions, submitBookingRequest } from "@/lib/studio.functions";

const EMPTY: BookingRequestInput = {
  name: "",
  email: "",
  phone: "",
  service: "",
  place: "Home studio",
  preferredDate: "",
  preferredTime: "",
  partySize: "",
  suburb: "",
  note: "",
};

export function BookingForm({ initialService = "" }: { initialService?: string }) {
  const [draft, setDraft] = useState<BookingRequestInput>({
    ...EMPTY,
    service: initialService === "skin-range" ? "Skin range enquiry" : "",
  });
  const [errors, setErrors] = useState<BookingRequestErrors>({});
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState(false);
  const [pending, setPending] = useState(false);

  function update(field: keyof BookingRequestInput, value: string) {
    setDraft((current) => ({ ...current, [field]: value }));
    setSent(false);
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validateBookingRequest(draft);
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setPending(true);
    setFailed(false);
    try {
      const result = await submitBookingRequest({ data: draft });
      if (!result.ok) {
        setErrors(result.errors);
        return;
      }
      setSent(true);
    } catch {
      setFailed(true);
    } finally {
      setPending(false);
    }
  }

  if (sent) {
    return (
      <div className="confirm" role="status">
        <h2>Request received</h2>
        <p>We'll confirm by text or email.</p>
        <a className="btn ghost" href="sms:+61400856532">
          Text instead
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      {failed ? (
        <div className="form-alert" role="alert">
          <p>That request did not send. Try again, or text the studio.</p>
        </div>
      ) : null}
      <label htmlFor="booking-name">Name</label>
      <input id="booking-name" name="name" autoComplete="name" value={draft.name} onChange={(e) => update("name", e.target.value)} />
      {errors.name ? <p className="field-error">{errors.name}</p> : null}
      <label htmlFor="booking-phone">Phone</label>
      <input id="booking-phone" name="phone" type="tel" autoComplete="tel" value={draft.phone} onChange={(e) => update("phone", e.target.value)} />
      {errors.phone ? <p className="field-error">{errors.phone}</p> : null}
      <label htmlFor="booking-email">Email</label>
      <input id="booking-email" name="email" type="email" autoComplete="email" value={draft.email} onChange={(e) => update("email", e.target.value)} />
      {errors.email ? <p className="field-error">{errors.email}</p> : null}
      <label htmlFor="booking-service">Service</label>
      <select id="booking-service" value={draft.service} onChange={(e) => update("service", e.target.value)}>
        <option value="">Choose</option>
        {serviceOptions.map((service) => (
          <option key={service}>{service}</option>
        ))}
      </select>
      {errors.service ? <p className="field-error">{errors.service}</p> : null}
      <label htmlFor="booking-place">Where</label>
      <select id="booking-place" value={draft.place} onChange={(e) => update("place", e.target.value)}>
        {placeOptions.map((place) => (
          <option key={place}>{place}</option>
        ))}
      </select>
      {draft.place === "Mobile" ? (
        <>
          <label htmlFor="booking-suburb">Suburb</label>
          <input id="booking-suburb" value={draft.suburb} onChange={(e) => update("suburb", e.target.value)} />
          {errors.suburb ? <p className="field-error">{errors.suburb}</p> : null}
        </>
      ) : null}
      <label htmlFor="booking-date">Preferred date</label>
      <input id="booking-date" type="date" value={draft.preferredDate} onChange={(e) => update("preferredDate", e.target.value)} />
      {errors.preferredDate ? <p className="field-error">{errors.preferredDate}</p> : null}
      <label htmlFor="booking-time">Preferred time</label>
      <input id="booking-time" type="time" value={draft.preferredTime} onChange={(e) => update("preferredTime", e.target.value)} />
      {errors.preferredTime ? <p className="field-error">{errors.preferredTime}</p> : null}
      {draft.service === "Mobile Glow Party" || draft.service === "Blushing Brides" ? (
        <>
          <label htmlFor="booking-party">How many people</label>
          <input id="booking-party" inputMode="numeric" value={draft.partySize} onChange={(e) => update("partySize", e.target.value)} />
        </>
      ) : null}
      <label htmlFor="booking-note">Anything we should know</label>
      <textarea id="booking-note" rows={4} value={draft.note} onChange={(e) => update("note", e.target.value)} />
      <button className="btn" type="submit" disabled={pending}>
        {pending ? "Sending" : "Request a time"}
      </button>
    </form>
  );
}
