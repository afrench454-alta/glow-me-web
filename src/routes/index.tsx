import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Glow Me Tan Studio" },
      { name: "description", content: "Spray tans in Kingaroy. After-hours, mobile, and an organic option." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteShell>
      <main className="wrap">
        <section className="hero">
          <div>
            <p className="kicker">Kingaroy spray tans</p>
            <h1>Glow Me Tan Studio</h1>
            <p className="lede">
              After-hours appointments, a mobile service, and an organic option. Custom colour, finished
              with setting powder.
            </p>
            <div className="hero-actions">
              <Link className="btn gold" to="/contact">
                Book a glow
              </Link>
              <Link className="btn ghost" to="/about">
                About the studio
              </Link>
            </div>
          </div>
          <figure className="hero-card">
            <img
              src="/glow/og.jpg"
              width={1080}
              height={1920}
              alt="Effortless elegance. Custom formula and setting powder for a natural, reliable result."
              fetchPriority="high"
            />
          </figure>
        </section>
        <div className="pills">
          <div className="pill">
            <strong>Kingaroy</strong>
            <span>Home studio and mobile</span>
          </div>
          <div className="pill">
            <strong>After hours</strong>
            <span>Usual hours from 4pm</span>
          </div>
          <div className="pill">
            <strong>Mobile</strong>
            <span>The glow comes to you</span>
          </div>
          <div className="pill">
            <strong>Organic option</strong>
            <span>For sensitive skin</span>
          </div>
        </div>
        <section className="block">
          <p className="kicker">Services</p>
          <h2>Our services</h2>
          <div className="services">
            <article className="service">
              <img src="/glow/signature.jpg" width={1200} height={800} alt="Glow Me Signature Tan" loading="lazy" />
              <div>
                <h3>Glow Me Signature Tan</h3>
                <p className="price">$40</p>
                <p>
                  Achieve a flawless, natural-looking glow with our premium spray tans. Simply choose your
                  desired look, and our technician will customize the perfect shade just for you.
                </p>
              </div>
            </article>
            <article className="service">
              <img src="/glow/formals.jpg" width={1200} height={1200} alt="Formals spray tan" loading="lazy" />
              <div>
                <h3>Formals</h3>
                <p className="price">$35 students in salon</p>
                <p className="price">$45 mobile service</p>
                <p>We can tailor the colour to suit you for your special night.</p>
              </div>
            </article>
            <article className="service">
              <img src="/glow/parties.jpeg" width={1200} height={800} alt="Mobile glow party" loading="lazy" />
              <div>
                <h3>Mobile Glow Parties</h3>
                <p className="price">$50pp</p>
                <p>
                  Host a memorable and fun tanning party with your friends. A flawless, sun-kissed glow
                  brought to your home. Perfect for bridal showers, hens parties, or a girls' night in.
                  Special group discounts.
                </p>
              </div>
            </article>
            <article className="service">
              <img src="/glow/brides.jpeg" width={1200} height={800} alt="Bridal spray tan" loading="lazy" />
              <div>
                <h3>Blushing Brides</h3>
                <p className="price">$60 bride · $50 per bridesmaid</p>
                <p>
                  Mobile or in salon. A flawless, natural glow for the big day. Planning a trial? It can
                  double as your hens night. Gather the bridal party for a full glow up.
                </p>
              </div>
            </article>
          </div>
        </section>
        <section className="block split">
          <img
            className="frame"
            src="/glow/logo.jpg"
            width={638}
            height={926}
            alt="Spray tan machine at Glow Me"
            loading="lazy"
          />
          <div>
            <p className="kicker">Hours</p>
            <h2>After hours, on purpose</h2>
            <div className="note">
              <p>Mon–Fri: 4pm–10pm usual hours.</p>
              <p>Saturday: 9pm</p>
              <p>Sunday: by request</p>
              <p>Feel free to request a time that works for you.</p>
            </div>
            <div className="hero-actions">
              <Link className="btn gold" to="/contact">
                Book a glow
              </Link>
              <Link className="btn ghost" to="/about">
                About us
              </Link>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
