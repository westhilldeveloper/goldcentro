'use client'

import { useState, useEffect, useCallback } from 'react'
import { 
  FaArrowRight, 
  FaChevronLeft, 
  FaChevronRight,
  FaPlay,
  FaPause
} from 'react-icons/fa'

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const images = [
    '/images/hero1.jpg',
    '/images/hero2.jpg',
    '/images/hero3.jpg'
  ]

  const slides = [
    {
      title: 'Your Trusted Partner in Gold Investments',
      subtitle: 'Secure • Transparent • Reliable',
      description: 'Buy, sell, and manage your gold investments with confidence. Get live rates, secure transactions, and expert guidance.',
      cta: 'Start Investing',
      accent: 'from-amber-500 to-yellow-600'
    },
    {
      title: 'Live Gold Rates at Your Fingertips',
      subtitle: 'Real-Time Market Updates',
      description: 'Stay updated with 24K and 22K gold prices. Make informed decisions with our real-time tracking.',
      cta: 'View Live Rates',
      accent: 'from-blue-500 to-indigo-600'
    },
    {
      title: 'Secure Gold Storage Solutions',
      subtitle: 'Bank-Grade Vault Protection',
      description: 'Store your precious gold in our insured, temperature-controlled vaults with 24/7 security.',
      cta: 'Learn More',
      accent: 'from-emerald-500 to-teal-600'
    }
  ]

  const nextSlide = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentImage((prev) => (prev + 1) % images.length)
    setTimeout(() => setIsTransitioning(false), 700)
  }, [images.length, isTransitioning])

  const prevSlide = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
    setTimeout(() => setIsTransitioning(false), 700)
  }, [images.length, isTransitioning])

  const goToSlide = (index) => {
    if (isTransitioning || index === currentImage) return
    setIsTransitioning(true)
    setCurrentImage(index)
    setTimeout(() => setIsTransitioning(false), 700)
  }

  useEffect(() => {
    let interval
    if (isPlaying && !isTransitioning) {
      interval = setInterval(nextSlide, 5000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPlaying, nextSlide, isTransitioning])

  return (
    <section className="relative   h-screen min-h-[700px] overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ 
              backgroundImage: `url(${img})`,
              backgroundPosition: 'center center',
              backgroundSize: 'cover'
            }}
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full transition-all duration-300 group"
        disabled={isTransitioning}
      >
        <FaChevronLeft className="text-white text-xl group-hover:scale-110 transition-transform" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full transition-all duration-300 group"
        disabled={isTransitioning}
      >
        <FaChevronRight className="text-white text-xl group-hover:scale-110 transition-transform" />
      </button>

      {/* Play/Pause Button */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute right-4 top-4 z-20 p-3 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full transition-all duration-300 group"
      >
        {isPlaying ? (
          <FaPause className="text-white text-lg group-hover:scale-110 transition-transform" />
        ) : (
          <FaPlay className="text-white text-lg group-hover:scale-110 transition-transform" />
        )}
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-500 rounded-full ${
              index === currentImage 
                ? 'bg-white w-10' 
                : 'bg-white/50 hover:bg-white/70 w-3'
            } h-3`}
            disabled={isTransitioning}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl text-white">
          {/* Slide Counter */}
          <div className="mb-6 flex items-center gap-3">
            <div className="text-lg font-semibold">
              0{currentImage + 1} <span className="text-white/50">/ 03</span>
            </div>
            <div className="h-px w-12 bg-gradient-to-r from-white to-transparent" />
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent">
              {slides[currentImage].title}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-amber-100 mb-4 font-medium">
            {slides[currentImage].subtitle}
          </p>

          {/* Description */}
          {/* <p className="text-lg text-gray-200 mb-8 max-w-xl">
            {slides[currentImage].description}
          </p> */}

         

          
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 z-20 hidden lg:block">
        <div className="flex flex-col items-center gap-3">
          <span className="text-white/70 text-sm uppercase tracking-wider rotate-90 translate-y-8">Scroll</span>
          <div className="h-24 w-px bg-gradient-to-b from-white/50 via-white to-transparent overflow-hidden">
            <div className="w-full h-full bg-gradient-to-b from-white to-transparent animate-scroll-indicator" />
          </div>
        </div>
      </div>

      {/* Add animations */}
      <style jsx>{`
        @keyframes scroll-indicator {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        
        .animate-scroll-indicator {
          animation: scroll-indicator 2s ease-in-out infinite;
        }
        
        /* Fade in animation for content */
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
      `}</style>
    </section>
  )
}