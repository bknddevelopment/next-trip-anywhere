export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-4">Tailwind CSS Test Page</h1>

        <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            If you see styled content, Tailwind is working!
          </h2>
          <p className="text-gray-600 mb-4">
            This card should have white background, rounded corners, and shadow.
          </p>

          <div className="flex gap-4">
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
              Blue Button
            </button>
            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
              Green Button
            </button>
            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
              Red Button
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-orange-100 p-4 rounded-lg border-2 border-orange-300">
            <h3 className="font-bold text-orange-800">Orange Card</h3>
            <p className="text-orange-600">Testing custom colors</p>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg border-2 border-blue-300">
            <h3 className="font-bold text-blue-800">Blue Card</h3>
            <p className="text-blue-600">Testing grid layout</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg border-2 border-green-300">
            <h3 className="font-bold text-green-800">Green Card</h3>
            <p className="text-green-600">Testing responsiveness</p>
          </div>
        </div>
      </div>
    </div>
  )
}
