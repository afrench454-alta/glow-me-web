import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Glow Me Tan Studio" },
      { name: "description", content: "Kingaroy tan salon. After-hours appointments and a mobile service." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <SiteShell>
      <main className="wrap">
        <section className="hero">
          <div>
            <p className="kicker">About us</p>
            <h1>More than just a tan</h1>
            <p className="lede">
              At Glow Me Tan Studio, we understand the demands of modern life, offering after-hours
              appointments and a mobile service that brings the glow to you. We finish our tans with a
              setting powder that perfectly protects and enhances the final result.
            </p>
          </div>
          <img
            className="frame"
            src="/glow/story.jpg"
            width={1017}
            height={1400}
            alt="The story behind the glow"
          />
        </section>
        <section className="block split">
          <img
            className="frame"
            src="/glow/tan-finish.jpg"
            width={1200}
            height={1214}
            alt="Tan finish with setting powder and brush"
            loading="lazy"
          />
          <div>
            <h2>Our tan</h2>
            <p>
              We offer an organic tanning option specially formulated for sensitive skin. Each solution is
              carefully selected to create a beautiful, natural-looking glow, while every tan is tailored to
              your skin tone and personal preference using expert techniques and advice.
            </p>
            <p>
              Paired with our setting powder for the perfect finish, our technique delivers flawless,
              non-sticky, streak-free results you'll love.
            </p>
          </div>
        </section>
        <section className="block split">
          <div>
            <p className="kicker">Since 2010</p>
            <h2>The story behind the glow</h2>
            <p>
              It all started with a simple passion for flawless, sun-kissed skin. As a long-time spray tan
              enthusiast, I turned my side hustle into a mobile reality back in 2010. Since launching in
              Sydney, my journey has taken me to Lake Macquarie, NSW, and now to Kingaroy, QLD — bringing a
              custom glow to clients wherever I go.
            </p>
            <p>
              With a focus on personalized care I carefully source only the finest, most natural products to
              ensure your skin stays deeply nourished, hydrated, and beautifully radiant. When you choose
              Glow Me Tan, you're getting a flawless experience tailored entirely to you.
            </p>
          </div>
          <img
            className="frame"
            src="/glow/powder.jpg"
            width={1200}
            height={821}
            alt="Setting powder finish"
            loading="lazy"
          />
        </section>
        <section className="block split">
          <img
            className="frame"
            src="/glow/portrait.png"
            width={900}
            height={900}
            alt="Glow Me Tan Studio mark"
            loading="lazy"
          />
          <div>
            <h2>Kingaroy, Qld</h2>
            <p>Home studio appointments and a mobile service across Kingaroy.</p>
            <p>
              <Link className="btn gold" to="/contact">
                Contact
              </Link>
            </p>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
