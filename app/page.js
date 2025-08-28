import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Supply Chain Traceability Platform</h1>
          <p className="text-xl text-gray-600">
            Track products from manufacturer to consumer with blockchain-powered transparency
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">About This Project</h2>
          <p className="text-gray-600 leading-relaxed">
            This platform demonstrates a complete supply chain traceability system using QR codes and blockchain
            technology. Each stakeholder in the supply chain can track products, verify authenticity, and ensure
            transparency from production to final delivery.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Get Started</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/manufacturer/login" className="block">
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-blue-600 mb-2">Manufacturer</h3>
                <p className="text-gray-600">Create products and generate QR codes</p>
              </div>
            </Link>

            <Link href="/vendor/login" className="block">
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-green-600 mb-2">Vendor</h3>
                <p className="text-gray-600">Scan and verify product details</p>
              </div>
            </Link>

            <Link href="/warehouse/login" className="block">
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-orange-600 mb-2">Warehouse</h3>
                <p className="text-gray-600">Track checkpoint scans</p>
              </div>
            </Link>

            <Link href="/customer/scan-info" className="block">
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-purple-600 mb-2">Customer</h3>
                <p className="text-gray-600">Scan products for full traceability</p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
