'use client'
 import KnowTodaysGoldRateModal from '../components/KnowTodaysGoldRateModal'

import { useState, useEffect, useRef } from 'react'
import { 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaBars, 
  FaTimes, 
  FaChevronDown,
  FaWhatsapp,
  FaEnvelope,
  FaCrown,
  FaHistory,
  FaAward,
  FaSyncAlt,
  FaExclamationTriangle,
} from 'react-icons/fa'
import { GiGoldBar, GiDiamondRing } from 'react-icons/gi'
import { RiCustomerService2Fill } from 'react-icons/ri'
import Link from 'next/link';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [showNotification, setShowNotification] = useState(true)
  const [goldRate, setGoldRate] = useState(6450)
  const [goldChange, setGoldChange] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [rateError, setRateError] = useState(false)
  const [lastUpdated, setLastUpdated] = useState('')
  const mounted = useRef(false)
  const dropdownRef = useRef(null)
  const lastScrollY = useRef(0)
  const [showNavbar, setShowNavbar] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const dropdownTimeoutRef = useRef(null)
  const rateIntervalRef = useRef(null)
  const previousRate = useRef(6450)
   const [open, setOpen] = useState(false);

  // Fetch gold rate from API
  const fetchGoldRate = async () => {
    if (!mounted.current) return;
    
    setIsLoading(true);
    setRateError(false);
    
    try {
      console.log('Fetching live gold rate...');
      const response = await fetch('/api/gold-rate', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache',
        },
        next: { revalidate: 300 } // Revalidate every 5 minutes
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      console.log('Gold rate API response:', data);
      
      if (data.success && data.rates?.gold?.['24k']?.perGram) {
        const newRate = data.rates.gold['24k'].perGram;
        
        // Calculate change percentage
        if (previousRate.current > 0) {
          const change = ((newRate - previousRate.current) / previousRate.current) * 100;
          setGoldChange(parseFloat(change.toFixed(2)));
        }
        
        previousRate.current = newRate;
        setGoldRate(newRate);
        
        // Set timestamp
        if (data.timestamp) {
          const time = new Date(data.timestamp);
          const now = new Date();
          const diffInMinutes = Math.floor((now - time) / (1000 * 60));
          
          if (diffInMinutes < 1) {
            setLastUpdated('Just now');
          } else if (diffInMinutes < 60) {
            setLastUpdated(`${diffInMinutes}m ago`);
          } else {
            setLastUpdated(time.toLocaleTimeString('en-IN', {
              hour: '2-digit',
              minute: '2-digit',
              timeZone: 'Asia/Kolkata'
            }));
          }
        }
        
        setRateError(false);
      } else {
        throw new Error(data.error || 'Invalid response format');
      }
    } catch (error) {
      console.error('Failed to fetch gold rate:', error);
      setRateError(true);
      // Keep the last known rate instead of resetting
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    mounted.current = true
    
    // Check screen size
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    // Initial gold rate fetch
    fetchGoldRate();
    
    // Set up interval for refreshing gold rate (every 5 minutes)
    rateIntervalRef.current = setInterval(fetchGoldRate, 5 * 60 * 1000);
    
    // Also update change indicator more frequently (every 30 seconds)
    const changeInterval = setInterval(() => {
      if (mounted.current && !rateError) {
        // Simulate small market fluctuations
        const fluctuation = (Math.random() * 0.2) - 0.1; // ±0.1%
        setGoldChange(prev => {
          const newChange = prev + fluctuation;
          // Keep change within reasonable bounds
          return Math.max(-5, Math.min(5, parseFloat(newChange.toFixed(2))));
        });
      }
    }, 30000);

    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    
    return () => {
      if (rateIntervalRef.current) {
        clearInterval(rateIntervalRef.current);
      }
      clearInterval(changeInterval);
      window.removeEventListener('resize', checkScreenSize)
      document.removeEventListener('mousedown', handleClickOutside)
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current)
      }
      mounted.current = false;
    }
  }, [])

  useEffect(() => {
    if (mounted.current) {
      const handleScroll = () => {
        const currentScrollY = window.scrollY
        
        // Always show navbar when at top
        if (currentScrollY <= 50) {
          setIsScrolled(false)
          setShowNavbar(true)
          return
        }
        
        // Hide navbar when scrolling down, show when scrolling up
        if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
          // Scrolling down
          setShowNavbar(false)
        } else {
          // Scrolling up
          setShowNavbar(true)
        }
        
        setIsScrolled(currentScrollY > 50)
        setActiveDropdown(null) // Close dropdowns on scroll
        
        lastScrollY.current = currentScrollY
      }
      
      window.addEventListener('scroll', handleScroll, { passive: true })
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Main navigation items based on the image
  const mainNavItems = [
    { 
      name: 'OUR LEGACY', 
      href: '#legacy',
      icon: <FaCrown className="inline mr-2 text-amber-600" />,
      dropdown: [
        { 
          name: 'About us', 
          href: 'aboutus',
          icon: <FaHistory className="text-amber-500" />,
          description: 'Trust and excellence'
        },
        { 
          name: 'Management', 
          href: 'management',
          icon: <FaAward className="text-amber-500" />,
          description: ''
        },
      ]
    },
    { 
      name: 'OUR SERVICES', 
      href: '#services',
      icon: <RiCustomerService2Fill className="inline mr-2 text-amber-600" />,
      dropdown: [
        { 
          name: 'Sell Gold', 
          href: 'sellGold',
          icon: <GiGoldBar className="text-amber-500" />,
          description: 'Sell your Old Ornaments'
        },
        { 
          name: 'Release Pleadeged Gold', 
          href: 'releaseGold',
          icon: <GiDiamondRing className="text-amber-500" />,
          description: ''
        },
      ]
    },
  ]

  // Additional navigation items
  const additionalNavItems = [
    // { 
    //   name: 'EXPERIENCE', 
    //   href: '#experience',
    // },
    // { 
    //   name: 'PARTNER WITH US', 
    //   href: '#partner',
    // },
    { 
      name: 'BLOG', 
      href: '#blog'
    },
    { 
      name: 'REACH US', 
      href: 'reach-us',
      icon: <FaMapMarkerAlt className="inline mr-1" />
    }
  ]

  const toggleDropdown = (itemName) => {
    // Clear any existing timeout
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
    }
    
    // If clicking the same dropdown, close it immediately
    if (activeDropdown === itemName) {
      setActiveDropdown(null)
      return
    }
    
    // Close current dropdown first with a delay
    setActiveDropdown(null)
    
    // Open new dropdown after a short delay for smoother transition
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(itemName)
    }, 50)
  }

  const handleDropdownMouseEnter = (itemName) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
    }
    setActiveDropdown(itemName)
  }

  const handleDropdownMouseLeave = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
    }
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 200) // Small delay before closing on mouse leave
  }

  // Gold Rate Display Component
  const GoldRateDisplay = () => {
    return (
      <div className="flex items-center gap-4 bg-amber-800/50 px-4 py-2 rounded-full">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${
            isLoading ? 'animate-pulse bg-gray-400' : 
            rateError ? 'bg-red-400' : 
            'bg-yellow-400 animate-pulse'
          }`}></div>
          <span className="text-sm font-semibold">
            {isLoading ? 'LOADING...' : rateError ? 'OFFLINE' : 'LIVE GOLD'}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <GiGoldBar className="text-yellow-400" />
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2">
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-3 w-3 border-2 border-yellow-400 border-t-transparent"></div>
                  <span className="font-bold text-sm">Loading...</span>
                </div>
              ) : rateError ? (
                <div className="flex items-center gap-2">
                  <FaExclamationTriangle className="text-red-300" />
                  <span className="font-bold text-sm">Offline</span>
                </div>
              ) : (
                <>
                  <span className="font-bold">24K: ₹{goldRate.toLocaleString('en-IN')}/g</span>
                  <span className={`text-sm ${goldChange >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                    {goldChange >= 0 ? '↗' : '↘'} {Math.abs(goldChange).toFixed(2)}%
                  </span>
                </>
              )}
            </div>
            
           
            
            {rateError && (
              <div className="text-xs text-amber-200">
                Using last known rate
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Mobile Gold Rate Display
  const MobileGoldRateDisplay = () => {
    return (
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-center gap-4 bg-amber-800/50 px-4 py-2 rounded-full">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              isLoading ? 'animate-pulse bg-gray-400' : 
              rateError ? 'bg-red-400' : 
              'bg-yellow-400 animate-pulse'
            }`}></div>
            <span className="text-sm font-semibold text-white">
              {isLoading ? 'LOADING...' : rateError ? 'OFFLINE' : 'LIVE GOLD'}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <GiGoldBar className="text-yellow-400" />
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-2">
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-3 w-3 border-2 border-yellow-400 border-t-transparent"></div>
                    <span className="font-bold text-white text-sm">Loading...</span>
                  </div>
                ) : rateError ? (
                  <div className="flex items-center gap-2">
                    <FaExclamationTriangle className="text-red-300" />
                    <span className="font-bold text-white text-sm">Offline</span>
                  </div>
                ) : (
                  <>
                    <span className="font-bold text-white">24K: ₹{goldRate.toLocaleString('en-IN')}/g</span>
                  </>
                )}
              </div>
              
              {!isLoading && !rateError && lastUpdated && (
                <div className="flex items-center gap-1 text-xs text-amber-200">
                  <FaSyncAlt className="text-xs" />
                  <span>Updated: {lastUpdated}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {rateError && (
          <div className="mt-2 text-center text-xs text-amber-200">
            Using last known rate
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Top Banner with Gold Rate - Hidden on medium and small screens */}
      {showNotification && !isMobile && (
        <div className="fixed top-0 left-0 w-full bg-gradient-to-r from-black to-black/60 text-amber-50 py-3 px-4 z-50 transition-transform duration-300"
             style={{ transform: showNavbar ? 'translateY(0)' : 'translateY(-100%)' }}>
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2 hover:text-amber-200 transition-colors cursor-pointer group">
                <FaPhoneAlt className="text-amber-200 group-hover:scale-110 transition-transform" />
                <a href="tel:+919590704444" className="text-sm font-medium">
                  +91 95907 04444
                </a>
              </span>
              <span className="hidden lg:flex items-center gap-2 hover:text-amber-200 transition-colors cursor-pointer group">
                <FaEnvelope className="text-amber-200 group-hover:scale-110 transition-transform" />
                <a href="mailto:info@goldcentro.com" className="text-sm font-medium">
                  info@goldcentro.com
                </a>
              </span>
            </div>
            
            {/* Live Gold Rate Ticker */}
            <GoldRateDisplay />
          </div>
        </div>
      )}

      {/* Main Navbar - Fixed with smooth hide/show */}
      <nav 
        ref={dropdownRef}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          showNotification && !isMobile ? 'mt-16' : 'mt-0'
        } ${
          isScrolled 
            ? 'bg-gradient-to-r from-primary via-yellow-100 to-yellow-400 backdrop-blur-md z-40 shadow-2xl' 
            : 'bg-gradient-to-b from-primary to-primary/80'
        }`}
        style={{ 
          transform: showNavbar ? 'translateY(0)' : 'translateY(-100%)',
          opacity: showNavbar ? 1 : 0 
        }}
      >
        <div className="container mx-auto pt-6">
          <div className="flex justify-between items-center py-1">
            {/* Logo with 3D animation */}
            <div className="flex items-center">
              <Link href="/" className="block">
                <div className="relative group perspective-1000">
                  {/* 3D Container */}
                  <div className="relative transform-style-3d group-hover:rotate-y-10 transition-transform duration-500">
                    {/* Front side */}
                    <div className="relative text-white font-bold text-2xl rounded-lg">
                      <div className="flex items-center">
                        <img 
                          src="/images/lg_goldcentro.png" 
                          alt="Gold Centro" 
                          className={`w-auto logo-3d ${isMobile ? 'h-12' : 'h-16'}`} 
                          style={{ maxWidth: isMobile ? '280px' : '350px' }}
                        />
                      </div>
                    </div>
                    {/* Top sliding image */}
                    <div className="absolute top-0 left-0 w-full h-0 overflow-hidden group-hover:h-10 group-hover:-top-10 transition-all duration-500 ease-out rounded-t-lg">
                      <img 
                        src="/images/coins_lg.png" 
                        alt="Gold Centro" 
                        className="w-full h-auto object-contain p-2"
                        style={{ filter: 'brightness(1.2)' }}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation - Center aligned like image */}
            <div className="hidden lg:flex items-center justify-center space-x-4">
              {mainNavItems?.map((item) => (
                <div 
                  key={item.name} 
                  className="relative group"
                  onMouseEnter={() => handleDropdownMouseEnter(item.name)}
                  onMouseLeave={handleDropdownMouseLeave}
                >
                  <button
                    onClick={() => toggleDropdown(item.name)}
                    className="flex items-center text-black hover:text-amber-200 font-semibold tracking-wider text-sm uppercase transition-colors duration-200 relative px-4 py-2"
                  >
                    {item.name}
                    <FaChevronDown className={`ml-2 text-xs transition-all duration-300 ease-out ${
                      activeDropdown === item.name ? 'rotate-180 transform scale-110' : ''
                    }`} />
                    {/* Active indicator line */}
                    <div className={`absolute bottom-0 left-1/2 w-0 h-0.5 bg-amber-300 transition-all duration-300 ease-out transform -translate-x-1/2 ${
                      activeDropdown === item.name ? 'w-full' : ''
                    }`}></div>
                  </button>

                  {/* Dropdown Menu with smoother animation */}
                  <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-1 w-96 z-50 transition-all duration-300 ease-out ${
                    activeDropdown === item.name 
                      ? 'opacity-100 visible translate-y-0' 
                      : 'opacity-0 invisible -translate-y-2'
                  }`}>
                    <div className="bg-white rounded-2xl shadow-2xl border border-amber-100 overflow-hidden">
                      <div className="p-4">
                        <div className="grid grid-cols-2 gap-2">
                          {item?.dropdown.map((subItem) => (
                            <a
                              key={subItem.name}
                              href={subItem.href}
                              className="group/sub p-4 rounded-xl hover:bg-amber-50 transition-all duration-200 border border-transparent hover:border-amber-200 transform hover:-translate-y-0.5 hover:shadow-lg"
                              onClick={() => {
                                setActiveDropdown(null)
                                setIsMobileMenuOpen(false)
                              }}
                            >
                              <div className="flex items-start gap-3">
                                <div className="p-2 bg-amber-100 rounded-lg group-hover/sub:bg-amber-200 transition-all duration-300 group-hover/sub:rotate-6 group-hover/sub:scale-105">
                                  {subItem.icon}
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-800 group-hover/sub:text-amber-700 transition-colors duration-300">
                                    {subItem.name}
                                  </h4>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {subItem.description}
                                  </p>
                                </div>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Additional Navigation Items */}
              <div className="flex items-center space-x-6 ml-6">
                {additionalNavItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-black hover:text-amber-200 font-medium text-sm transition-colors duration-200 relative group px-2"
                  >
                    {item.name}
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-300 group-hover:w-full transition-all duration-300"></div>
                  </a>
                ))}
              </div>
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <button className="px-6 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg font-medium transform hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0.5" 
              onClick={()=> setOpen(true)}>
                ENQUIRE NOW
              </button>
            </div>

            {/* Mobile Menu Button with 3D effect */}
            <button
              className="lg:hidden p-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0.5"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>

          {/* Mobile Menu with smoother animation */}
          <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen 
              ? 'max-h-[2000px] opacity-100 mt-4' 
              : 'max-h-0 opacity-0'
          }`}>
            <div className="bg-white rounded-2xl shadow-2xl border border-amber-100 overflow-hidden">
              <div className="p-6">
                {/* Mobile Navigation Items */}
                <div className="space-y-1">
                  {/* Main Navigation Items */}
                  {mainNavItems.map((item) => (
                    <div key={item.name} className="border-b border-gray-100 last:border-0">
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className="w-full flex items-center justify-between p-4 text-gray-800 hover:text-amber-700 hover:bg-amber-50 rounded-xl transition-all duration-300"
                      >
                        <div className="flex items-center">
                          <span className="ml-3 font-semibold">{item.name}</span>
                        </div>
                        <FaChevronDown className={`text-gray-400 transition-transform duration-300 ${
                          activeDropdown === item.name ? 'rotate-180' : ''
                        }`} />
                      </button>
                      
                      {/* Mobile Dropdown with smoother animation */}
                      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        activeDropdown === item.name 
                          ? 'max-h-[500px] opacity-100' 
                          : 'max-h-0 opacity-0'
                      }`}>
                        <div className="ml-4 pl-4 border-l-2 border-amber-200 mb-4 space-y-3 pt-2">
                          {item.dropdown.map((subItem) => (
                            <a
                              key={subItem.name}
                              href={subItem.href}
                              className="flex items-start gap-3 p-3 text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all duration-300 transform hover:translate-x-1"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <div className="p-2 bg-amber-100 rounded-lg transition-transform duration-300 hover:rotate-6 hover:scale-105">
                                {subItem.icon}
                              </div>
                              <div>
                                <div className="font-medium">{subItem.name}</div>
                                <div className="text-xs text-gray-500 mt-1">
                                  {subItem.description}
                                </div>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Additional Navigation Items */}
                  <div className="pt-4 mt-4 border-t border-gray-200">
                    {additionalNavItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="flex items-center justify-between p-4 text-gray-700 hover:text-amber-700 hover:bg-amber-50 rounded-xl transition-all duration-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div className="flex items-center">
                          <span className="font-medium">{item.name}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Mobile Action Buttons with 3D effect */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <button className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all font-semibold mb-4 transform hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0.5">
                    BOOK APPOINTMENT
                  </button>
                  
                  <div className="flex justify-center space-x-6">
                    <a
                      href="tel:+919590704444"
                      className="p-3 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-all duration-300 transform hover:scale-110 hover:rotate-12"
                      title="Call Us"
                    >
                      <FaPhoneAlt />
                    </a>
                    <a
                      href="https://wa.me/919590704444"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-green-50 text-green-600 rounded-full hover:bg-green-100 transition-all duration-300 transform hover:scale-110 hover:rotate-12"
                      title="WhatsApp"
                    >
                      <FaWhatsapp />
                    </a>
                    <a
                      href="mailto:info@goldcentro.com"
                      className="p-3 bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition-all duration-300 transform hover:scale-110 hover:rotate-12"
                      title="Email"
                    >
                      <FaEnvelope />
                    </a>
                  </div>
                  
                  {/* Show gold rate in mobile menu */}
                  <MobileGoldRateDisplay />
                  
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Add padding to body content to account for fixed navbar */}
      <div 
        className={`transition-all duration-500 ${
          showNotification && !isMobile ? 'pt-40' : 'pt-18'
        }`}
      >
        {/* This div will push content down */}
      </div>

        <KnowTodaysGoldRateModal 
        isOpen={open} 
        onClose={() => setOpen(false)} 
      />

      <style jsx>{`
        /* 3D Logo animation */
        @keyframes float3D {
          0%, 100% {
            transform: translateY(0px) rotateX(0deg) rotateY(0deg);
          }
          25% {
            transform: translateY(-4px) rotateX(5deg) rotateY(2deg);
          }
          50% {
            transform: translateY(0px) rotateX(0deg) rotateY(0deg);
          }
          75% {
            transform: translateY(-2px) rotateX(-3deg) rotateY(-1deg);
          }
        }

        .logo-3d {
          animation: float3D 6s ease-in-out infinite;
        }

        /* 3D transformations */
        .perspective-1000 {
          perspective: 1000px;
        }

        .transform-style-3d {
          transform-style: preserve-3d;
        }

        .group:hover .group-hover\:rotate-y-10 {
          transform: rotateY(10deg);
        }

        /* Smooth dropdown animations */
        .dropdown-enter {
          opacity: 0;
          transform: translate(-50%, -10px);
        }
        
        .dropdown-enter-active {
          opacity: 1;
          transform: translate(-50%, 0);
          transition: opacity 300ms ease-out, transform 300ms ease-out;
        }
        
        .dropdown-exit {
          opacity: 1;
          transform: translate(-50%, 0);
        }
        
        .dropdown-exit-active {
          opacity: 0;
          transform: translate(-50%, -10px);
          transition: opacity 300ms ease-out, transform 300ms ease-out;
        }
        
        /* Prevent layout shifts */
        .dropdown-container {
          will-change: transform, opacity;
          backface-visibility: hidden;
          -webkit-font-smoothing: antialiased;
        }
        
        /* Custom scrollbar for dropdown */
        .overflow-y-auto::-webkit-scrollbar {
          width: 4px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #d97706;
          border-radius: 4px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #b45309;
        }
      `}</style>
    </>
  )
}