import { HoverEffect } from "@/components/ui/card-hover-effect";

export default function CardHoverEffectDemo() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={features} />
    </div>
  );
}

export const features = [
  {
    title: "Real-Time Traceability",
    description:
      "Track every product from farm to fork in seconds with blockchain-powered transparency.",
    link: "#",
  },
  {
    title: "Immutable Records",
    description:
      "Every transaction is securely stored on a tamper-proof ledger, preventing fraud and data loss.",
    link: "#",
  },
  {
    title: "Faster Recalls",
    description:
      "Identify contaminated batches instantly and act within seconds instead of days.",
    link: "#",
  },
  {
    title: "Consumer Trust",
    description:
      "Boost confidence by giving end-users access to verified product origin and journey data.",
    link: "#",
  },
  {
    title: "Global Scalability",
    description:
      "Easily expand the system to support agriculture, pharmaceuticals, and global supply chains.",
    link: "#",
  },
  {
    title: "Sustainability Insights",
    description:
      "Enable eco-friendly sourcing decisions with transparent supply chain data.",
    link: "#",
  },
];
