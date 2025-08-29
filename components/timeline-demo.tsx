import React from "react";
import { Timeline } from "@/components/ui/timeline";

export default function TimelineDemo() {
  const data = [
    {
      title: "Farm Origin",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-gray-300 md:text-sm dark:text-gray-300">
            Product harvested from certified organic farm with sustainable practices. Quality verified and blockchain record created.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/placeholder.jpg"
              alt="farm origin"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(0,_0,_0,_0.8)] border border-gray-600 md:h-44 lg:h-60"
            />
            <img
              src="/placeholder.jpg"
              alt="quality check"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(0,_0,_0,_0.8)] border border-gray-600 md:h-44 lg:h-60"
            />
          </div>
          <div className="mt-4">
            <p className="text-xs text-gray-400 dark:text-gray-400">📍 Location: Organic Valley Farm, California</p>
            <p className="text-xs text-gray-400 dark:text-gray-400">🕐 Date: January 15, 2024</p>
            <p className="text-xs text-gray-400 dark:text-gray-400">✅ Certifications: USDA Organic, Fair Trade</p>
          </div>
        </div>
      ),
    },
    {
      title: "Processing",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-gray-300 md:text-sm dark:text-gray-300">
            Product processed at certified facility following strict quality standards. Temperature controlled environment maintained throughout.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/placeholder.jpg"
              alt="processing facility"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(0,_0,_0,_0.8)] border border-gray-600 md:h-44 lg:h-60"
            />
            <img
              src="/placeholder.jpg"
              alt="quality control"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(0,_0,_0,_0.8)] border border-gray-600 md:h-44 lg:h-60"
            />
          </div>
          <div className="mt-4">
            <p className="text-xs text-gray-400 dark:text-gray-400">📍 Location: GreenTech Processing Plant, Oregon</p>
            <p className="text-xs text-gray-400 dark:text-gray-400">🕐 Date: January 18, 2024</p>
            <p className="text-xs text-gray-400 dark:text-gray-400">🌡️ Temperature: 2-4°C maintained</p>
          </div>
        </div>
      ),
    },
    {
      title: "Distribution",
      content: (
        <div>
          <p className="mb-4 text-xs font-normal text-gray-300 md:text-sm dark:text-gray-300">
            Product distributed through verified supply chain partners with real-time tracking.
          </p>
          <div className="mb-8">
            <div className="flex items-center gap-2 text-xs text-gray-300 md:text-sm dark:text-gray-300">
              ✅ Cold chain maintained
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-300 md:text-sm dark:text-gray-300">
              ✅ GPS tracking active
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-300 md:text-sm dark:text-gray-300">
              ✅ Quality checkpoints passed
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-300 md:text-sm dark:text-gray-300">
              ✅ Delivery confirmation received
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/placeholder.jpg"
              alt="distribution center"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(0,_0,_0,_0.8)] border border-gray-600 md:h-44 lg:h-60"
            />
            <img
              src="/placeholder.jpg"
              alt="delivery truck"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(0,_0,_0,_0.8)] border border-gray-600 md:h-44 lg:h-60"
            />
          </div>
          <div className="mt-4">
            <p className="text-xs text-gray-400 dark:text-gray-400">📍 Route: Oregon → Nevada → California</p>
            <p className="text-xs text-gray-400 dark:text-gray-400">🕐 Transit Time: 2 days</p>
            <p className="text-xs text-gray-400 dark:text-gray-400">🚛 Vehicle ID: TR-4387</p>
          </div>
        </div>
      ),
    },
    {
      title: "Retail",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-gray-300 md:text-sm dark:text-gray-300">
            Product arrived at retail location and is ready for purchase. All quality standards maintained throughout the journey.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/placeholder.jpg"
              alt="retail store"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(0,_0,_0,_0.8)] border border-gray-600 md:h-44 lg:h-60"
            />
            <img
              src="/placeholder.jpg"
              alt="product display"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(0,_0,_0,_0.8)] border border-gray-600 md:h-44 lg:h-60"
            />
          </div>
          <div className="mt-4">
            <p className="text-xs text-gray-400 dark:text-gray-400">📍 Location: FreshMart Store #247, Los Angeles</p>
            <p className="text-xs text-gray-400 dark:text-gray-400">🕐 Arrival: January 22, 2024</p>
            <p className="text-xs text-gray-400 dark:text-gray-400">💰 Price: $12.99</p>
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
}
