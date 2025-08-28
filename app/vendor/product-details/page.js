import Link from "next/link"

export default function ProductDetails() {
  const productData = {
    name: "Organic Apples",
    batch: "BATCH001",
    manufacturer: "Fresh Farm Co.",
    manufactureDate: "2024-01-15",
    expiryDate: "2024-02-15",
    ingredients: "Fresh Organic Apples",
    certifications: ["Organic Certified", "Non-GMO"],
    status: "Verified",
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Details</h1>
          <p className="text-gray-600">Scanned product information and verification status.</p>
        </header>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">{productData.name}</h2>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              {productData.status}
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-600">Batch Number:</span>
                  <p className="text-gray-900">{productData.batch}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Manufacturer:</span>
                  <p className="text-gray-900">{productData.manufacturer}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Manufacture Date:</span>
                  <p className="text-gray-900">{productData.manufactureDate}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Expiry Date:</span>
                  <p className="text-gray-900">{productData.expiryDate}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-600">Ingredients:</span>
                  <p className="text-gray-900">{productData.ingredients}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Certifications:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {productData.certifications.map((cert, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <Link href="/vendor/dashboard" className="text-green-600 hover:underline">
            Back to Dashboard
          </Link>
          <Link href="/" className="text-green-600 hover:underline">
            Home
          </Link>
        </div>
      </div>
    </div>
  )
}
