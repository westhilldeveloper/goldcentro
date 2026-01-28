"use client";

import { useState, useEffect,useRef } from "react";
import { FaStar,FaHeart,  FaChevronLeft, FaChevronRight } from "react-icons/fa";

const testimonials = [
  {
    text: "Transparency and wonderful experience. Doesn't take much time. Everything is documented so anyone can come and sell off their gold at good price.",
    name: "Namrata H",
  },
  {
    text: "Very professional staff and smooth process. Got instant settlement without any hassle.",
    name: "Suresh K",
  },
  {
    text: "Best gold valuation experience I have had. Completely trustworthy.",
    name: "Anjali R",
  },
];
const coinImages = [
  '/images/coin1.png',
  '/images/coin2.png',
  '/images/coin3.png',
  '/images/coin4.png',
  '/images/coin5.png',
];
const defaultCoinImage = '/images/coin1.png';
export default function CustomerTestimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState("next");
  const [isExploding, setIsExploding] = useState(false);
  const [likes, setLikes] = useState(0);
  const [particles, setParticles] = useState([]);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  // Auto swipe
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection("next");
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setDirection("next");
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection("prev");
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
const createCoinParticles = (count = 30) => {
    const newParticles = [];
    
    for (let i = 0; i < count; i++) {
      const coinType = Math.floor(Math.random() * coinImages.length);
      const rotation = Math.random() * 360;
      
      newParticles.push({
        id: i,
        image: coinImages[coinType],
        size: Math.random() * 40 + 80, // 20-60px (coins are bigger)
        left: 50, // Start from center (like button position)
        top: 50,  // Start from center
        rotation: rotation,
        rotationSpeed: (Math.random() - 0.5) * 20, // Rotate while flying
        xVelocity: (Math.random() - 0.5) * 25,
        yVelocity: (Math.random() - 0.5) * 25 - 15, // Upward bias
        opacity: 1,
        scale: 1,
        bounce: 0, // For bounce effect
        gravity: 0.4,
        spinDirection: Math.random() > 0.5 ? 1 : -1, // Clockwise or counter-clockwise
      });
    }
    return newParticles;
  };

 

 const handleLikeClick = () => {
    // Play coin sound
    

    setIsExploding(true);
    setLikes(prev => prev + 1);
    
    const newParticles = createCoinParticles(40);
    setParticles(newParticles);

    const animateParticles = () => {
      setParticles(prev => {
        const updated = prev.map(p => {
          // Add gravity and bounce
          let newYVelocity = p.yVelocity + p.gravity;
          let newTop = p.top + newYVelocity;
          let newBounce = p.bounce;
          
          // Simple bounce effect when hitting "ground"
          if (newTop > 90 && newYVelocity > 0) {
            newYVelocity = -newYVelocity * 0.9; // Bounce with energy loss
            newBounce = p.bounce + 1;
          }
          
          return {
            ...p,
            left: p.left + p.xVelocity * 0.5,
            top: newTop,
            yVelocity: newYVelocity,
            rotation: p.rotation + (p.rotationSpeed * p.spinDirection),
            opacity: p.opacity - (newBounce > 2 ? 0.03 : 0), // Start fading after 2 bounces
            scale: p.scale * 0.995, // Slowly shrink
            bounce: newBounce,
          };
        });
        
        return updated.filter(p => p.opacity > 0 && p.bounce < 5);
      });
    };

    let frameId;
    const animate = () => {
      animateParticles();
      frameId = requestAnimationFrame(animate);
    };
    
    frameId = requestAnimationFrame(animate);

    setTimeout(() => {
      cancelAnimationFrame(frameId);
      setIsExploding(false);
      setTimeout(() => setParticles([]), 100);
    }, 5000);
  };

  return (
    <section className="bg-black py-16 px-4">
      <div className="max-w-6xl h-56 mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        
        {/* LEFT CONTENT */}
        <div>
          {/* Title */}
          <div className="flex items-center gap-4 mb-6">
            <span className="h-[1px] w-12 bg-amber-400" />
            <h2 className="text-amber-400 font-semibold tracking-wide">
              HEAR FROM OUR CUSTOMERS
            </h2>
            <span className="h-[1px] w-12 bg-amber-400" />
          </div>

          {/* Testimonial Container */}
          <div className="relative h-40 overflow-hidden">
            <div
              key={index}
              className={`absolute top-0 left-0 w-full transition-all duration-1000 ease-in-out ${
                direction === "next"
                  ? "animate-slideInFromRight"
                  : "animate-slideInFromLeft"
              }`}
            >
              {/* Testimonial Text */}
              <p className="text-white text-sm leading-relaxed mb-6 max-w-md">
                {testimonials[index].text}
              </p>

              {/* Stars */}
              <div className="flex items-center gap-1 text-amber-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>

              {/* Name */}
              <p className="text-white font-semibold mb-6">
                {testimonials[index].name}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === i 
                      ? "bg-amber-400 scale-125" 
                      : "bg-white/40 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-4">
              <button
                onClick={prevTestimonial}
                className="text-amber-400 hover:text-amber-300 transition-colors"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={nextTestimonial}
                className="text-amber-400 hover:text-amber-300 transition-colors"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center md:justify-end">
          <div className="relative w-64 h-64 rounded-full border-4 border-amber-400 overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/images/customer.mp4" type="video/mp4" />
              <img
                src="/images/enquiryImg.jpg"
                alt="Happy Customer"
                className="w-full h-full object-cover"
              />
            </video>

            {/* Like Button */}
            <button
              onClick={handleLikeClick}
              className={`absolute top-16 left-4 flex flex-col items-center transition-all duration-300 ${
                isExploding ? 'scale-125' : 'hover:scale-110'
              }`}
            >
              <div className="relative">
                <img 
                  src="/images/treasure.gif" 
                  alt="Like" 
                  className={`w-12 h-12 object-contain rounded-full transition-all duration-300 ${
                    isExploding ? 'rotate-12 scale-125' : ''
                  }`}
                />
                {likes > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-b from-yellow-600 via-yellow-500 to-yellow-700 text-yellow-800 text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-pulse">
                    {likes}
                  </span>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Coin Particles - Fixed to viewport */}
      {particles.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {particles.map(particle => (
            <div
              key={particle.id}
              className="absolute pointer-events-none"
              style={{
                left: `${particle.left}vw`,
                top: `${particle.top}vh`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                transform: `translate(-50%, -50%) rotate(${particle.rotation}deg) scale(${particle.scale})`,
                opacity: particle.opacity,
                filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.7))',
              }}
            >
              <img
                src={particle.image}
                alt="Coin"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.src = defaultCoinImage;
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Sparkle Effect */}
      {isExploding && (
        <div className="fixed inset-0 pointer-events-none z-40">
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-yellow-100/10 to-transparent animate-pulse"></div>
        </div>
      )}
    </section>
  );
}