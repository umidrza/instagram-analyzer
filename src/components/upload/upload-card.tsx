export default function UploadCard() {
  return (
    <div className="w-full max-w-lg rounded-xl border border-neutral-800 bg-neutral-900 p-8">
      <h2 className="text-2xl font-bold">
        Upload Instagram ZIP
      </h2>

      <p className="mt-2 text-neutral-400">
        Your data never leaves your browser.
      </p>

      <button className="mt-8 w-full rounded-lg bg-blue-600 py-3 font-semibold hover:bg-blue-500 transition">
        Choose ZIP
      </button>
    </div>
  );
}