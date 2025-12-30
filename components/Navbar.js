'use client'

import { useState, useEffect, useRef } from 'react'
import { 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaBars, 
  FaTimes, 
  FaSearch, 
  FaUser,
  FaShoppingCart,
  FaChevronDown,
  FaBell,
  FaWhatsapp,
  FaEnvelope
} from 'react-icons/fa'
import { MdDiamond, MdTrendingUp, MdLocalOffer } from 'react-icons/md'
import { GiGoldBar } from 'react-icons/gi'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [showNotification, setShowNotification] = useState(true)
  const [goldRate, setGoldRate] = useState(6450)
  const [goldChange, setGoldChange] = useState(1.2)
  const mounted = useRef(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    mounted.current = true
    
    // Simulate live gold rate updates
    const interval = setInterval(() => {
      setGoldRate(prev => prev + (Math.random() * 10 - 5))
      setGoldChange(prev => prev + (Math.random() * 0.5 - 0.25))
    }, 30000)

    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    
    return () => {
      clearInterval(interval)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (mounted.current) {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 30)
        setActiveDropdown(null) // Close dropdowns on scroll
      }
      window.addEventListener('scroll', handleScroll, { passive: true })
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const navItems = [
    { 
      name: 'Live Gold', 
      href: '#rates',
      icon: <MdTrendingUp className="inline mr-1" />,
      dropdown: [
        { name: '24K Gold Rate', href: '#24k' },
        { name: '22K Gold Rate', href: '#22k' },
        { name: 'Silver Rate', href: '#silver' },
        { name: 'Historical Charts', href: '#charts' }
      ]
    },
    { 
      name: 'Buy/Sell', 
      href: '#buy-sell',
      icon: <GiGoldBar className="inline mr-1" />,
      dropdown: [
        { name: 'Buy Gold', href: '#buy' },
        { name: 'Sell Gold', href: '#sell' },
        { name: 'Gold Loan', href: '#loan' },
        { name: 'Release Gold', href: '#release' }
      ]
    },
    { 
      name: 'Services', 
      href: '#services',
      icon: <MdDiamond className="inline mr-1" />,
      dropdown: [
        { name: 'Gold Testing', href: '#testing' },
        { name: 'Jewelry Making', href: '#jewelry' },
        { name: 'Gold Savings', href: '#savings' },
        { name: 'Investment Plans', href: '#investment' }
      ]
    },
    { name: 'Branches', href: '#branches', icon: <FaMapMarkerAlt className="inline mr-1" /> },
    { name: 'Offers', href: '#offers', icon: <MdLocalOffer className="inline mr-1" />, badge: 'HOT' },
    { name: 'About Us', href: '#about' },
  ]

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery)
      setIsSearchOpen(false)
    }
  }

  const toggleDropdown = (itemName) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName)
  }

  if (!mounted.current) {
    return (
      <>
        <div className="bg-gradient-to-r from-amber-900 to-amber-800 text-amber-50 py-3 px-4">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <FaPhoneAlt className="text-amber-200" />
                <span className="text-sm">+91 95907 04444</span>
              </span>
            </div>
          </div>
        </div>
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md">
          <div className="container mx-auto px-4 py-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="relative">
                  <div className="bg-gradient-to-br from-amber-500 to-amber-700 text-white font-bold text-2xl px-3 py-1 rounded-lg shadow-lg">
                    GC
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                </div>
                <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
                  Gold Centro
                </span>
              </div>
            </div>
          </div>
        </nav>
      </>
    )
  }

  return (
    <>
      {/* Top Banner with Gold Rate */}
      {showNotification && (
        <div className="bg-gradient-to-r from-secondary via-secondary/50 to-secondary text-white py-2 px-4 relative">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-6 mb-2 md:mb-0">
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
            <div className="flex items-center gap-4 bg-amber-800/50 px-4 py-1 rounded-full">
              <div className="flex items-center gap-2 animate-pulse">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-sm font-semibold">LIVE</span>
              </div>
              <div className="flex items-center gap-2">
                <GiGoldBar className="text-yellow-400" />
                <span className="font-bold">24K: ₹{goldRate.toFixed(2)}/g</span>
                <span className={`text-sm ${goldChange >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                  {goldChange >= 0 ? '↗' : '↘'} {Math.abs(goldChange).toFixed(2)}%
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowNotification(false)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-amber-300 hover:text-white transition-colors"
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <nav 
        ref={dropdownRef}
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-xl border-b border-amber-100' 
            : 'bg-gradient-to-b from-white/90 to-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-0">
            {/* Logo with Animation */}
            {/* <div className="flex items-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-br from-amber-500 to-amber-700 text-white font-bold text-2xl px-3 py-2 rounded-xl shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center">
                    <GiGoldBar className="mr-1" />
                    <span>GC</span>
                  </div>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
              </div>
              <div className="ml-4">
                <span className="text-2xl font-bold bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
                  Gold Centro
                </span>
                <p className="text-xs text-gray-500">Trusted Since 1995</p>
              </div>
            </div> */}

            
            <button
              className="lg:hidden p-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>

          {/* Mobile Menu - Enhanced */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 bg-white rounded-2xl shadow-2xl border border-amber-100 animate-slideDown">
              <div className="p-4">
                {/* Search in Mobile */}
                <div className="mb-6">
                  <form onSubmit={handleSearch} className="relative">
                    <input
                      type="text"
                      placeholder="Search gold, services..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-amber-200 rounded-xl focus:outline-none focus:border-amber-500"
                    />
                    <FaSearch className="absolute left-4 top-3.5 text-gray-400" />
                  </form>
                </div>

                {/* Mobile Navigation Items */}
                <div className="space-y-2">
                  {navItems.map((item) => (
                    <div key={item.name} className="group">
                      <a
                        href={item.href}
                        className="flex items-center justify-between p-3 text-gray-700 hover:text-amber-700 hover:bg-amber-50 rounded-xl transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div className="flex items-center">
                          {item.icon}
                          <span className="ml-2 font-medium">{item.name}</span>
                          {item.badge && (
                            <span className="ml-2 px-2 py-0.5 text-xs bg-red-500 text-white rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        {item.dropdown && <FaChevronDown className="text-gray-400" />}
                      </a>
                      
                      {/* Mobile Dropdown */}
                      {item.dropdown && (
                        <div className="ml-6 pl-4 border-l-2 border-amber-200 mt-2 space-y-2">
                          {item.dropdown.map((subItem) => (
                            <a
                              key={subItem.name}
                              href={subItem.href}
                              className="block p-2 text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {subItem.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Mobile Action Buttons */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <button className="py-3 border-2 border-amber-500 text-amber-600 rounded-xl hover:bg-amber-50 transition-colors font-medium">
                      Login
                    </button>
                    <button className="py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all font-medium">
                      Register
                    </button>
                  </div>
                  
                  <div className="flex justify-center space-x-6">
                    <a
                      href="tel:+919590704444"
                      className="p-3 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
                      title="Call Us"
                    >
                      <FaPhoneAlt />
                    </a>
                    <a
                      href="https://wa.me/919590704444"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-green-50 text-green-600 rounded-full hover:bg-green-100 transition-colors"
                      title="WhatsApp"
                    >
                      <FaWhatsapp />
                    </a>
                    <a
                      href="mailto:info@goldcentro.com"
                      className="p-3 bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition-colors"
                      title="Email"
                    >
                      <FaEnvelope />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
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