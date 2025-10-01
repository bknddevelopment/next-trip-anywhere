/**
 * Reusable loading skeleton components for lazy-loaded sections
 * Provides better UX during component hydration
 */

export const CardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-4/6"></div>
  </div>
)

export const SectionSkeleton = () => (
  <div className="py-16 bg-gray-50 animate-pulse">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto mb-12"></div>
        <div className="space-y-6">
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  </div>
)

export const FormSkeleton = () => (
  <div className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
    <div className="h-6 bg-gray-300 rounded w-1/3 mb-6"></div>
    <div className="space-y-4">
      <div className="h-12 bg-gray-200 rounded"></div>
      <div className="h-12 bg-gray-200 rounded"></div>
      <div className="h-32 bg-gray-200 rounded"></div>
      <div className="h-12 bg-blue-200 rounded"></div>
    </div>
  </div>
)

export const TableSkeleton = () => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
    <div className="h-12 bg-blue-200"></div>
    <div className="p-4 space-y-3">
      <div className="h-16 bg-gray-100 rounded"></div>
      <div className="h-16 bg-gray-50 rounded"></div>
      <div className="h-16 bg-gray-100 rounded"></div>
      <div className="h-16 bg-gray-50 rounded"></div>
      <div className="h-16 bg-gray-100 rounded"></div>
    </div>
  </div>
)

export const FAQSkeleton = () => (
  <div className="space-y-4 animate-pulse">
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="h-6 bg-gray-300 rounded w-4/5 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
    </div>
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
    </div>
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="h-6 bg-gray-300 rounded w-4/5 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
    </div>
  </div>
)

export const GridSkeleton = ({ items = 3 }: { items?: number }) => (
  <div className="grid md:grid-cols-3 gap-8">
    {Array.from({ length: items }).map((_, index) => (
      <CardSkeleton key={index} />
    ))}
  </div>
)

export const PricingSkeleton = () => (
  <div className="py-16 bg-blue-900 text-white animate-pulse">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="h-8 bg-white/20 rounded w-1/3 mx-auto mb-6"></div>
        <div className="bg-white/10 rounded-lg p-8">
          <div className="h-6 bg-white/20 rounded w-1/4 mx-auto mb-2"></div>
          <div className="h-12 bg-white/30 rounded w-1/2 mx-auto mb-4"></div>
          <div className="h-6 bg-white/20 rounded w-1/3 mx-auto"></div>
        </div>
      </div>
    </div>
  </div>
)

export const HeroImageSkeleton = () => (
  <div className="relative w-full h-[400px] bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse">
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-gray-400 border-t-gray-600 rounded-full animate-spin"></div>
    </div>
  </div>
)

export const ContentSkeleton = () => (
  <div className="prose prose-lg max-w-none animate-pulse">
    <div className="h-6 bg-gray-200 rounded w-full mb-3"></div>
    <div className="h-6 bg-gray-200 rounded w-11/12 mb-3"></div>
    <div className="h-6 bg-gray-200 rounded w-full mb-3"></div>
    <div className="h-6 bg-gray-200 rounded w-10/12 mb-6"></div>

    <div className="h-8 bg-gray-300 rounded w-1/3 mb-4 mt-8"></div>
    <div className="h-6 bg-gray-200 rounded w-full mb-3"></div>
    <div className="h-6 bg-gray-200 rounded w-11/12 mb-3"></div>
    <div className="h-6 bg-gray-200 rounded w-full mb-3"></div>
  </div>
)
