import { NextResponse } from 'next/server'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const metal = searchParams.get('metal') || 'gold'

    // Simulate external API call
    await new Promise(resolve => setTimeout(resolve, 500))

    // Mock rates data
    const rates = {
      gold: {
        24: 6200 + Math.random() * 50 - 25,
        22: 5800 + Math.random() * 40 - 20,
        18: 4750 + Math.random() * 30 - 15,
      },
      silver: 78 + Math.random() * 5 - 2.5,
      platinum: 3200 + Math.random() * 100 - 50,
      timestamp: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      data: rates,
      message: 'Rates fetched successfully'
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch rates',
        error: error.message
      },
      { status: 500 }
    )
  }
}