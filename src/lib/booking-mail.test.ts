import assert from "node:assert/strict";
import test from "node:test";
import { bookingMailto, validateBooking } from "./booking-mail.ts";

test("rejects an empty booking and accepts a complete one", () => {
  const empty = validateBooking({ name: " ", email: "nope", phone: "", message: "hi" });
  assert.equal(empty.name, "Enter your name.");
  assert.equal(empty.email, "Enter a valid email address.");
  assert.equal(empty.message, "Include the service, a date, and a time.");

  const ok = validateBooking({
    name: "Alex",
    email: "alex@example.com",
    phone: "",
    message: "Signature tan, Friday after 5.",
  });
  assert.deepEqual(ok, {});
});

test("mailto includes the studio address and the message", () => {
  const href = bookingMailto({
    name: "Alex",
    email: "alex@example.com",
    phone: "0400000000",
    message: "Signature tan Friday 5pm",
  });
  assert.match(href, /^mailto:glowme\.after5@gmail\.com\?/);
  assert.match(decodeURIComponent(href), /Signature tan Friday 5pm/);
  assert.match(decodeURIComponent(href), /0400000000/);
});
