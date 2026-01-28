"use client";

import { FaHandHoldingUsd, FaFlask, FaFire, FaUniversity } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import { useRouter } from 'next/navigation';

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const componentRef = useRef(null);
   const router = useRouter();

  useEffect(() => {
    // Create Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        // When component is visible in viewport
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          
          // Start the step-by-step animation
          let currentStep = 0;
          const interval = setInterval(() => {
            setActiveStep((prev) => {
              const nextStep = prev + 1;
              if (nextStep > 4) {
                clearInterval(interval);
                return 4;
              }
              return nextStep;
            });
            currentStep++;
            
            // Stop the interval after all steps are done
            if (currentStep >= 4) {
              clearInterval(interval);
            }
          }, 800); // Adjust timing between steps here
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of component is visible
        rootMargin: "0px 0px -50px 0px", // Adjust trigger point
      }
    );

    // Start observing the component
    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    // Cleanup
    return () => {
      if (componentRef.current) {
        observer.unobserve(componentRef.current);
      }
    };
  }, [hasStarted]); // Only re-run if hasStarted changes

  const steps = [
    {
      icon: <FaHandHoldingUsd className="text-primary text-2xl" />,
      text: "Bring your gold",
      number: "01",
    },
    {
      icon: <FaFlask className="text-primary text-2xl" />,
      text: "Purity testing",
      number: "02",
    },
    {
      icon: <FaFire className="text-primary text-2xl" />,
      text: "Melting for better value",
      number: "03",
    },
    {
      icon: <FaUniversity className="text-primary text-2xl" />,
      text: "Instant account transfer",
      number: "04",
    },
  ];

   const handleKnowMoreClick = () => {
    router.push('/sellGold');
  };
  return (
    <div ref={componentRef} className="">
      {/* Outer Card */}
      <div className="bg-black rounded-2xl p-6 text-white h-full flex flex-col">
        {/* Title */}
        <h3 className="text-lg md:text-lg font-semibold mb-6">
          Sell gold for instant money:
        </h3>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-[200px]">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`
                relative bg-white rounded-xl p-4 flex items-center justify-between max-h-[80px]
                ${hasStarted && activeStep > index ? "opacity-100" : "opacity-0"}
                transition-all duration-700
                ${hasStarted && activeStep === index + 1 ? "animate-step-entry" : ""}
              `}
              style={{
                transform: hasStarted && activeStep === index + 1 ? "none" : "scale(1)",
              }}
            >
              {hasStarted && activeStep > index ? (
                <>
                  <div className="flex items-center gap-3">
                    {step.icon}
                    <span className="text-gray-800 text-sm">{step.text}</span>
                  </div>
                  <span className="absolute right-4 text-4xl font-bold text-amber-300 opacity-60">
                    {step.number}
                  </span>
                </>
              ) : (
                // Optional: Show invisible placeholder to maintain layout
                <div className="invisible">
                  <div className="flex items-center gap-3">
                    <div className="text-primary text-2xl">•</div>
                    <span className="text-gray-800 text-sm">Placeholder</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="mt-6 pt-4">
          <button className="bg-primary hover:bg-[#c9a858] text-[#163f6b] text-sm font-semibold px-6 py-2 rounded-lg transition"  onClick={handleKnowMoreClick}>
            KNOW MORE
          </button>
        </div>
      </div>
        </div>
  );
}