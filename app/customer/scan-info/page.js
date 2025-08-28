import Link from "next/link"

export default function ScanInfo() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Traceability</h1>
          <p className="text-gray-600">Scan QR codes to trace your product's journey from farm to table.</p>
        </header>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">How to Scan</h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-purple-100 text-purple-600 rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Find the QR Code</h3>
                <p className="text-gray-600">Look for the QR code on your product packaging or label.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-purple-100 text-purple-600 rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Open Camera App</h3>
                <p className="text-gray-600">Use your smartphone's camera app or any QR code scanner.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-purple-100 text-purple-600 rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Scan and View</h3>
                <p className="text-gray-600">Point your camera at the QR code and tap the link that appears.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Try a Sample</h2>
          <p className="text-gray-600 mb-6">Experience the full traceability journey with our sample product.</p>
          <Link href="/customer/1">
            <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">
              View Sample Product Journey
            </button>
          </Link>
        </div>

        <div className="mt-8">
          <Link href="/" className="text-purple-600 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
