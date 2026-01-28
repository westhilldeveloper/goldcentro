"use client";

import { useState, useEffect } from 'react';
import { FaWhatsapp, FaPhoneAlt, FaMapMarkerAlt, FaDollarSign, FaGem } from 'react-icons/fa';

const FixedActionBar = () => {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate 30% of viewport height (0.3 instead of 1.6)
      const triggerHeight = window.innerHeight * 0.3;
      
      if (window.scrollY > triggerHeight) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initial check on mount
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsAppClick = () => {
    const phoneNumber = "+919590704444";
    const message = "Hello, I'm interested in your gold services";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const buttons = [
    {
      id: 1,
      label: "Live Gold Rate",
      icon: <FaDollarSign className="text-yellow-400" />,
      bgImage: "/images/bg_btn1.jpg",
      action: () => window.open('/gold-rates', '_self')
    },
    {
      id: 2,
      label: "Sell Gold",
      icon: <FaDollarSign className="text-green-500" />,
      bgImage: "/images/bg_btn2.jpg",
      action: () => window.open('/sell-gold', '_self')
    },
    {
      id: 3,
      label: "Release Gold",
      icon: <FaGem className="text-yellow-500" />,
      bgImage: "/images/bg_btn3.jpg",
      action: () => window.open('/release-gold', '_self')
    },
    {
      id: 4,
      label: "Branch",
      icon: <FaMapMarkerAlt className="text-red-500" />,
      bgImage: "/images/bg_btn3.jpg",
      action: () => window.open('/branches', '_self')
    },
    {
      id: 5,
      label: "Chat with Us",
      icon: <FaWhatsapp className="text-green-500" />,
      bgImage: "/images/bg_btn3.jpg",
      action: handleWhatsAppClick,
      isWhatsApp: true
    }
  ];

  return (
    <>
      {/* Normal state - scrolls with content */}
      {!isFixed && (
        <div className="w-full z-50 relative">
          <div className="bg-transparent px-4 py-3">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-center gap-2 md:gap-3 lg:gap-4">
                {buttons.map((button) => (
                  <button
                    key={button.id}
                    onClick={button.action}
                    className="
                      relative overflow-hidden rounded-lg shadow-md transition-all duration-300
                      hover:scale-105 hover:shadow-xl active:scale-95 
                      min-h-[40px] w-[calc(15%-12px)]
                      flex flex-col items-center justify-center
                      group
                    "
                  >
                    <div 
                      className="absolute inset-0 bg-cover bg-center z-0"
                      style={{ backgroundImage: `url(${button.bgImage})` }}
                    />
                    <div className="absolute inset-0 bg-black/40 z-0 group-hover:bg-black/30 transition-all duration-300" />
                    
                    <div className="relative z-10 flex flex-col items-center justify-center p-2">
                      <div className="text-2xl mb-1 transform group-hover:scale-110 transition-transform duration-300">
                        {button.icon}
                      </div>
                      <span className="font-semibold text-white text-center text-sm md:text-base">
                        {button.label}
                      </span>
                      {button.isWhatsApp && (
                        <span className="text-[10px] md:text-xs text-green-300 mt-1">
                          +91 95907 04444
                        </span>
                      )}
                    </div>
                    
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 to-yellow-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Fixed state - appears after 30% scroll */}
      {isFixed && (
        <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
          <div className="bg-transparent px-2 py-2">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-center gap-2 md:gap-3">
                {buttons.map((button) => (
                  <button
                    key={button.id}
                    onClick={button.action}
                    className="
                      relative overflow-hidden rounded-lg shadow-md transition-all duration-300
                      hover:scale-105 hover:shadow-xl active:scale-95 
                      min-h-[40px] w-[calc(15%-8px)]
                      flex flex-col items-center justify-center
                      group
                    "
                  >
                    <div 
                      className="absolute inset-0 bg-cover bg-center z-0"
                      style={{ backgroundImage: `url(${button.bgImage})` }}
                    />
                    <div className="absolute inset-0 bg-black/40 z-0 group-hover:bg-black/30 transition-all duration-300" />
                    
                    <div className="relative z-10 flex flex-col items-center justify-center p-2">
                      <div className="text-xl md:text-2xl mb-1 transform group-hover:scale-110 transition-transform duration-300">
                        {button.icon}
                      </div>
                      <span className="font-semibold text-white text-center text-xs md:text-sm">
                        {button.label}
                      </span>
                      {button.isWhatsApp && (
                        <span className="text-[9px] md:text-xs text-green-300 mt-1">
                          +91 95907 04444
                        </span>
                      )}
                    </div>
                    
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 to-yellow-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FixedActionBar;