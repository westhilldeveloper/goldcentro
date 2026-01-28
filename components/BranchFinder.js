'use client'

import { useState, useEffect } from 'react'
import { FaMapMarkerAlt, FaPhone, FaClock, FaCar, FaSearch, FaDirections } from 'react-icons/fa'
import toast from 'react-hot-toast'

export default function BranchFinder() {
  const [location, setLocation] = useState('')
  const [branches, setBranches] = useState([])
  const [selectedBranch, setSelectedBranch] = useState(null)
  const [loading, setLoading] = useState(false)
  const [userLocation, setUserLocation] = useState(null)
  const [locationPermissionGranted, setLocationPermissionGranted] = useState(false)

  // Kochi coordinates as fallback
  const KOCHI_COORDINATES = { lat: 9.9312, lng: 76.2673 }

  const sampleBranches = [
    {
      id: 1,
      name: 'Gold Centro Main Branch',
      address: '123 Business District, Mumbai, Maharashtra 400001',
      phone: '+91 95907 04444',
      hours: '10:00 AM - 7:00 PM',
      coordinates: { lat: 19.0760, lng: 72.8777 }
    },
    {
      id: 2,
      name: 'Gold Centro Delhi Branch',
      address: '456 Connaught Place, New Delhi 110001',
      phone: '+91 95907 04445',
      hours: '10:00 AM - 7:00 PM',
      coordinates: { lat: 28.6139, lng: 77.2090 }
    },
    {
      id: 3,
      name: 'Gold Centro Bangalore Branch',
      address: '789 MG Road, Bangalore, Karnataka 560001',
      phone: '+91 95907 04446',
      hours: '10:00 AM - 7:00 PM',
      coordinates: { lat: 12.9716, lng: 77.5946 }
    },
  ]

  const fetchCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by your browser'))
        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const locationData = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          setUserLocation(locationData)
          setLocationPermissionGranted(true)
          resolve(locationData)
        },
        (error) => {
          setLocationPermissionGranted(false)
          reject(error)
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 } // maximumAge: 0 forces fresh location
      )
    })
  }

  const handleFindBranches = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      let currentLocation = userLocation
      
      // Try to get fresh location if permission might be granted now
      try {
        const freshLocation = await fetchCurrentLocation()
        currentLocation = freshLocation
        toast.success('Location updated successfully')
      } catch (error) {
        // If location fetch fails, use existing userLocation or Kochi fallback
        if (!currentLocation) {
          currentLocation = KOCHI_COORDINATES
          toast.info('Using  default location')
        }
      }

      await new Promise(resolve => setTimeout(resolve, 500))

      const branchesWithDistance = sampleBranches.map(branch => {
        const distance = calculateDistance(
          currentLocation.lat,
          currentLocation.lng,
          branch.coordinates.lat,
          branch.coordinates.lng
        )

        return {
          ...branch,
          distance: `${distance.toFixed(2)}`,
          distanceValue: distance,
        }
      })

      // Sort nearest first
      branchesWithDistance.sort(
        (a, b) => a.distanceValue - b.distanceValue
      )

      setBranches(branchesWithDistance)
      setSelectedBranch(branchesWithDistance[0])

      const locationName = locationPermissionGranted ? 'your location' : 'Kochi (default)'
      toast.success(`Found ${branchesWithDistance.length} branches near ${locationName}`)
    } catch (error) {
      toast.error('Failed to find branches')
    } finally {
      setLoading(false)
    }
  }

  const handleGetDirections = (branch) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${branch.coordinates.lat},${branch.coordinates.lng}`
    window.open(url, '_blank')
  }

  const handleCallBranch = (phone) => {
    window.location.href = `tel:${phone}`
  }

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser. Using  default location.')
      setUserLocation(KOCHI_COORDINATES)
      setLocationPermissionGranted(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
        setLocationPermissionGranted(true)
        toast.success('Location detected successfully')
      },
      () => {
        toast.error('Unable to fetch your location. Using  default location.')
        setUserLocation(KOCHI_COORDINATES)
        setLocationPermissionGranted(false)
      },
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }

  useEffect(() => {
    getCurrentLocation()
    
    // Also initialize branches with Kochi as default location on component mount
    const initializeBranches = () => {
      const branchesWithDistance = sampleBranches.map(branch => {
        const distance = calculateDistance(
          KOCHI_COORDINATES.lat,
          KOCHI_COORDINATES.lng,
          branch.coordinates.lat,
          branch.coordinates.lng
        )

        return {
          ...branch,
          distance: `${distance.toFixed(2)}`,
          distanceValue: distance,
        }
      })

      branchesWithDistance.sort((a, b) => a.distanceValue - b.distanceValue)
      setBranches(branchesWithDistance)
      setSelectedBranch(branchesWithDistance[0])
    }

    initializeBranches()
  }, [])

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180
    const R = 6371 // Earth radius in KM

    const dLat = toRad(lat2 - lat1)
    const dLon = toRad(lon2 - lon1)

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  return (
    <section id="branches" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto mb-12">
          <form onSubmit={handleFindBranches} className="relative">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <FaMapMarkerAlt className="absolute left-4 top-4 text-gray-400" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter your location, city, or PIN code"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-full focus:outline-none focus:border-primary"
                  disabled={loading}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-primary text-secondary px-8 py-3 rounded-full font-semibold hover:bg-yellow-500 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                <FaSearch />
                {loading ? 'Searching...' : 'Find Branches'}
              </button>
            </div>
          </form>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm">
            <div className={`w-3 h-3 rounded-full ${locationPermissionGranted ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
            <p className="text-gray-500">
              {locationPermissionGranted 
                ? 'Location access granted. Click "Find Branches" for accurate results.' 
                : 'Location access not granted. Using  default location. Allow location for accurate results.'}
            </p>
          </div>
        </div>

        {/* Branches Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Branches List */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {branches.map((branch) => (
                <div
                  key={branch.id}
                  className={`bg-gray-50 rounded-xl p-6 border-2 transition-all cursor-pointer ${
                    selectedBranch?.id === branch.id ? 'border-primary shadow-lg' : 'border-transparent'
                  }`}
                  onClick={() => setSelectedBranch(branch)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-secondary mb-2">{branch.name}</h3>
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <FaMapMarkerAlt className="text-primary" />
                        <span className="text-sm">{branch.address}</span>
                      </div>
                    </div>
                    <div className="bg-primary text-secondary px-4 py-1 rounded-full text-xs font-semibold">
                      {branch.distance} KM
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaPhone className="text-primary" />
                      <span className="text-sm">{branch.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaClock className="text-primary" />
                      <span className="text-sm">{branch.hours}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleCallBranch(branch.phone)
                      }}
                      className="flex-1 bg-secondary text-accent py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                    >
                      <FaPhone /> Call Now
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleGetDirections(branch)
                      }}
                      className="flex-1 border-2 border-primary text-primary py-2 rounded-lg hover:bg-primary hover:text-secondary transition-colors flex items-center justify-center gap-2"
                    >
                      <FaDirections /> Directions
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {branches.length === 0 && (
              <div className="text-center py-12">
                <FaMapMarkerAlt className="text-5xl text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No branches found</h3>
                <p className="text-gray-500">Enter your location to find nearest branches</p>
              </div>
            )}
          </div>

          {/* Instructions Panel */}
          <div className="bg-primary bg-opacity-10 rounded-xl p-6 h-fit">
            <h3 className="font-bold text-xl text-secondary mb-6">Before Visiting</h3>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-4 shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-primary text-secondary w-8 h-8 rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <h4 className="font-semibold text-secondary">Carry ID Proof</h4>
                </div>
                <p className="text-gray-600 text-sm">
                  Bring any government-issued ID proof (Aadhaar, PAN, Driving License, Passport)
                </p>
              </div>

              <div className="bg-white rounded-lg p-4 shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-primary text-secondary w-8 h-8 rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <h4 className="font-semibold text-secondary">Carry Address Proof</h4>
                </div>
                <p className="text-gray-600 text-sm">
                  Utility bill, Bank statement, or any document with your current address
                </p>
              </div>

              <div className="bg-white rounded-lg p-4 shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-primary text-secondary w-8 h-8 rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <h4 className="font-semibold text-secondary">Original Gold Items</h4>
                </div>
                <p className="text-gray-600 text-sm">
                  Bring your gold items in original condition with any certificates if available
                </p>
              </div>

              <div className="bg-accent border border-primary rounded-lg p-4">
                <h4 className="font-semibold text-secondary mb-2">Need Help?</h4>
                <p className="text-gray-600 text-sm mb-3">
                  Call our customer support for assistance
                </p>
                <a
                  href="tel:+919590704444"
                  className="bg-primary text-secondary py-2 px-4 rounded-lg font-semibold hover:bg-yellow-500 transition-colors inline-flex items-center gap-2"
                >
                  <FaPhone /> +91 95907 04444
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}