/**
 * Loading state for Essex County location pages
 */

export default function Loading() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Loading Skeleton */}
      <div className="animate-pulse">
        {/* Hero Section Skeleton */}
        <div className="bg-blue-900 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="h-12 bg-blue-800 rounded-lg mb-6 mx-auto w-3/4"></div>
              <div className="h-6 bg-blue-800 rounded-lg mb-8 mx-auto w-2/3"></div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="h-14 w-40 bg-blue-800 rounded-lg"></div>
                <div className="h-14 w-40 bg-blue-800 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Sections Skeleton */}
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="h-8 bg-gray-200 rounded-lg mb-12 mx-auto w-1/2"></div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-100 rounded"></div>
                    <div className="h-4 bg-gray-100 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-100 rounded w-4/6"></div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-100 rounded"></div>
                    <div className="h-4 bg-gray-100 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-100 rounded w-4/6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid Skeleton */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="h-8 bg-gray-200 rounded-lg mb-12 mx-auto w-1/2"></div>
              <div className="grid md:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg p-6 shadow">
                    <div className="h-12 w-12 bg-gray-200 rounded-full mx-auto mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-100 rounded"></div>
                    <div className="h-4 bg-gray-100 rounded w-5/6 mt-2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
