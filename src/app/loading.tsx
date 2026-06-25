export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="text-center">
        <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600" />

        <h1 className="mt-6 text-2xl font-bold text-gray-900">
          Loading...
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Please wait while we prepare the page.
        </p>
      </div>
    </div>
  );
}