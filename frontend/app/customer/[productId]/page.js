"use client"

import { useParams } from "next/navigation"
import Link from "next/link"

export default function CustomerProductView() {
  const params = useParams()
  const productId = params.productId

  const traceabilityData = {
    1: {
      name: "Organic Apples",
      batch: "BATCH001",
      manufacturer: "Fresh Farm Co.",
      journey: [
        {
          stage: "Production",
          location: "Organic Farm, California",
          date: "2024-01-15",
          details: "Harvested from certified organic orchards",
          status: "completed",
        },
        {
          stage: "Quality Check",
          location: "Processing Facility",
          date: "2024-01-16",
          details: "Passed all quality and safety inspections",
          status: "completed",
        },
        {
          stage: "Packaging",
          location: "Packaging Center",
          date: "2024-01-17",
          details: "Packaged in eco-friendly materials",
          status: "completed",
        },
        {
          stage: "Warehouse",
          location: "Distribution Center A",
          date: "2024-01-18",
          details: "Stored at optimal temperature and humidity",
          status: "completed",
        },
        {
          stage: "Transport",
          location: "En route to retailer",
          date: "2024-01-19",
          details: "Temperature-controlled transport",
          status: "completed",
        },
        {
          stage: "Retail",
          location: "Local Grocery Store",
          date: "2024-01-20",
          details: "Available for purchase",
          status: "current",
        },
      ],
    },
  }

  const product = traceabilityData[productId]

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist in our system.</p>
          <Link href="/customer/scan-info" className="text-purple-600 hover:underline">
            Back to Scan Info
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <p className="text-gray-600">
            Batch: {product.batch} | Manufacturer: {product.manufacturer}
          </p>
        </header>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Product Journey</h2>

          <div className="space-y-8">
            {product.journey.map((step, index) => (
              <div key={index} className="flex items-start gap-6">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-4 h-4 rounded-full ${
                      step.status === "completed"
                        ? "bg-green-500"
                        : step.status === "current"
                          ? "bg-blue-500"
                          : "bg-gray-300"
                    }`}
                  />
                  {index < product.journey.length - 1 && <div className="w-0.5 h-16 bg-gray-200 mt-2" />}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{step.stage}</h3>
                    {step.status === "current" && (
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-1">
                    <strong>Location:</strong> {step.location}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <strong>Date:</strong> {step.date}
                  </p>
                  <p className="text-gray-700">{step.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 bg-green-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-2">✓ Verified Authentic</h3>
          <p className="text-green-700">
            This product has been verified through our blockchain-based traceability system. All checkpoints have been
            authenticated and recorded immutably.
          </p>
        </div>

        <div className="mt-8 flex gap-4">
          <Link href="/customer/scan-info" className="text-purple-600 hover:underline">
            Scan Another Product
          </Link>
          <Link href="/" className="text-purple-600 hover:underline">
            Home
          </Link>
        </div>
      </div>
    </div>
  )
}
