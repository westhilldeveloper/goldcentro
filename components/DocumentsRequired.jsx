'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const DocumentsRequired = ({ pledge = false }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  const items = [
    {
      id: 1,
      title: "AADHAAR",
      image: "/images/aadhaar.png"
    },
    {
      id: 2,
      title: "PAN CARD",
      image: "/images/pancard.png"
    },
    {
      id: 3,
      title: "ADDRESS PROOF",
      image: "/images/home-address.png"
    },
    {
      id: 4,
      title: "Bank Account Details",
      image: "/images/passbook.png"
    },
    ...(pledge ? [{
      id: 5,
      title: "Pledged Ticket",
      image: "/images/pledge_ticket.png"
    }] : [])
  ];

  const totalItems = items.length;
  const gridCols = pledge ? "md:grid-cols-5" : "md:grid-cols-4";

  // Auto-rotate through cards
  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % totalItems);
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval);
  }, [totalItems, isAnimating]);

  // Handle mouse enter/leave to pause/resume animation
  const handleCardHover = () => {
    setIsAnimating(false);
  };

  const handleCardLeave = () => {
    setIsAnimating(true);
  };

  return (
    <div className="bg-white p-4 md:p-4 flex flex-col items-center justify-center [text-shadow:_1px_1px_0_#000,_-1px_-1px_0_#000,_1px_-1px_0_#000,_-1px_1px_0_#000,_0_2px_4px_rgba(0,0,0,0.5)]">
      <h1 className="text-2xl font-bold text-gray-100 mt-2 text-yellow-400 text-center"><span className='text-yellow-200'>
        DOCUMENTS </span> REQUIRED
      </h1>
      
      <div className="w-full bg-white min-h-52 rounded-xl shadow-lg p-8">
        {/* Animation Controls */}
        {/* <div className="flex justify-center items-center mb-4 space-x-4">
          <span className="text-sm text-gray-600">
            {isAnimating ? "● Auto-rotating" : "⏸️ Paused"}
          </span>
          <button
            onClick={() => setIsAnimating(!isAnimating)}
            className="text-xs px-3 py-1 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors"
          >
            {isAnimating ? "Pause" : "Play"}
          </button>
        </div> */}

        {/* Main Container with Animation */}
        <div className="relative overflow-hidden">
          {/* Static Grid Layout */}
          <div className={`grid grid-cols-1 ${gridCols} gap-2`}>
            {items.map((item, index) => (
              <div
                key={item.id}
                onMouseEnter={handleCardHover}
                onMouseLeave={handleCardLeave}
                className={`relative transition-all duration-500 ease-in-out ${
                  index === activeIndex ? 'z-10' : 'z-0'
                }`}
              >
                {/* Animated Highlight Border */}
                {index === activeIndex && (
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0  bg-gradient-to-r from-yellow-400  via-yellow-300 to-yellow-400 rounded-lg blur-lg"
                  />
                )}

                {/* Card Content */}
                <div
                  className={`relative flex flex-col justify-center p-2 rounded-lg shadow-lg  items-center space-y-4 md:space-y-0 md:space-x-4 transition-all duration-500 ${
                    index === activeIndex 
                      ? 'bg-gradient-to-r from-yellow-600 via-yellow-300 to-yellow-700 border-2 border-yellow-600  scale-100 shadow-2xl' 
                      : 'bg-gradient-to-r from-gray-500 via-white to-gray-500  border-2 border-gray-600 scale-85 opacity-70 shadow-lg'
                  }`}
                >
                  <div className="p-3 rounded-lg">
                    <motion.div
                      animate={index === activeIndex ? { 
                        scale: [1, 1.1, 1],
                        transition: { duration: 1, repeat: Infinity }
                      } : {}}
                      className="relative h-18 w-18"
                    >
                      <Image 
                        src={item.image} 
                        alt={item.title} 
                        width={100}
                        height={100}
                        className="object-contain"
                      />
                    </motion.div>
                  </div>
                  <div className="text-center">
                    <motion.h3
                      animate={index === activeIndex ? {
                        scale: [1, 1.05, 1],
                        transition: { duration: 1.5, repeat: Infinity }
                      } : {}}
                      className="font-bold text-gray-300 text-lg mb-2 [text-shadow:_1px_1px_0_#000,_-1px_-1px_0_#000,_1px_-1px_0_#000,_-1px_1px_0_#000]"
                    >
                      {item.title}
                    </motion.h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Slide Animation Effect */}
          <AnimatePresence>
            <motion.div
              key="slide-indicator"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="absolute top-1/2 right-0 transform -translate-y-1/2"
            >
           
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Dots
        <div className="flex justify-center mt-6 space-x-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveIndex(index);
                setIsAnimating(false);
              }}
              onMouseEnter={handleCardHover}
              onMouseLeave={handleCardLeave}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeIndex 
                  ? 'bg-yellow-500 w-6 scale-125' 
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default DocumentsRequired;