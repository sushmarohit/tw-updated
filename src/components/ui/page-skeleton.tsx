export function PageSkeleton() {
  return (
    <div className="min-h-screen flex flex-col bg-white pt-16 md:pt-20">
      <div className="absolute top-0 left-0 right-0 h-16 md:h-20 bg-gray-100" aria-hidden />
      <div className="flex-1 p-4 md:p-6 lg:p-8 max-w-6xl mx-auto w-full space-y-6">
        <div className="h-8 w-3/4 max-w-md rounded-lg overflow-hidden bg-gray-100 relative">
          <ShimmerBar />
        </div>
        <div className="h-4 w-full max-w-2xl rounded-lg overflow-hidden bg-gray-100 relative">
          <ShimmerBar />
        </div>
        <div className="h-4 w-5/6 max-w-xl rounded-lg overflow-hidden bg-gray-100 relative">
          <ShimmerBar />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 pt-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 rounded-xl overflow-hidden bg-gray-100 relative">
              <ShimmerBar />
            </div>
          ))}
        </div>
        <div className="flex gap-4 pt-4">
          <div className="h-24 flex-1 rounded-xl overflow-hidden bg-gray-100 relative">
            <ShimmerBar />
          </div>
          <div className="h-24 w-1/3 rounded-xl overflow-hidden bg-gray-100 relative">
            <ShimmerBar />
          </div>
        </div>
        <div className="h-40 w-full rounded-xl overflow-hidden bg-gray-100 relative">
          <ShimmerBar />
        </div>
      </div>
    </div>
  );
}

function ShimmerBar() {
  return (
    <span
      className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer-slide"
      aria-hidden
    />
  );
}
