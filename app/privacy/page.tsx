/* eslint-disable */
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Occupy Mars",
  description:
    "How Occupy Mars Private Limited handles data on occupymars.co.in — which is to say, barely at all.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto flex max-w-2xl flex-col px-6 py-16 sm:py-24">
      <Link href="/" aria-label="Occupy Mars home">
        <Image
          src={"/logo-ink.svg"}
          alt="Occupy Mars"
          width={182}
          height={28}
        />
      </Link>

      <h1 className="mt-10 text-4xl">Privacy, kept short.</h1>
      <p className="mt-4 text-sm text-ink-faint">
        This policy covers this website, occupymars.co.in, operated by Occupy
        Mars Private Limited. Our product, Slate, has its own policy at{" "}
        <Link
          href="https://slatekids.com/privacy"
          className="text-ink underline underline-offset-4"
        >
          slatekids.com/privacy
        </Link>
        .
      </p>
      <p className="mt-2 text-xs text-ink-faint">Last updated: 16 July 2026.</p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-ink-soft">
        <section>
          <h2 className="text-lg">What we collect</h2>
          <p className="mt-2">
            Nothing, actively. This website has no accounts, no forms, no
            analytics, no advertising, and sets no tracking cookies. If you
            email us, we receive what you send and use it only to reply.
          </p>
        </section>

        <section>
          <h2 className="text-lg">Hosting</h2>
          <p className="mt-2">
            The site is served by our hosting provider, which may keep
            standard, short-lived server logs (such as IP address and request
            time) for security and reliability. We do not use these logs to
            identify visitors.
          </p>
        </section>

        <section>
          <h2 className="text-lg">Children&rsquo;s privacy</h2>
          <p className="mt-2">
            This website is meant for parents and partners, not children, and
            collects nothing from anyone. Our approach in the Slate app is the
            same by construction: no child profiles, no behavioural data, no
            tracking.
          </p>
        </section>

        <section>
          <h2 className="text-lg">Your rights (DPDP Act)</h2>
          <p className="mt-2">
            Under India&rsquo;s Digital Personal Data Protection Act, you can
            ask us to show, correct, or delete any data we hold about you (for
            this site, that is at most our email correspondence), and withdraw
            consent, at any time. Email{" "}
            <Link
              href="mailto:support@occupymars.co.in?subject=Privacy%20Request"
              className="text-ink underline underline-offset-4"
            >
              support@occupymars.co.in
            </Link>{" "}
            and we&rsquo;ll act promptly.
          </p>
        </section>

        <section>
          <h2 className="text-lg">Changes</h2>
          <p className="mt-2">
            If anything here changes, we&rsquo;ll update this page and the date
            above.
          </p>
        </section>
      </div>

      <p className="mt-12 border-t border-line pt-6 text-xs text-ink-faint">
        Occupy Mars Private Limited · Jaipur, Rajasthan, India · Questions?{" "}
        <Link
          href="mailto:support@occupymars.co.in"
          className="underline underline-offset-4"
        >
          support@occupymars.co.in
        </Link>
      </p>
    </main>
  );
}
