import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-sm font-semibold text-primary">404</p>
      <h1 className="mt-2 text-2xl font-bold">This event could not be found</h1>
      <p className="mt-2 max-w-md text-sm text-muted">
        The listing may have ended, or the link is incorrect. Browse live real estate events instead.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex h-10 items-center rounded-md bg-primary px-4 text-sm font-semibold text-white"
      >
        Back to events
      </Link>
    </main>
  );
}
