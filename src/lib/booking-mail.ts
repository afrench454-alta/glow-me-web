export const STUDIO_EMAIL = "glowme.after5@gmail.com";

export type BookingDraft = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export type BookingField = "name" | "email" | "message";
export type FieldErrors = Partial<Record<BookingField, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateBooking(draft: BookingDraft): FieldErrors {
  const errors: FieldErrors = {};
  if (draft.name.trim().length < 2) errors.name = "Enter your name.";
  if (!EMAIL.test(draft.email.trim())) errors.email = "Enter a valid email address.";
  if (draft.message.trim().length < 8) {
    errors.message = "Include the service, a date, and a time.";
  }
  return errors;
}

export function bookingMailto(draft: BookingDraft): string {
  const subject = `Glow booking — ${draft.name.trim()}`;
  const lines = [
    `Name: ${draft.name.trim()}`,
    `Email: ${draft.email.trim()}`,
    draft.phone.trim() ? `Phone: ${draft.phone.trim()}` : "",
    "",
    draft.message.trim(),
  ];
  const body = lines.filter((line, index) => line !== "" || index > 2).join("\n");
  return `mailto:${STUDIO_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
