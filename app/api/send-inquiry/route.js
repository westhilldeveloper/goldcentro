// app/api/send-inquiry/route.js
import { NextResponse } from 'next/server';
import { sendInquiryEmail } from '../../lib/email';

export async function POST(request) {
  try {
    const formData = await request.json();

    // Validate required fields
    if (!formData.name || !formData.quantity || !formData.mobile) {
      return NextResponse.json(
        { error: 'Name, quantity, and mobile number are required' },
        { status: 400 }
      );
    }

    // Send email
    await sendInquiryEmail(formData);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Inquiry submitted successfully! Our team will contact you within 24 hours.' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Email error details:', error);
    
    // More specific error messages
    let errorMessage = 'Failed to send inquiry. Please try again later.';
    
    if (error.code === 'EAUTH') {
      errorMessage = 'Email authentication failed. Please check your email credentials.';
    } else if (error.code === 'ESOCKET') {
      errorMessage = 'Network error. Please check your internet connection.';
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}