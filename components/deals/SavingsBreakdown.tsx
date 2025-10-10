interface SavingItem {
  icon: string
  title: string
  description: string
  highlight: string
}

interface SavingsBreakdownProps {
  savings: SavingItem[]
}

export default function SavingsBreakdown({ savings }: SavingsBreakdownProps) {
  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Your Exclusive Savings Package
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stack these incredible savings and perks to maximize your cruise value
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {savings.map((saving, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-orange-500"
            >
              {/* Icon */}
              <div className="text-5xl mb-4">{saving.icon}</div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {saving.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 mb-4 leading-relaxed">
                {saving.description}
              </p>

              {/* Highlight Badge */}
              <div className="inline-block bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold">
                {saving.highlight}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 bg-blue-900 text-white rounded-xl p-8 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Plus: Loyalty Bonus for Returning Guests
          </h3>
          <p className="text-xl mb-6">
            Previous cruisers save an additional <span className="font-bold text-yellow-400">$200 instant savings</span> on top of these offers!
          </p>
          <p className="text-sm opacity-90">
            *Subject to cruise line loyalty program membership and offer eligibility
          </p>
        </div>
      </div>
    </section>
  )
}
