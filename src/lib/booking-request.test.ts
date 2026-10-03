import assert from "node:assert/strict";
import test from "node:test";
import { prepMessage, validateBookingRequest } from "./booking-request.ts";

const complete = {
  name: "Alex",
  email: "alex@example.com",
  phone: "0400 111 222",
  service: "Glow Me Signature Tan",
  place: "Home studio",
  preferredDate: "2026-10-09",
  preferredTime: "17:00",
  partySize: "",
  suburb: "",
  note: "",
};

test("requires the fields a spray tan request actually needs", () => {
  const errors = validateBookingRequest({ ...complete, name: " ", phone: "12", place: "Mobile", suburb: "" });
  assert.equal(errors.name, "Enter your name.");
  assert.equal(errors.phone, "Enter a phone number.");
  assert.equal(errors.suburb, "Enter the suburb for a mobile tan.");
  assert.deepEqual(validateBookingRequest(complete), {});
});

test("prep text is ready to copy, not shown to the client", () => {
  const text = prepMessage({
    name: "Alex",
    service: "Formals",
    place: "Mobile",
    preferredDate: "2026-10-09",
    preferredTime: "18:30",
    suburb: "Kingaroy",
  });
  assert.match(text, /Formals/);
  assert.match(text, /mobile in Kingaroy/);
  assert.match(text, /exfoliate/);
});
