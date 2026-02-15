'use client';

export function RouteLoadingOverlay() {
  return (
    <div className="absolute inset-0 flex flex-col bg-white" aria-hidden="true">
      <div className="flex-1 p-4 md:p-6 lg:p-8 max-w-6xl mx-auto w-full space-y-6">
        {/* Title shimmer */}
        <div className="h-8 w-3/4 max-w-md rounded-lg overflow-hidden bg-gray-100">
          <Shimmer />
        </div>
        <div className="h-4 w-full max-w-2xl rounded-lg overflow-hidden bg-gray-100">
          <Shimmer />
        </div>
        <div className="h-4 w-5/6 max-w-xl rounded-lg overflow-hidden bg-gray-100">
          <Shimmer />
        </div>

        {/* Block shimmers */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 pt-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 rounded-xl overflow-hidden bg-gray-100 relative">
              <Shimmer />
            </div>
          ))}
        </div>

        <div className="flex gap-4 pt-4">
          <div className="h-24 flex-1 rounded-xl overflow-hidden bg-gray-100 relative">
            <Shimmer />
          </div>
          <div className="h-24 w-1/3 rounded-xl overflow-hidden bg-gray-100 relative">
            <Shimmer />
          </div>
        </div>

        <div className="h-40 w-full rounded-xl overflow-hidden bg-gray-100 relative">
          <Shimmer />
        </div>
      </div>
    </div>
  );
}

function Shimmer() {
  return (
    <div className="absolute inset-0 -translate-x-full animate-shimmer-slide bg-gradient-to-r from-transparent via-white/60 to-transparent" />
  );
}
