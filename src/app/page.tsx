import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-65px)] items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold">
          Instagram Analyzer
        </h1>

        <p className="mt-4 text-neutral-400">
          Find unfollowers, pending requests and more.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/upload"
            className="inline-flex rounded-lg bg-blue-500 px-6 py-3 font-medium text-white transition hover:bg-blue-600"
          >
            Analyze ZIP
          </Link>

          <Link
            href="/how-to-export"
            className="inline-flex rounded-lg border border-neutral-700 px-6 py-3 font-medium transition hover:bg-neutral-900"
          >
            How to Export Data
          </Link>
        </div>
      </div>
    </main>
  );
}