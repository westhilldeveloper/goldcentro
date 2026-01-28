import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Test MetalPriceAPI directly
    const apiKey = "bbdbc3b481c4fb2a8627f870f11158f4";
    const url = `https://api.metalpriceapi.com/v1/latest?api_key=${apiKey}&base=USD&currencies=XAU,INR`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      return NextResponse.json({
        error: `API failed: ${response.status}`,
        status: response.status,
      }, { status: response.status });
    }
    
    const data = await response.json();
    
    return NextResponse.json({
      success: true,
      data: data,
      message: "API is working correctly",
    });
    
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      message: "API test failed",
    }, { status: 500 });
  }
}