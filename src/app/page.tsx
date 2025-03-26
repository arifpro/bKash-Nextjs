import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-4 flex flex-col items-center">
      <Image
        src="/bKash-Logo.svg"
        alt="bKash Logo"
        width={100}
        height={100}
        className="mx-auto"
      />
      <h1 className="text-4xl font-bold text-center px-4">
        Welcome to bKash Next.js Integration
      </h1>
      <p className="text-center mt-4 text-lg text-gray-600 px-8">
        bKash tokenized checkout process with save wallet number and then pay
        with bKash by just pin input
      </p>

      <Link
        href="/checkout"
        className="block mt-8 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md text-center max-w-xs"
      >
        Go to checkout
      </Link>
    </div>
  );
}
