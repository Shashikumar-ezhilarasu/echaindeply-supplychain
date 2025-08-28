import Link from "next/link"

export default function WarehouseDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Warehouse Dashboard</h1>
          <p className="text-gray-600">Welcome! Track products through warehouse checkpoints.</p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Scan Checkpoint</h2>
            <p className="text-gray-600 mb-6">
              Scan products at warehouse checkpoints to update their location status.
            </p>
            <Link href="/warehouse/scan-checkpoint">
              <button className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors">
                Start Scanning
              </button>
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Inventory Status</h2>
            <p className="text-gray-600 mb-6">View current inventory levels and product locations.</p>
            <button className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors">
              View Inventory
            </button>
          </div>
        </div>

        <div className="mt-8">
          <Link href="/" className="text-orange-600 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
