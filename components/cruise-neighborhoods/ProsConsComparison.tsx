'use client'

import { NeighborhoodPro, NeighborhoodCon } from '@/lib/data/cruise-neighborhoods'

interface ProsConsComparisonProps {
  prosAndCons: {
    pros: NeighborhoodPro[]
    cons: NeighborhoodCon[]
  }
}

export default function ProsConsComparison({ prosAndCons }: ProsConsComparisonProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Pros */}
      <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <svg className="w-8 h-8 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <h3 className="text-xl font-semibold text-green-800">Advantages</h3>
        </div>
        <div className="space-y-4">
          {prosAndCons.pros.map((pro, index) => (
            <div key={index} className="border-l-4 border-green-400 pl-4">
              <div className="font-semibold text-green-900">{pro.point}</div>
              <p className="text-gray-700 text-sm mt-1">{pro.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Cons */}
      <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <svg className="w-8 h-8 text-red-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <h3 className="text-xl font-semibold text-red-800">Considerations</h3>
        </div>
        <div className="space-y-4">
          {prosAndCons.cons.map((con, index) => (
            <div key={index} className="border-l-4 border-red-400 pl-4">
              <div className="font-semibold text-red-900">{con.point}</div>
              {con.mitigation && (
                <div className="mt-2 bg-white p-2 rounded border border-red-200">
                  <span className="text-xs font-semibold text-gray-600">Mitigation: </span>
                  <span className="text-sm text-gray-700">{con.mitigation}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
