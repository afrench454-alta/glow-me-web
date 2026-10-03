export const SERVICES = [
  "Glow Me Signature Tan",
  "Formals",
  "Mobile Glow Party",
  "Blushing Brides",
  "Skin range enquiry",
] as const;

export const PLACES = ["Home studio", "Mobile"] as const;

export type ServiceName = (typeof SERVICES)[number];
export type PlaceName = (typeof PLACES)[number];

export type BookingRequestInput = {
  name: string;
  email: string;
  phone: string;
  service: string;
  place: string;
  preferredDate: string;
  preferredTime: string;
  partySize: string;
  suburb: string;
  note: string;
};

export type BookingRequestErrors = Partial<
  Record<"name" | "email" | "phone" | "service" | "place" | "preferredDate" | "preferredTime" | "suburb", string>
>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateBookingRequest(input: BookingRequestInput): BookingRequestErrors {
  const errors: BookingRequestErrors = {};
  if (input.name.trim().length < 2) errors.name = "Enter your name.";
  if (!EMAIL.test(input.email.trim())) errors.email = "Enter a valid email address.";
  if (input.phone.replace(/\D/g, "").length < 8) errors.phone = "Enter a phone number.";
  if (!SERVICES.includes(input.service as ServiceName)) errors.service = "Choose a service.";
  if (!PLACES.includes(input.place as PlaceName)) errors.place = "Choose studio or mobile.";
  if (!input.preferredDate) errors.preferredDate = "Choose a date.";
  if (!input.preferredTime) errors.preferredTime = "Choose a time.";
  if (input.place === "Mobile" && input.suburb.trim().length < 2) {
    errors.suburb = "Enter the suburb for a mobile tan.";
  }
  return errors;
}

export function prepMessage(input: {
  name: string;
  service: string;
  place: string;
  preferredDate: string;
  preferredTime: string;
  suburb: string;
}): string {
  const where = input.place === "Mobile" ? `mobile in ${input.suburb.trim()}` : "the home studio";
  return [
    `Hi ${input.name.trim()}, Glow Me has you down for ${input.service} on ${input.preferredDate} at ${input.preferredTime} (${where}).`,
    "Please exfoliate the day before, skip lotion, deodorant and makeup on the areas being tanned, and wear loose dark clothing.",
    "Reply to confirm this time. The studio address is sent once the booking is confirmed.",
  ].join(" ");
}
