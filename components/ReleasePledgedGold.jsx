"use client";

import {
  FaFileAlt,
  FaShieldAlt,
  FaHandHoldingUsd,
  FaMicroscope,
  FaHammer,
  FaMoneyCheckAlt,
} from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import { useRouter } from 'next/navigation';

export default function ReleasePledgedGold() {
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
              if (nextStep > 6) {
                clearInterval(interval);
                return 6;
              }
              return nextStep;
            });
            currentStep++;
            
            // Stop the interval after all steps are done
            if (currentStep >= 6) {
              clearInterval(interval);
            }
          }, 600); // Faster animation than previous component
        }
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -50px 0px",
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
  }, [hasStarted]);

  const steps = [
    {
      icon: <FaFileAlt />,
      title: "Evaluation of Pledge Ticket",
      number: "01",
      animation: "slide-from-left",
    },
    {
      icon: <FaShieldAlt />,
      title: "Physical Verification",
      number: "02",
      animation: "slide-from-right",
    },
    {
      icon: <FaHandHoldingUsd />,
      title: "Get an Advance Amount",
      number: "03",
      animation: "slide-from-bottom",
    },
    {
      icon: <FaMicroscope />,
      title: "Purity Test",
      number: "04",
      animation: "zoom-in",
    },
    {
      icon: <FaHammer />,
      title: "Melt for Better Value",
      number: "05",
      animation: "flip-in",
    },
    {
      icon: <FaMoneyCheckAlt />,
      title: "Receive the Balance Amount",
      number: "06",
      animation: "bounce-in",
    },
  ];

   const handleKnowMoreClick = () => {
    router.push('/releaseGold');
  };
  return (
    <div ref={componentRef} className="h-full">
      {/* Outer Container */}
      <div className="bg-white rounded-2xl p-6 h-full flex flex-col">
        {/* Title */}
        <h3 className="text-black text-lg md:text-lg font-semibold mb-6">
          Release Pledged Gold
        </h3>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              icon={step.icon}
              title={step.title}
              number={step.number}
              isVisible={hasStarted && activeStep > index}
              animation={step.animation}
              isAnimating={hasStarted && activeStep === index + 1}
            />
          ))}
        </div>

        {/* Button with animation */}
        <div className="mt-6 pt-4">
          <button 
            className={`
              bg-primary hover:bg-[#092646] text-black text-sm font-semibold px-6 py-2 rounded-lg 
              transition-all duration-300 transform hover:scale-105 active:scale-95
              ${hasStarted && activeStep >= 6 ? 'animate-button-pulse' : 'opacity-0'}
            `}  onClick={handleKnowMoreClick}
          >
            KNOW MORE
          </button>
        </div>
      </div>

      {/* CSS for the animations */}
      <style jsx global>{`
        /* Slide from left */
        @keyframes slideFromLeft {
          0% {
            opacity: 0;
            transform: translateX(-50px) scale(0.8);
          }
          70% {
            opacity: 1;
            transform: translateX(10px) scale(1.05);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        /* Slide from right */
        @keyframes slideFromRight {
          0% {
            opacity: 0;
            transform: translateX(50px) scale(0.8);
          }
          70% {
            opacity: 1;
            transform: translateX(-10px) scale(1.05);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        /* Slide from bottom */
        @keyframes slideFromBottom {
          0% {
            opacity: 0;
            transform: translateY(50px) scale(0.8);
          }
          70% {
            opacity: 1;
            transform: translateY(-10px) scale(1.05);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Zoom in */
        @keyframes zoomIn {
          0% {
            opacity: 0;
            transform: scale(0.3) rotate(-10deg);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1) rotate(5deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0);
          }
        }

        /* Flip in */
        @keyframes flipIn {
          0% {
            opacity: 0;
            transform: perspective(400px) rotateY(90deg) scale(0.5);
          }
          70% {
            opacity: 1;
            transform: perspective(400px) rotateY(-10deg) scale(1.05);
          }
          100% {
            opacity: 1;
            transform: perspective(400px) rotateY(0) scale(1);
          }
        }

        /* Bounce in */
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3) translateY(100px);
          }
          50% {
            opacity: 1;
            transform: scale(1.05) translateY(-20px);
          }
          70% {
            transform: scale(0.95) translateY(10px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        /* Button pulse animation */
        @keyframes buttonPulse {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          70% {
            opacity: 1;
            transform: scale(1.05);
            box-shadow: 0 0 0 10px rgba(201, 168, 88, 0.2);
          }
          100% {
            opacity: 1;
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(201, 168, 88, 0);
          }
        }

        /* Animation classes */
        .animate-slide-from-left {
          animation: slideFromLeft 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        .animate-slide-from-right {
          animation: slideFromRight 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        .animate-slide-from-bottom {
          animation: slideFromBottom 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        .animate-zoom-in {
          animation: zoomIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        .animate-flip-in {
          animation: flipIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        .animate-bounce-in {
          animation: bounceIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        .animate-button-pulse {
          animation: buttonPulse 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        /* Number glow effect */
        .step-number {
          position: relative;
        }

        .step-number::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 60px;
          height: 60px;
          background: radial-gradient(circle, rgba(255,215,0,0.2) 0%, rgba(255,215,0,0) 70%);
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .step-number.animate-glow::after {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}

/* Enhanced Step Card with animations */
const StepCard = ({ icon, title, number, isVisible, animation, isAnimating }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`
        relative bg-black rounded-xl px-4 py-4 flex items-center justify-between 
        max-h-[80px] min-h-[80px] overflow-hidden
        transition-all duration-300 transform
        ${isVisible ? 'opacity-100' : 'opacity-0'}
        ${isHovered ? 'scale-105 shadow-2xl shadow-primary/20' : 'scale-100'}
        ${isAnimating ? `animate-${animation}` : ''}
      `}
      style={{
        transition: isHovered ? 'all 0.3s ease' : 'none',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background effect */}
      <div 
        className={`
          absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent
          transition-all duration-500
          ${isHovered ? 'opacity-100' : 'opacity-0'}
        `}
      />

      {/* Content */}
      <div className="flex items-center gap-3 text-primary relative z-10">
        <span 
          className={`
            text-2xl transition-all duration-300
            ${isHovered ? 'scale-125 text-yellow-400' : 'scale-100'}
          `}
        >
          {icon}
        </span>
        <span className="text-sm text-white z-10 font-medium transition-all duration-300">
          {title}
        </span>
      </div>

      {/* Animated number */}
      <span 
        className={`
          absolute right-4 text-4xl font-bold text-gray-800 step-number
          transition-all duration-300
          ${isHovered ? 'text-yellow-400 animate-glow' : ''}
          ${isAnimating ? 'scale-110' : 'scale-100'}
        `}
      >
        {number}
      </span>

      {/* Hover effect line */}
      <div 
        className={`
          absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-yellow-400
          transform transition-all duration-300
          ${isHovered ? 'translate-y-0' : 'translate-y-full'}
        `}
      />
    </div>
  );
};