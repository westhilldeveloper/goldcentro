import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()
    const { location, radius = 10 } = body

    if (!location) {
      return NextResponse.json(
        {
          success: false,
          message: 'Location is required'
        },
        { status: 400 }
      )
    }

    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Mock branches data
    const branches = [
      {
        id: 1,
        name: 'Gold Centro Main Branch',
        address: '123 Business District, Mumbai, Maharashtra 400001',
        phone: '+91 95907 04444',
        hours: '10:00 AM - 7:00 PM',
        distance: '0.5 km',
        coordinates: { lat: 19.0760, lng: 72.8777 },
        services: ['Buy Gold', 'Sell Gold', 'Gold Loan', 'Valuation']
      },
      {
        id: 2,
        name: 'Gold Centro Delhi Branch',
        address: '456 Connaught Place, New Delhi 110001',
        phone: '+91 95907 04445',
        hours: '10:00 AM - 7:00 PM',
        distance: '1.2 km',
        coordinates: { lat: 28.6139, lng: 77.2090 },
        services: ['Buy Gold', 'Sell Gold']
      },
      {
        id: 3,
        name: 'Gold Centro Bangalore Branch',
        address: '789 MG Road, Bangalore, Karnataka 560001',
        phone: '+91 95907 04446',
        hours: '10:00 AM - 7:00 PM',
        distance: '0.8 km',
        coordinates: { lat: 12.9716, lng: 77.5946 },
        services: ['Buy Gold', 'Sell Gold', 'Release Gold']
      }
    ]

    return NextResponse.json({
      success: true,
      data: {
        branches,
        location,
        radius,
        count: branches.length,
        timestamp: new Date().toISOString()
      },
      message: 'Branches found successfully'
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to find branches',
        error: error.message
      },
      { status: 500 }
    )
  }
}