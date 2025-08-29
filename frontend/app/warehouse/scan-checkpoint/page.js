import Link from "next/link"

export default function ScanCheckpoint() {
  const checkpointData = {
    productName: "Organic Apples",
    batch: "BATCH001",
    currentLocation: "Warehouse A - Section 3",
    timestamp: "2024-01-20 14:30:00",
    temperature: "4°C",
    humidity: "65%",
    status: "In Transit",
    nextDestination: "Distribution Center B",
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkpoint Scan</h1>
          <p className="text-gray-600">Product checkpoint information and status update.</p>
        </header>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">{checkpointData.productName}</h2>
            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
              {checkpointData.status}
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Location Information</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-600">Batch Number:</span>
                  <p className="text-gray-900">{checkpointData.batch}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Current Location:</span>
                  <p className="text-gray-900">{checkpointData.currentLocation}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Scan Time:</span>
                  <p className="text-gray-900">{checkpointData.timestamp}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Next Destination:</span>
                  <p className="text-gray-900">{checkpointData.nextDestination}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Environmental Conditions</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-600">Temperature:</span>
                  <p className="text-gray-900">{checkpointData.temperature}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Humidity:</span>
                  <p className="text-gray-900">{checkpointData.humidity}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-green-50 rounded-lg">
            <p className="text-green-800 font-medium">✓ Checkpoint scan completed successfully</p>
            <p className="text-green-600 text-sm mt-1">
              Product location and status have been updated in the blockchain.
            </p>
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <Link href="/warehouse/dashboard" className="text-orange-600 hover:underline">
            Back to Dashboard
          </Link>
          <Link href="/" className="text-orange-600 hover:underline">
            Home
          </Link>
        </div>
      </div>
    </div>
  )
}
