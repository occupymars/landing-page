/* eslint-disable */
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-16 px-6 py-16 sm:py-24">
      <header>
        <Image
          src={"/logo-ink.svg"}
          alt="Occupy Mars"
          width={182}
          height={28}
        />
        <p className="eyebrow mt-3">Makers of Slate</p>
      </header>

      <section>
        <h1 className="text-4xl sm:text-5xl">Dear parents,</h1>
        <div className="mt-6 space-y-4 leading-relaxed text-ink-soft">
          <p>
            The future belongs to children who read before they scroll. At{" "}
            <strong className="text-ink">Occupy Mars</strong>, we build{" "}
            <Link
              href="https://slatekids.com"
              className="text-ink underline underline-offset-4"
            >
              Slate
            </Link>{" "}
            — a calm, paper-like reading world for ages 2 to 10. No feeds, no
            ads, no tracking. Just stories worth finishing, on a screen that
            feels like a page. We believe attention is the most valuable thing
            a child owns, and we&rsquo;re building the one device that protects
            it. Less screen, more slate.
          </p>
          <p>
            — <strong className="text-ink">Occupy Mars</strong>, makers of{" "}
            <Link
              href="https://slatekids.com"
              className="text-ink underline underline-offset-4"
            >
              Slate
            </Link>
          </p>
          <p>
            P.S. →{" "}
            <Link
              href="mailto:hello@occupymars.co.in?subject=Hello%20Occupy%20Mars"
              className="text-ink underline underline-offset-4"
            >
              hello@occupymars.co.in
            </Link>
          </p>
        </div>
      </section>

      <section className="border-t border-line pt-12">
        <p className="eyebrow">Our product</p>
        <h2 className="mt-3 text-2xl">Slate</h2>
        <div className="mt-4 space-y-4 leading-relaxed text-ink-soft">
          <p>
            Slate turns a parent&rsquo;s Android phone into a single-purpose
            learning device for children aged 2 to 10 — a library of classic
            tales, each told for their age, on a quiet, paper-like screen. No
            internet. No profiles. No infinite scroll. Less screen time. More
            slate time.
          </p>
          <p>
            Learn more at{" "}
            <Link
              href="https://slatekids.com"
              className="text-ink underline underline-offset-4"
            >
              slatekids.com
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="border-t border-line pt-12">
        <p className="eyebrow">The company</p>
        <h2 className="mt-3 text-2xl">Occupy Mars Private Limited</h2>
        <p className="mt-4 leading-relaxed text-ink-soft">
          Occupy Mars Private Limited is an Indian technology company
          registered in Jaipur, Rajasthan, and the maker of Slate. We design
          software that protects children&rsquo;s attention instead of
          competing for it.
        </p>
      </section>

      <section className="border-t border-line pt-12">
        <p className="eyebrow">Contact</p>
        <p className="mt-4 leading-relaxed text-ink-soft">
          Occupy Mars Private Limited
          <br />
          Jaipur, Rajasthan, India
          <br />
          <Link
            href="mailto:hello@occupymars.co.in?subject=Hello%20Occupy%20Mars"
            className="text-ink underline underline-offset-4"
          >
            hello@occupymars.co.in
          </Link>
        </p>
      </section>

      <footer className="flex flex-col gap-2 border-t border-line pt-6 text-xs text-ink-faint">
        <p>
          © 2026 Occupy Mars Private Limited · CIN: U72900RJ2021PTC073913 ·{" "}
          <Link href="/privacy" className="underline underline-offset-4">
            Privacy Policy
          </Link>
        </p>
        <p>No feeds · no ads · we track nothing about your child.</p>
      </footer>
    </main>
  );
}
