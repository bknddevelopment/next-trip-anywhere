interface Upgrade {
  name: string
  description: string
  features: string[]
  value: string
}

interface UpgradePackagesProps {
  upgrades: Upgrade[]
}

export default function UpgradePackages({ upgrades }: UpgradePackagesProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Enhance Your Cruise Experience
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Add premium packages to make your vacation truly unforgettable
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {upgrades.map((upgrade, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 border border-blue-100"
            >
              {/* Header */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {upgrade.name}
                </h3>
                <p className="text-gray-600 mb-3">{upgrade.description}</p>
                <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold">
                  {upgrade.value}
                </div>
              </div>

              {/* Features List */}
              <ul className="space-y-3">
                {upgrade.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <svg
                      className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div className="mt-12 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg max-w-4xl mx-auto">
          <div className="flex items-start gap-4">
            <svg className="w-8 h-8 text-yellow-600 flex-shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="font-bold text-gray-900 mb-2 text-lg">
                Bundle & Save Even More
              </h4>
              <p className="text-gray-700">
                Ask your travel advisor about package bundles that combine multiple upgrades at a discounted rate.
                Some cruise lines offer all-inclusive packages that include beverages, Wi-Fi, specialty dining,
                and gratuities for one low price.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
