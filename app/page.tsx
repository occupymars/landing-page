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
          <strong>DEAR BUILDERS,</strong>
          <br />
          <br /> The future belongs to teams that ship faster, break fewer
          things, and outpace technical debt. At <strong>Occupy Mars</strong>,
          we design backends that scale without drama. Just engineers who've
          shipped at scale, ready to untangle legacy systems and build code that
          survives tomorrow. Let's build something that endures.
          <br />
          <br /> — <strong>Occupy Mars</strong>
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
