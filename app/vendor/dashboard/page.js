import Link from "next/link"

export default function VendorDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Vendor Dashboard</h1>
          <p className="text-gray-600">Welcome! Scan products to verify their authenticity and details.</p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Scan Product</h2>
            <p className="text-gray-600 mb-6">
              Use your device camera to scan product QR codes and view detailed information.
            </p>
            <Link href="/vendor/product-details">
              <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                Start Scanning
              </button>
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Scans</h2>
            <p className="text-gray-600 mb-6">View your recent product verification history.</p>
            <button className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors">
              View History
            </button>
          </div>
        </div>

        <div className="mt-8">
          <Link href="/" className="text-green-600 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
