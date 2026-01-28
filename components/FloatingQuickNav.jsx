"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaCalculator, FaHandHoldingUsd, FaChartLine } from "react-icons/fa";
import KnowTodaysGoldRateModal from '../components/KnowTodaysGoldRateModal'

export default function FloatingQuickNav() {
  const router = useRouter();
   const [open, setOpen] = useState(false);

  const items = [
    {
      label: "Old Gold Calculator",
      icon: <FaCalculator />,
      path: "/old-gold-calculator",
    },
    {
      label: "Pledged Gold Calculator",
      icon: <FaHandHoldingUsd />,
      path: "/pledged-gold-calculator",
    },
    {
      label: "Today's Gold Rate",
      icon: <FaChartLine />,
      action: "OPEN_GOLD_RATE_MODAL",
    },
  ];

  return (
    <div className="fixed left-0 top-1/2 z-50 flex flex-col items-start gap-3">
      {items.map((item, index) => (
        <button
          key={index}
          onClick={() => {
  if (item.action === "OPEN_GOLD_RATE_MODAL") {
    setOpen(true);
  } else {
    router.push(item.path);
  }
}}
          className="group flex items-center justify-start 
                     bg-gradient-to-r from-yellow-600 via-yellow-300 to-yellow-600 text-black 
                     h-12 w-12 hover:w-60 
                     rounded-r-full 
                     transition-all duration-300 ease-in-out
                     overflow-hidden shadow-lg
                     hover:pl-2"
        >
          {/* Icon */}
          <div className="flex items-center justify-center w-12 text-lg text-white flex-shrink-0">
            {item.icon}
          </div>

          {/* Text */}
          <span
            className="ml-2 whitespace-nowrap text-sm font-medium
                       opacity-0 group-hover:opacity-100
                       transition-opacity duration-200
                       flex-shrink-0"
          >
            {item.label}
          </span>
        </button>
      ))}
      
      <KnowTodaysGoldRateModal isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
}