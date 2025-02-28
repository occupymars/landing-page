import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col p-8 gap-5 max-w-5xl justify-center h-full items-center mx-auto">
      <Image
        src={"/logo.svg"}
        alt="logo"
        width={256}
        height={128}
        className="absolute top-8"
      />
      <div>
        <p className="text-center">Hello,</p>
      </div>
      <div className="space-y-2">
        <p className="text-center">
          I am Vikas, the founder of Occupy Mars Private Limited.
        </p>
        <p className="text-center">
          We are a leading technology and media company based in India. We
          specialise in services ranging from custom software development,
          talent outsourcing, strategy consulting and much more. If you are
          looking to work with us, please reach out at
          <Link
            href={"mailto:vikas@occupymars.co.in?subject=Business%20Inquiry"}
            className="underline"
          >
            {" "}
            vikas@occupymars.co.in
          </Link>
        </p>
        <p className="text-center">
          For all other quires, contact{" "}
          <Link
            href={"mailto:support@occupymars.co.in?subject=General%20Inquiry"}
            className="underline"
          >
            support@occupymars.co.in
          </Link>
        </p>
      </div>
      <div>
        <p className="text-center">Regards</p>
        <p className="text-center">Vikas Chahar (Founder/Director)</p>
      </div>
    </main>
  );
}
