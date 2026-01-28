"use client";

import {
  FaTicketAlt,
  FaCheckCircle,
  FaMoneyBillWave,
  FaMicroscope,
  FaFire,
  FaHandHoldingUsd,
} from "react-icons/fa";

const steps = [
  {
    step: "Step 1",
    title: "Evaluation of Pledge Ticket",
    desc: "We begin by evaluating your pledged gold after coordinating with the financial institution to understand the pledge details and settlement requirements.",
    icon: FaTicketAlt,
  },
  {
    step: "Step 2",
    title: "Physical Verification",
    desc: "A physical verification is conducted to authenticate the pledged gold documents and confirm the asset details or address if required.",
    icon: FaCheckCircle,
  },
  {
    step: "Step 3",
    title: "Get Advance Amount",
    desc: "After verifying the pledged gold, we make an advance payment directly to the financial institution and initiate the release of your pledged gold.",
    icon: FaMoneyBillWave,
  },
  {
    step: "Step 4",
    title: "Purity Test",
    desc: "Once released, the gold is tested using KARAT METER (XRF Technology) and other advanced methods in your presence to ensure transparency and accuracy.",
    icon: FaMicroscope,
  },
  {
    step: "Step 5",
    title: "Melt for Better Value",
    desc: "The gold is melted and weighed in front of you to determine the precise value, ensuring you receive the best possible market rate for your jewellery.",
    icon: FaFire,
  },
  {
    step: "Step 6",
    title: "Receive Balance Amount",
    desc: "After purity verification and valuation, the remaining amount is transferred instantly to your account, completing a smooth and secure transaction.",
    icon: FaHandHoldingUsd,
  },
];

export default function HowItWorksPledge() {
  return (
    <section className="bg-gradient-to-r from-primary via-yellow-200 to-yellow-500 py-4 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-white text-xl font-bold flex items-center gap-3">
            HOW IT WORKS
            <span className="w-16 h-[2px] bg-yellow-400"></span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white  border-2 border-yellow-400 rounded-xl p-6 shadow-md hover:shadow-xl transition duration-300"
              >
                <span className="inline-block text-xs bg-gray-100 px-3 py-1 rounded-full mb-4 text-gray-500">
                  {item.step}
                </span>
                <div className=" flex center gap-2">
                <div className="text-yellow-500 text-4xl mb-4">
                  <Icon />
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
