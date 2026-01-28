import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  console.log("📨 Pledged Gold Calculator Form Submitted");
  
  try {
    // 1. Parse request body
    let body;
    try {
      body = await req.json();
      console.log("✅ Request received:", {
        name: body.name,
        mobile: body.mobile,
        email: body.email,
        institution: body.institution,
        hasGoldData: !!(body.grossWeight && body.karats),
      });
    } catch (jsonError) {
      console.error("❌ JSON parsing error:", jsonError);
      return NextResponse.json(
        { 
          success: false, 
          message: "Invalid request format. Please check your data." 
        },
        { status: 400 }
      );
    }

    // 2. Validate required fields
    const requiredFields = [
      { field: 'name', label: 'Name' },
      { field: 'mobile', label: 'Mobile' },
      { field: 'email', label: 'Email' },
      { field: 'institution', label: 'Financial Institution' },
      { field: 'grossWeight', label: 'Gold Weight' },
      { field: 'karats', label: 'Gold Purity' },
    ];

    const missingFields = requiredFields
      .filter(({ field }) => !body[field])
      .map(({ label }) => label);

    if (missingFields.length > 0) {
      console.log("❌ Missing fields:", missingFields);
      return NextResponse.json(
        { 
          success: false,
          message: `Missing required fields: ${missingFields.join(', ')}` 
        },
        { status: 400 }
      );
    }

    // 3. Validate consent
    if (!body.consent) {
      return NextResponse.json(
        { 
          success: false,
          message: "You must provide consent to proceed" 
        },
        { status: 400 }
      );
    }

    // 4. Generate reference ID
    const referenceId = `VG${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
    
    console.log("📧 Preparing email...");
    console.log("Email config:", {
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      user: process.env.EMAIL_USER?.substring(0, 3) + "...",
      from: process.env.EMAIL_FROM
    });

    // 5. Email configuration - SIMPLE VERSION
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.gmail.com",
      port: process.env.EMAIL_PORT || 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // 6. Simple email content - ADMIN NOTIFICATION
    const mailOptions = {
      from: process.env.EMAIL_FROM || '"Finovest Gold" <noreply@finovest.com>',
      to: process.env.EMAIL_USER, // Send to yourself (admin)
      subject: `💰 New Pledged Gold Request - ${body.name} (${referenceId})`,
      html: generateEmailHTML(body, referenceId),
      text: generateEmailText(body, referenceId),
    };

    // 7. Send email
    console.log("📤 Sending admin email...");
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Admin email sent:", info.messageId);

    // 8. Optionally send confirmation to customer
    if (body.email) {
      try {
        const customerMailOptions = {
          from: process.env.EMAIL_FROM || '"Finovest Gold" <noreply@finovest.com>',
          to: body.email,
          subject: `✅ Pledged Gold Request Received - ${referenceId}`,
          html: generateCustomerConfirmationHTML(body, referenceId),
          text: generateCustomerConfirmationText(body, referenceId),
        };
        
        const customerInfo = await transporter.sendMail(customerMailOptions);
        console.log("✅ Customer confirmation email sent:", customerInfo.messageId);
      } catch (customerEmailError) {
        console.warn("⚠️ Failed to send customer email:", customerEmailError.message);
        // Continue anyway - admin email is more important
      }
    }

    return NextResponse.json({ 
      success: true,
      message: "Thank you! Your request has been submitted successfully. We'll contact you within 30 minutes.",
      referenceId: referenceId,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error("❌ EMAIL ERROR:", error.message);
    
    // User-friendly error messages
    let userMessage = "Your request was received, but there was an issue with email notification. We'll still contact you.";
    
    if (error.code === 'EAUTH') {
      console.error("Authentication failed. Check EMAIL_USER and EMAIL_PASSWORD in .env");
      userMessage = "Thank you! Your request has been submitted successfully. Our team will contact you shortly.";
    } else if (error.code === 'ECONNECTION') {
      console.error("Connection failed. Check EMAIL_HOST and EMAIL_PORT in .env");
      userMessage = "Thank you! Your request has been submitted successfully. Our team will contact you shortly.";
    }

    // Still return success to user, but log error
    return NextResponse.json({ 
      success: true, // Still success for user
      message: userMessage,
      referenceId: `ERR-${Date.now()}`,
      timestamp: new Date().toISOString(),
      debug: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

// Helper function to generate HTML email
function generateEmailHTML(data, referenceId) {
  const goldValue = data.calculatedValue?.goldValue 
    ? `₹${data.calculatedValue.goldValue.toLocaleString('en-IN')}` 
    : 'Not calculated';
  
  const releaseValue = data.calculatedValue?.releaseValue 
    ? `₹${data.calculatedValue.releaseValue.toLocaleString('en-IN')}` 
    : 'Not calculated';

  return `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #153E6D; color: white; padding: 20px; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-top: none; }
        .section { margin: 15px 0; padding: 15px; background: white; border-radius: 5px; }
        .highlight { background: #fff3cd; border-left: 4px solid #ffc107; padding: 10px; }
        .label { font-weight: bold; color: #555; min-width: 150px; display: inline-block; }
        .value { color: #333; }
        .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
        .button { display: inline-block; padding: 8px 16px; background: #153E6D; color: white; text-decoration: none; border-radius: 4px; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>💰 New Pledged Gold Release Request</h2>
            <p><strong>Reference:</strong> ${referenceId}</p>
            <p><strong>Time:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
        </div>
        
        <div class="content">
            <div class="highlight">
                <h3>🟡 HIGH PRIORITY - Contact within 30 minutes</h3>
            </div>
            
            <div class="section">
                <h3>📊 Gold Details</h3>
                <p><span class="label">Institution:</span> <span class="value">${data.institution}</span></p>
                <p><span class="label">Gold Weight:</span> <span class="value">${data.grossWeight} grams</span></p>
                <p><span class="label">Purity:</span> <span class="value">${data.karats}K (${getPurityPercentage(data.karats)}% pure)</span></p>
                <p><span class="label">Loan Amount:</span> <span class="value">₹${parseFloat(data.loanAmount || 0).toLocaleString('en-IN')}</span></p>
                <p><span class="label">Gold Rate Used:</span> <span class="value">₹${data.goldRate?.toLocaleString('en-IN') || 'N/A'}/g</span></p>
            </div>
            
            <div class="section">
                <h3>💰 Estimated Value</h3>
                <p><span class="label">Gold Value:</span> <span class="value"><strong>${goldValue}</strong></span></p>
                <p><span class="label">Release Value:</span> <span class="value"><strong style="color: green;">${releaseValue}</strong></span></p>
                <p><span class="label">Loan-to-Value:</span> <span class="value">${data.calculatedValue?.loanToValue || 0}%</span></p>
            </div>
            
            <div class="section">
                <h3>👤 Customer Information</h3>
                <p><span class="label">Name:</span> <span class="value">${data.name}</span></p>
                <p><span class="label">Mobile:</span> <span class="value"><a href="tel:${data.mobile}">${data.mobile}</a></span></p>
                <p><span class="label">Email:</span> <span class="value"><a href="mailto:${data.email}">${data.email}</a></span></p>
                <p><span class="label">Location:</span> <span class="value">${data.location || 'Not provided'}</span></p>
            </div>
            
            <div class="section">
                <h3>📞 Quick Actions</h3>
                <p>
                    <a href="tel:${data.mobile}" class="button">📱 Call Customer</a>
                    <a href="https://wa.me/91${data.mobile.replace(/\D/g, '')}" class="button" style="background: #25D366; margin-left: 10px;">💬 WhatsApp</a>
                    <a href="mailto:${data.email}" class="button" style="background: #ea4335; margin-left: 10px;">📧 Email</a>
                </p>
            </div>
            
            <div class="footer">
                <p>This email was automatically generated from the Pledged Gold Calculator.</p>
                <p>© ${new Date().getFullYear()} Finovest. All rights reserved.</p>
            </div>
        </div>
    </div>
</body>
</html>
  `;
}

// Helper function to generate text email
function generateEmailText(data, referenceId) {
  return `
NEW PLEDGED GOLD RELEASE REQUEST
================================

Reference: ${referenceId}
Time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST

HIGH PRIORITY: Contact within 30 minutes

GOLD DETAILS:
-------------
Institution: ${data.institution}
Gold Weight: ${data.grossWeight} grams
Purity: ${data.karats}K (${getPurityPercentage(data.karats)}% pure)
Loan Amount: ₹${parseFloat(data.loanAmount || 0).toLocaleString('en-IN')}
Gold Rate: ₹${data.goldRate?.toLocaleString('en-IN') || 'N/A'}/g

ESTIMATED VALUE:
----------------
Gold Value: ₹${data.calculatedValue?.goldValue?.toLocaleString('en-IN') || 'Not calculated'}
Release Value: ₹${data.calculatedValue?.releaseValue?.toLocaleString('en-IN') || 'Not calculated'}
Loan-to-Value: ${data.calculatedValue?.loanToValue || 0}%

CUSTOMER INFORMATION:
---------------------
Name: ${data.name}
Mobile: ${data.mobile}
Email: ${data.email}
Location: ${data.location || 'Not provided'}

QUICK ACTIONS:
--------------
Call: tel:${data.mobile}
WhatsApp: https://wa.me/91${data.mobile.replace(/\D/g, '')}
Email: mailto:${data.email}

Reference ID: ${referenceId}
  `;
}

// Helper function to generate customer confirmation HTML
function generateCustomerConfirmationHTML(data, referenceId) {
  return `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #28a745; color: white; padding: 20px; border-radius: 10px 10px 0 0; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-top: none; }
        .section { margin: 15px 0; padding: 15px; background: white; border-radius: 5px; }
        .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; text-align: center; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>✅ Request Submitted Successfully!</h2>
            <p>Reference: ${referenceId}</p>
        </div>
        
        <div class="content">
            <div class="section">
                <h3>Dear ${data.name},</h3>
                <p>Thank you for submitting your pledged gold release request. We've received your details and our gold expert will contact you within <strong>30 minutes</strong>.</p>
            </div>
            
            <div class="section">
                <h3>📋 Your Request Summary</h3>
                <p><strong>Reference ID:</strong> ${referenceId}</p>
                <p><strong>Financial Institution:</strong> ${data.institution}</p>
                <p><strong>Gold Weight:</strong> ${data.grossWeight} grams</p>
                <p><strong>Gold Purity:</strong> ${data.karats}K</p>
                <p><strong>Loan Amount:</strong> ₹${parseFloat(data.loanAmount || 0).toLocaleString('en-IN')}</p>
                ${data.calculatedValue?.goldValue ? `
                <p><strong>Estimated Gold Value:</strong> ₹${data.calculatedValue.goldValue.toLocaleString('en-IN')}</p>
                <p><strong>Estimated Release Value:</strong> ₹${data.calculatedValue.releaseValue.toLocaleString('en-IN')}</p>
                ` : ''}
            </div>
            
            <div class="section">
                <h3>📞 Next Steps</h3>
                <ol>
                    <li>Our gold expert will call you within 30 minutes</li>
                    <li>We'll verify your details and documents</li>
                    <li>You'll receive a customized gold release plan</li>
                    <li>Schedule a visit to complete the process</li>
                </ol>
            </div>
            
            <div class="footer">
                <p>For immediate assistance, call us at: <strong>+91 12345 67890</strong></p>
                <p>© ${new Date().getFullYear()} Finovest. All rights reserved.</p>
            </div>
        </div>
    </div>
</body>
</html>
  `;
}

// Helper function to generate customer confirmation text
function generateCustomerConfirmationText(data, referenceId) {
  return `
REQUEST SUBMITTED SUCCESSFULLY
===============================

Dear ${data.name},

Thank you for submitting your pledged gold release request. We've received your details and our gold expert will contact you within 30 minutes.

YOUR REQUEST SUMMARY:
---------------------
Reference ID: ${referenceId}
Financial Institution: ${data.institution}
Gold Weight: ${data.grossWeight} grams
Gold Purity: ${data.karats}K
Loan Amount: ₹${parseFloat(data.loanAmount || 0).toLocaleString('en-IN')}
${data.calculatedValue?.goldValue ? `
Estimated Gold Value: ₹${data.calculatedValue.goldValue.toLocaleString('en-IN')}
Estimated Release Value: ₹${data.calculatedValue.releaseValue.toLocaleString('en-IN')}
` : ''}

NEXT STEPS:
-----------
1. Our gold expert will call you within 30 minutes
2. We'll verify your details and documents
3. You'll receive a customized gold release plan
4. Schedule a visit to complete the process

For immediate assistance, call: +91 12345 67890

Reference ID: ${referenceId}
  `;
}

// Helper function to get purity percentage
function getPurityPercentage(karats) {
  const purityMap = {
    '24': '99.9',
    '22': '91.6',
    '20': '83.3',
    '18': '75.0',
    '14': '58.5'
  };
  return purityMap[karats] || 'Unknown';
}

// Optional: GET handler for testing
export async function GET() {
  return NextResponse.json({
    message: "Callback API is running",
    endpoint: "POST /api/callback",
    description: "Handles pledged gold release form submissions",
    required_fields: [
      "name",
      "mobile", 
      "email",
      "institution",
      "grossWeight",
      "karats",
      "loanAmount",
      "consent"
    ],
    env_check: {
      EMAIL_HOST: process.env.EMAIL_HOST ? "Set" : "Missing",
      EMAIL_USER: process.env.EMAIL_USER ? "Set" : "Missing",
      EMAIL_FROM: process.env.EMAIL_FROM ? "Set" : "Missing",
    }
  });
}