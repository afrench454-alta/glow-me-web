import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { BookingForm } from "@/components/booking-form";
import { SiteShell } from "@/components/site-shell";

const contactSearch = z.object({
  service: z.string().max(80).optional(),
});

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>) => {
    const parsed = contactSearch.safeParse(search);
    return parsed.success ? parsed.data : {};
  },
  head: () => ({
    meta: [
      { title: "Contact | Glow Me Tan Studio" },
      { name: "description", content: "Book a mobile or home-salon tan in Kingaroy." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { service } = Route.useSearch();

  return (
    <SiteShell>
      <main className="wrap">
        <section className="hero">
          <div>
            <p className="kicker">Contact</p>
            <h1>Contact us</h1>
            <p className="lede">
              Fill in the form below. Alternatively send a text with your preferred service, name, date and
              time.
            </p>
            <p className="price">
              <a href="tel:+61400856532">0400 856 532</a>
            </p>
            <p>I look forward to helping you achieve your perfect glow.</p>
            <div className="hero-actions">
              <a className="btn gold" href="tel:+61400856532">
                Call
              </a>
              <a className="btn ghost" href="sms:+61400856532">
                Text
              </a>
              <a className="btn ghost" href="https://instagram.com/glowmehomestudio" rel="noreferrer">
                Instagram
              </a>
            </div>
          </div>
          <img
            className="frame"
            src="/glow/portrait.png"
            width={900}
            height={900}
            alt="Glow Me Tan Studio mark"
          />
        </section>
        <section className="block split">
          <BookingForm initialService={service} />
          <div>
            <div className="note">
              <h2>Opening hours</h2>
              <p>Mon–Fri: 4pm–10pm usual hours.</p>
              <p>Saturday: 9pm</p>
              <p>Sunday: by request</p>
              <p>Feel free to request a time that works for you.</p>
            </div>
            <p>Address given when booking is confirmed.</p>
            <p>
              <a href="https://maps.google.com/maps?q=Kingaroy%2C%20Queensland%2C%20Australia" rel="noreferrer">
                Kingaroy on the map
              </a>
            </p>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
