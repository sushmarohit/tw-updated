'use client';

export default function GlobalError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
          <div className="max-w-md w-full text-center">
            <h1 className="text-4xl font-bold text-navy-500 mb-4">500</h1>
            <h2 className="text-2xl text-gray-700 mb-4">Server Error</h2>
            <p className="text-gray-600 mb-8">
              Something went wrong on our end. Please try again later.
            </p>
            <button
              onClick={reset}
              className="px-6 py-3 bg-gold-300 text-white rounded-lg font-semibold hover:bg-gold-400 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}

