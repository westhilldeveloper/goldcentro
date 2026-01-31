// components/BestGoldBuyers.js
"use client";

import { FaGem } from 'react-icons/fa';
import { GiGoldBar } from 'react-icons/gi';

const BestGoldBuyers = () => {
  const services = [
    {
      id: 1,
      title: "Sell Gold",
      image: "/images/sellGold.jpg",
      description: "Turn your idle gold into immediate financial freedom. When emergencies strike or opportunities arise, Gold Centro provides the fastest, most trusted way to convert your gold into cash - with transparency, top market rates, and zero hassle.",
      buttonText: "Sell Gold",
    },
    {
      id: 2,
      title: "Release Pledged Gold",
      image: "/images/releaseGold.jpg",
      description: "Every day your gold stays pledged, interest chips away at its worth. Break free from the debt cycle with Gold Centro's seamless pledged gold release service. We ensure you recover maximum remaining value quickly, turning financial burden back into personal wealth.",
      buttonText: "Release Gold",
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white py-8 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Main Header */}
        <div className="text-center mb-8">
          <h1 className="text-xl md:text-xl font-bold mb-3">
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              BEST GOLD BUYERS
            </span>
          </h1>
          
          <div className="h-0.5 w-20 bg-gradient-to-r from-yellow-500 to-yellow-600 mx-auto mb-4"></div>
          
          <p className="text-sm md:text-md text-gray-300 max-w-3xl mx-auto leading-relaxed">
           Gold Centro recognized as one of the best gold buyers in India, we provide a seamless 
            and trustworthy experience for those looking to sell their gold. With{" "}
            <span className="text-yellow-400 font-medium">120-years of heritage</span> from the 
            CapsGold legacy, we ensure that our customers receive the best market value for their 
            gold and silver items. With multiple branches across major cities,Gold Centro is your 
            trusted destination for selling gold with ease and confidence.
          </p>
        </div>

        {/* Divider Line */}
        <div className="flex items-center justify-center my-8">
          <div className="h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent w-full max-w-xl"></div>
          <div className="mx-3">
            <FaGem className="text-lg text-yellow-500" />
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent w-full max-w-xl"></div>
        </div>

        {/* Services Title */}
        <div className="text-center mb-6">
          <h2 className="text-xl md:text-xl font-bold mb-3 text-white">
            OUR <span className="text-yellow-400">SERVICES</span>
          </h2>
          <div className="flex justify-center items-center space-x-3 mb-6">
            <span className="text-base font-medium text-yellow-400">Sell Gold</span>
            <div className="w-6 h-px bg-yellow-500"></div>
            <FaGem className="text-yellow-500 text-lg" />
            <div className="w-6 h-px bg-yellow-500"></div>
            <span className="text-base font-medium text-amber-400">Release Pledged Gold</span>
          </div>
        </div>

        {/* Services Cards with Animation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {services.map((service) => (
            <div 
              key={service.id}
              className="group relative bg-gradient-to-br from-primary to-primary/80 rounded-lg border border-yellow-900 shadow-lg overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.99] active:transition-transform min-h-[400px]"
            >
              {/* Image Container with "Photo from purse" effect */}
              <div className="relative w-full h-48 md:h-56 lg:h-64 overflow-hidden rounded-t-lg">
                {/* Main Image with Slide Up Effect */}
                <div className="absolute inset-0 transform transition-all duration-700 group-hover:translate-y-[-10%] group-hover:scale-110 group-active:translate-y-[-5%]">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-auto object-cover"
                  />
                </div>
                
                {/* Glass Overlay with Depth Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/80 transition-all duration-700 group-hover:via-black/15 group-hover:to-black/60">
                  {/* Glass Reflection Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white/10 to-transparent transform -skew-y-6 translate-y-[-100%] group-hover:translate-y-0 transition-transform duration-1000"></div>
                  </div>
                </div>
                
                {/* Card Edge Effect (like purse opening) */}
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-yellow-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
                  
              {/* Floating Icon with Glass Effect */}
              <div className="absolute top-4 right-4 transform transition-all duration-700 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 -translate-y-10">
                <div className="p-3 rounded-lg backdrop-blur-md bg-gradient-to-br from-yellow-400/20 to-amber-600/10 border border-yellow-500/30 shadow-lg">
                  {service.id === 1 ? (
                    <GiGoldBar className="text-xl md:text-2xl text-yellow-300 drop-shadow-lg" />
                  ) : (
                    <FaGem className="text-xl md:text-2xl text-amber-300 drop-shadow-lg" />
                  )}
                </div>
              </div>

              {/* Card Content - Moves up on hover */}
              <div className="relative z-10 transition-all duration-500 transform group-hover:-translate-y-2 group-active:-translate-y-1 mt-[-20px]">
                {/* Card Header */}
                <div className="flex justify-between bg-gradient-to-r from-primary/70 to-primary p-2 md:p-2 backdrop-blur-sm">
                  <div className="flex items-center space-x-3">
                    {service.id === 1 ? (
                      <GiGoldBar className="text-2xl md:text-3xl text-black transition-transform duration-500 group-hover:scale-110" />
                    ) : (
                      <FaGem className="text-lg md:text-lg text-amber-300 transition-transform duration-500 group-hover:scale-110" />
                    )}
                    <h3 className="text-lg md:text-lg font-bold text-black transition-all duration-500 group-hover:text-yellow-200">
                      {service.title}
                    </h3>
                  </div>
                    <button className="w-1/3 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white font-medium py-2.5 px-5 rounded-md text-sm transition-all duration-500 transform hover:scale-[1.02] active:scale-[0.98] group-hover:shadow-lg hover:shadow-xl border border-yellow-700/50 group-hover:border-yellow-500/50">
                    {service.buttonText}
                  </button>
                </div>

                {/* Card Content */}
                <div className="p-4 md:p-5 bg-gradient-to-b from-primary/60 via-yellow-200 to-yellow-600">
                  <p className="text-black text-sm md:text-md leading-relaxed mb-6 transition-all duration-500 group-hover:text-gray-900">
                    {service.description}
                  </p>
                  
                
                </div>
              </div>

           

              {/* Mobile Touch Indicator */}
              <div className="md:hidden absolute top-4 right-4 w-3 h-3 bg-yellow-500 rounded-full opacity-0 group-active:opacity-100 transition-opacity duration-300 animate-pulse"></div>
            </div>
          ))}
        </div>

      </div>

      {/* Custom CSS for enhanced effects */}
      <style jsx>{`
        @keyframes slideFromPurse {
          0% {
            transform: translateY(0) scale(1);
            filter: brightness(0.8);
          }
          100% {
            transform: translateY(-10%) scale(1.1);
            filter: brightness(1.1);
          }
        }
        
        @keyframes glowPulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }
        
        .group:hover .relative.w-full.h-48.md\\:h-56.lg\\:h-64.overflow-hidden.rounded-t-lg .absolute.inset-0.transform {
          animation: slideFromPurse 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        
        .group-active .relative.w-full.h-48.md\\:h-56.lg\\:h-64.overflow-hidden.rounded-t-lg .absolute.inset-0.transform {
          animation: slideFromPurse 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        
        .animate-pulse {
          animation: glowPulse 2s infinite;
        }
        
        /* Smooth transitions */
        * {
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
};

export default BestGoldBuyers;