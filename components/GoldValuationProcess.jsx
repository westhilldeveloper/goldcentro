"use client";

import { useState, useEffect, useRef } from 'react';
import { FaArrowRight, FaCheck, FaCoins, FaGem, FaShower, FaBalanceScale, FaSearchDollar } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const GoldValuationProcess = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayIntervalRef = useRef(null);

  const steps = [
    {
      id: 0,
      title: "Visit the Gold Centro",
      description: "Customers give their Gold to Multioot Gold Point for valuation",
      icon: <FaGem className="text-4xl text-yellow-500" />,
      color: "from-purple-200  via-white to-purple-200",
      image: "/images/process1.jpg",
      details: "Walk into any of our certified gold points with your gold items. Our trained professionals will guide you through the process."
    },
    {
      id: 1,
      title: "Gold Cleaning",
      description: "All dirt is removed from your Gold with ultrasonic machines in front of you",
      icon: <FaShower className="text-4xl text-blue-500" />,
      color: "from-blue-200 via-white to-blue-200",
      image: "/images/process2.jpg",
      details: "Your gold is thoroughly cleaned using ultrasonic technology to remove any dirt, oil, or impurities, ensuring accurate valuation."
    },
    {
      id: 2,
      title: "Gold Valuation",
      description: "Value, weight & purity of Gold is checked on advanced XRF machines in front of you",
      icon: <FaSearchDollar className="text-4xl text-green-500" />,
      color: "from-green-200 via-white to-green-200",
      image: "/images/process3.jpg",
      details: "Advanced XRF (X-ray fluorescence) machines analyze your gold's purity and weight with precision. You can watch the entire process."
    },
    {
      id: 3,
      title: "Gold Rating",
      description: "Gold is valued as per the current market price",
      icon: <FaBalanceScale className="text-4xl text-yellow-600" />,
      color: "from-yellow-200 via-white to-yellow-200",
      image: "/images/process4.jpg",
      details: "Based on current live gold rates and purity assessment, we provide you with a fair market value for your gold."
    },
    {
      id: 4,
      title: "Get an Instant Payment",
      description: "Get up to Rs 10,000 as cash. Amounts higher than Rs 10,000 instantly paid to your bank account via NEFT/IMPS/RTGS",
      icon: <FaCoins className="text-4xl text-emerald-500" />,
      color: "from-emerald-200 via-white to-emerald-200",
      image: "/images/process5.jpg",
      details: "Receive immediate payment! Up to ₹10,000 in cash, or instant bank transfer for higher amounts via NEFT, IMPS, or RTGS."
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayIntervalRef.current = setInterval(() => {
        setActiveStep(prevStep => (prevStep + 1) % steps.length);
      }, 3000); // Change step every 3 seconds
    } else {
      clearInterval(autoPlayIntervalRef.current);
    }

    return () => {
      clearInterval(autoPlayIntervalRef.current);
    };
  }, [isAutoPlaying, steps.length]);

  // Pause auto-play when user interacts with step buttons
  const handleStepClick = (index) => {
    setActiveStep(index);
    setIsAutoPlaying(false); // Pause auto-play when user manually selects a step
    
    // Optionally resume auto-play after a delay
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 10000); // Resume after 10 seconds
  };

  const goToNextStep = () => {
    setIsAutoPlaying(false); // Pause auto-play on manual navigation
    setActiveStep(prevStep => (prevStep + 1) % steps.length);
  };

  const goToPrevStep = () => {
    setIsAutoPlaying(false); // Pause auto-play on manual navigation
    setActiveStep(prevStep => (prevStep - 1 + steps.length) % steps.length);
  };

  // Auto-play toggle button
  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
    <div className="w-full px-4 py-12">
      {/* Header Section */}
      <div className="w-full mb-6 flex flex-col items-center">
        <div className="w-full max-w-4xl flex flex-col items-center">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 w-full text-center">
            How It <span className="text-yellow-600">Works</span>
          </h2>
          <div className="w-full flex justify-center">
            <p className="text-gray-600 text-md md:text-lg max-w-3xl text-center">
              Sell Your Gold in Quick & Easy Steps with Transparency!
            </p>
          </div>
        </div>
      </div>

      {/* Auto-play Controls */}
      {/* <div className="flex justify-center mb-2">
        <button
          onClick={toggleAutoPlay}
          className="flex items-center gap-2 px-4 py-2  hover:text-yellow-700 text-primary rounded-full transition-colors duration-300 text-sm font-medium"
        >
          {isAutoPlaying ? (
            <>
              <span>⏸️ Pause</span>
            </>
          ) : (
            <>
              <span>▶️ Resume</span>
            </>
          )}
        </button>
      </div> */}

      {/* Main Content - Responsive Layout */}
      <div className="flex  flex-col lg:flex-row items-center justify-between px-2 gap-8 lg:gap-12">
        
        {/* Left Side - Circular Process */}
        <div className="w-full  lg:w-1/2 max-w-2xl mx-auto lg:mx-0">
          <div className="relative w-full bg-gradient-to-br from-yellow-200 via-white to-yellow-200 aspect-square max-w-md mx-auto border-4 border-yellow-400 rounded-full p-8">
            
            {/* Step Buttons in Circular Layout */}
            {steps.map((step, index) => {
              const angle = (index * 2 * Math.PI) / steps.length;
              const radius = 160;
              const x = radius * Math.cos(angle - Math.PI / 2);
              const y = radius * Math.sin(angle - Math.PI / 2);

              return (
                <button
                  key={step.id}
                  onClick={() => handleStepClick(index)}
                  className={`absolute w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center cursor-pointer z-20 border-2 transition-all duration-300 ${
                    activeStep === index 
                      ? 'border-yellow-500 scale-110 shadow-xl' 
                      : 'border-gray-300 shadow-lg'
                  }`}
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.color}`} />
                  <div className="relative z-10">
                    <div className="text-white text-xl md:text-2xl">{step.icon}</div>
                    {activeStep === index && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center border-2 border-white"
                      >
                        <FaCheck className="text-white text-xs" />
                      </motion.div>
                    )}
                  </div>
                </button>
              );
            })}

            {/* Center Display */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-yellow-50 to-yellow-100 border-8 border-yellow-200 flex flex-col items-center justify-center shadow-inner">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className="text-center p-4"
                  >
                    <div className="mb-4">
                      <div className="text-3xl md:text-4xl font-bold text-yellow-600">
                        {activeStep + 1}
                      </div>
                      <div className="text-xs md:text-sm text-yellow-700 font-medium mt-1">
                        STEP {activeStep + 1}
                      </div>
                    </div>
                    <div className="text-lg md:text-lg font-bold text-gray-800">
                      {steps[activeStep].title}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Auto-play indicator */}
            {/* {isAutoPlaying && (
              <motion.div 
                animate={{ 
                  rotate: 360,
                  transition: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }
                }}
                className="absolute top-4 right-4 w-6 h-6"
              >
                <div className="w-full h-full border-2 border-yellow-500 border-t-transparent rounded-full" />
              </motion.div>
            )} */}
          </div>

          {/* Mobile Step Indicators */}
          <div className="flex justify-center mt-8 lg:hidden">
            <div className="flex space-x-3">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleStepClick(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeStep === index ? 'bg-yellow-500 scale-125' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Step Details */}
        <div className="w-full lg:w-1/2">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-gradient-to-bl from-primary via-yellow-200 to-yellow-600 border-1 border-yellow-500 rounded-xl shadow-lg border border-gray-200 p-4 md:p-4"
            >
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-7 h-6 rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">
                      {activeStep + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">
                    {steps[activeStep].title}
                  </h3>
                  {isAutoPlaying && (
                    <motion.span
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-xs text-yellow-600 font-medium"
                    >
                      ● 
                    </motion.span>
                  )}
                </div>
                
                <div className="mb-6">
                  <p className="text-gray-600 text-md font-medium mb-2">
                    {steps[activeStep].description}
                  </p>
                  <p className="text-gray-700 text-sm">
                    {steps[activeStep].details}
                  </p>
                </div>

                {/* Icon Display */}
                <div className="flex items-center justify-start">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 flex items-center justify-center p-4">
                    <div className="text-4xl text-gray-600">
                      {steps[activeStep].icon}
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-medium text-gray-600">
                    Progress
                  </span>
                  <span className="text-xs font-medium text-yellow-600">
                    Step {activeStep + 1} of {steps.length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-2.5 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600"
                  />
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-6">
                <button
                  onClick={goToPrevStep}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-300 text-sm font-medium"
                >
                  <FaArrowRight className="transform rotate-180" />
                  Previous
                </button>
                
                <button
                  onClick={goToNextStep}
                  className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors duration-300 text-sm font-medium"
                >
                  Next
                  <FaArrowRight />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Step Counter */}
      <div className="mt-0 text-center">
        <p className="text-sm text-gray-600">
          Step <span className="font-bold text-yellow-600">{activeStep + 1}</span> of {steps.length}
        </p>
      </div>
    </div>
  );
};

export default GoldValuationProcess;