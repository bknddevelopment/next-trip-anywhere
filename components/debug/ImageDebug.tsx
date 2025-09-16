'use client'

import { useEffect, useState } from 'react'
import OptimizedImage from '@/components/ui/OptimizedImage'
import { getBasePath, getRuntimeBasePath, normalizePath } from '@/lib/basePath'

/**
 * Debug component to verify image loading on GitHub Pages
 * This component helps diagnose path issues
 */
export default function ImageDebug() {
  const [runtimeInfo, setRuntimeInfo] = useState<{
    pathname: string
    basePath: string
    runtimeBasePath: string
    logoPath: string
  } | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const logoPath = normalizePath('/images/NextTripAnywhere.PNG', true)
      setRuntimeInfo({
        pathname: window.location.pathname,
        basePath: getBasePath(),
        runtimeBasePath: getRuntimeBasePath(),
        logoPath: logoPath,
      })
    }
  }, [])

  if (!runtimeInfo) {
    return <div>Loading debug info...</div>
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white/90 backdrop-blur p-4 rounded-lg shadow-lg max-w-md text-xs font-mono">
      <h3 className="font-bold mb-2 text-sm">Image Debug Info</h3>
      <div className="space-y-1">
        <div>
          <span className="text-gray-600">Pathname:</span>{' '}
          <span className="text-blue-600">{runtimeInfo.pathname}</span>
        </div>
        <div>
          <span className="text-gray-600">Base Path:</span>{' '}
          <span className="text-green-600">{runtimeInfo.basePath || '(none)'}</span>
        </div>
        <div>
          <span className="text-gray-600">Runtime Base:</span>{' '}
          <span className="text-purple-600">{runtimeInfo.runtimeBasePath || '(none)'}</span>
        </div>
        <div>
          <span className="text-gray-600">Logo Path:</span>{' '}
          <span className="text-orange-600">{runtimeInfo.logoPath}</span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t">
        <div className="text-gray-600 mb-1">Test Image:</div>
        <div className="w-24 h-12 relative bg-gray-100 rounded">
          <OptimizedImage
            src="/images/NextTripAnywhere.PNG"
            alt="Debug Test"
            fill
            className="object-contain"
          />
        </div>
      </div>

      <div className="mt-2 text-[10px] text-gray-500">
        {process.env.NODE_ENV === 'production' ? '🚀 Production' : '🔧 Development'}
      </div>
    </div>
  )
}
