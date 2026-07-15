/* eslint-disable */
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col p-8 gap-5 max-w-6xl justify-center h-full items-center mx-auto">
      <Image
        src={"/logo.svg"}
        alt="logo"
        width={256}
        height={128}
        className="absolute top-8"
      />
      <div>
        <p>
          <strong>DEAR PARENTS,</strong>
          <br />
          <br /> The future belongs to children who read before they scroll. At{" "}
          <strong>Occupy Mars</strong>, we build <strong>Slate</strong> — a
          calm, paper-like reading world for ages 2 to 10. No feeds, no ads, no
          tracking. Just stories worth finishing, on a screen that feels like a
          page. We believe attention is the most valuable thing a child owns,
          and we're building the one device that protects it. Less screen, more
          slate.
          <br />
          <br /> — <strong>Occupy Mars</strong>, makers of <strong>Slate</strong>
          <br />
          <br />
          P.S. →
          <Link
            href="mailto:hello@occupymars.co.in?subject=Hello%20Occupy%20Mars"
            className="mx-2"
          >
            hello@occupymars.co.in
          </Link>
        </p>
      </div>
    </main>
  );
}
