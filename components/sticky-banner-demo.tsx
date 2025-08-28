import { StickyBanner } from "@/components/ui/sticky-banner";

export default function StickyBannerDemo() {
  return (
    <div className="relative flex h-[60vh] w-full flex-col overflow-y-auto">
      <StickyBanner className="bg-gradient-to-b from-green-500 to-green-600">
        <p className="mx-0 max-w-[90%] text-white drop-shadow-md">
          Our blockchain-powered food traceability platform is live! Track your products from farm to table in real-time.{" "}
          <a href="#" className="transition duration-200 hover:underline">
            Explore features
          </a>
        </p>
      </StickyBanner>
      <ProjectContent />
    </div>
  );
}

const ProjectContent = () => {
  return (
    <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 py-8">
      {/* Farm to Table Traceability */}
      <div className="flex flex-col md:flex-row gap-6
