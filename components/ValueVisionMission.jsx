"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function ValueVisionMission() {
  const [active, setActive] = useState("value");
  const [direction, setDirection] = useState(0); // 0: left, 1: right

  const content = {
    value: [
      {
        title: "Empower",
        text: "To be the most trusted gold buying and pledged-gold release partner, offering people a safe and hassle-free way to unlock the value of their gold.",
        icon: "/images/value.png", // Image path
        color: "from-amber-100 via-yellow-600 to-yellow-100",
        gradient: "bg-gradient-to-br from-amber-500 via-yellow-700 to-yellow-500"
      },
    ],
    vision: [
      {
        title: "Expand",
        text: "To build a nationwide network with standardized, technology-driven processes that ensure the same trusted experience everywhere.",
        icon: "/images/vision.png", // Image path
        color: "from-amber-100 via-yellow-600 to-yellow-100",
        gradient: "bg-gradient-to-br from-amber-500 via-yellow-700 to-yellow-500"
      },
    ],
    mission: [
      {
        title: "Excel",
        text: "To consistently deliver fast, fair, and reliable service that sets the benchmark for the gold buying industry.",
        icon: "/images/mission.png", // Image path
       color: "from-amber-100 via-yellow-600 to-yellow-100",
        gradient: "bg-gradient-to-br from-amber-500 via-yellow-700 to-yellow-500"
      },
    ],
  };

  // Auto-rotate through tabs
  useEffect(() => {
    const interval = setInterval(() => {
      const tabs = ["value", "vision", "mission"];
      const currentIndex = tabs.indexOf(active);
      const nextIndex = (currentIndex + 1) % tabs.length;
      setDirection(1); // Moving right
      setActive(tabs[nextIndex]);
    }, 4000);

    return () => clearInterval(interval);
  }, [active]);

  const handleTabClick = (tab) => {
    const tabs = ["value", "vision", "mission"];
    const currentIndex = tabs.indexOf(active);
    const nextIndex = tabs.indexOf(tab);
    setDirection(nextIndex > currentIndex ? 1 : -1);
    setActive(tab);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    },
    active: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };

  const contentVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      rotateY: direction > 0 ? 10 : -10,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: (direction) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
      rotateY: direction > 0 ? -10 : 10,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    })
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-4">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="relative"
      >
        {/* Animated background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-yellow-100/10 to-black/10 rounded-2xl blur-xl -z-10" />
        
        {/* Main container */}
        <div className="relative bg-gradient-to-br from-yellow-500 to-yellow-100 rounded-2xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 shadow-2xl overflow-hidden">
          
          {/* Decorative elements */}
          <motion.div 
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity }
            }}
            className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-amber-500/20 to-transparent rounded-full blur-xl"
          />
          
          <motion.div 
            animate={{ 
              rotate: -360,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              rotate: { duration: 25, repeat: Infinity, ease: "linear" },
              scale: { duration: 3, repeat: Infinity }
            }}
            className="absolute -bottom-20 -right-20 w-60 h-60 bg-gradient-to-r from-emerald-500/20 to-transparent rounded-full blur-xl"
          />

          {/* LEFT TABS */}
          <div className="flex md:flex-col gap-4 text-white">
            {["value", "vision", "mission"].map((item, index) => (
              <motion.button
                key={item}
                onClick={() => handleTabClick(item)}
                variants={tabVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative text-left transition-all duration-300 ${
                  active === item 
                    ? `bg-gradient-to-r ${content[item][0].color} text-md text-white` 
                    : 'bg-white/5 hover:bg-white/10'
                } rounded-xl p-4 md:p-6`}
              >
                {/* Active indicator */}
                {active === item && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-xl"
                  />
                )}

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="relative "
                    >
                      {/* Image for tab icon */}
                      <Image 
                        src={content[item][0].icon}
                        alt={item}
                        width={50}
                        height={50}
                        className="object-contain"
                      />
                    </motion.div>
                    <h3 className="text-lg md:text-xl font-bold tracking-wide">
                      {item.toUpperCase()}
                    </h3>
                  </div>
                  
                  {/* Progress bar for active tab */}
                  {active === item && (
                    <motion.div 
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 3.8, ease: "linear" }}
                      className="h-1 bg-gradient-to-r from-white/50 to-transparent rounded-full"
                    />
                  )}
                </div>

                {/* Hover effect */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent rounded-xl"
                />
              </motion.button>
            ))}
          </div>

          {/* RIGHT CONTENT */}
          <div className="md:col-span-2 text-white space-y-6 relative">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active}
                custom={direction}
                variants={contentVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="relative"
              >
                {/* Content background */}
                <div className={`absolute inset-0 ${content[active][0].gradient} rounded-xl -m-4`} />
                
                <div className="relative z-10 p-6 md:p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div 
                      animate={{ 
                        rotate: [0, 360],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ 
                        rotate: { duration: 2, ease: "linear" },
                        scale: { duration: 1, repeat: Infinity }
                      }}
                      className={`w-16 h-16 rounded-full bg-gradient-to-br ${content[active][0].color} flex items-center justify-center`}
                    >
                      {/* Large Image for content */}
                      
                        <Image 
                          src={content[active][0].icon}
                          alt={active}
                          width={50}
                          height={50}
                          className="object-contain"
                        />
                     
                    </motion.div>
                    
                    <div>
                      <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl font-bold mb-1"
                      >
                        {content[active][0].title}
                      </motion.h2>
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-amber-300 font-bold text-md"
                      >
                        {active.toUpperCase()}
                      </motion.p>
                    </div>
                  </div>

                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-md md:text-lg leading-relaxed"
                  >
                    <span className="font-bold text-amber-300">{content[active][0].title}</span> – {content[active][0].text}
                  </motion.p>

                  {/* Animated border */}
                  <motion.div 
                    animate={{ 
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="h-1 mt-8  bg-gradient-to-r from-transparent via-white to-transparent bg-[length:200%_100%] rounded-full"
                  />
                </div>

                {/* Floating particles */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 0, x: 0 }}
                    animate={{ 
                      opacity: [0, 1, 0],
                      y: [-20, -40],
                      x: Math.sin(i * 0.5) * 20
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.2,
                      repeat: Infinity,
                      repeatDelay: 1
                    }}
                    className={`absolute w-2 h-2 rounded-full bg-gradient-to-r ${content[active][0].color}`}
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${10 + i * 10}%`
                    }}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Auto-play indicator */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2 text-white/60 text-sm">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full"
            />
            
          </div>
        </div>
      </motion.div>
    </section>
  );
}