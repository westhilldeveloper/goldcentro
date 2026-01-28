import nodemailer from "nodemailer";

export async function POST(req) {
  console.log("📨 Callback API endpoint called");
  
  try {
    // 1. Check if request has body
    let body;
    try {
      body = await req.json();
      console.log("✅ Request body parsed:", body);
    } catch (jsonError) {
      console.error("❌ JSON parsing error:", jsonError);
      return Response.json(
        { 
          success: false, 
          message: "Invalid request format. Please check your data." 
        },
        { status: 400 }
      );
    }

    // 2. Validate required fields
    if (!body.name || !body.mobile || !body.location) {
      console.log("❌ Missing fields:", {
        name: body.name,
        mobile: body.mobile,
        location: body.location
      });
      return Response.json(
        { 
          success: false,
          message: "Missing required fields: name, mobile, and location are required" 
        },
        { status: 400 }
      );
    }

    // 3. Validate consent
    if (!body.consent) {
      return Response.json(
        { 
          success: false,
          message: "You must agree to the terms and conditions" 
        },
        { status: 400 }
      );
    }

    console.log("📧 Configuring email with:", {
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      user: process.env.EMAIL_USER?.substring(0, 3) + "...",
      from: process.env.EMAIL_FROM
    });

    // 4. Email configuration - FIXED for Gmail
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 587, // Use 587 for Gmail, NOT 465
      secure: false, // false for 587, true for 465
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        // Allow self-signed certificates for development
        rejectUnauthorized: false
      }
    });

    // 5. Verify connection
    try {
      await transporter.verify();
      console.log("✅ SMTP connection verified");
    } catch (verifyError) {
      console.warn("⚠️ SMTP verification warning:", verifyError.message);
      // Continue anyway - sometimes verification fails but sending works
    }

    // 6. Prepare email
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: `📞 New Callback Request: ${body.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #163f6b;">New Callback Request -Gold Centro</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${body.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Mobile:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">
                <a href="tel:${body.mobile}">${body.mobile}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Location:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${body.location}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">
                ${body.email ? `<a href="mailto:${body.email}">${body.email}</a>` : "Not provided"}
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Consent:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: green;">✓ Given</td>
            </tr>
            <tr>
              <td style="padding: 10px;"><strong>Time:</strong></td>
              <td style="padding: 10px;">${new Date().toLocaleString()}</td>
            </tr>
          </table>
        </div>
      `,
      text: `New Callback Request\n\nName: ${body.name}\nMobile: ${body.mobile}\nLocation: ${body.location}\nEmail: ${body.email || "Not provided"}\nConsent: Given\nTime: ${new Date().toLocaleString()}`
    };

    // 7. Send email
    console.log("📤 Sending email...");
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", info.messageId);

    return Response.json({ 
      success: true,
      message: "Thank you! We'll contact you shortly."
    });

  } catch (error) {
    console.error("❌ EMAIL ERROR DETAILS:", {
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    
    // User-friendly error messages
    let userMessage = "Failed to submit request. Please try again.";
    
    if (error.code === 'EAUTH') {
      userMessage = "Email authentication failed. Please check credentials.";
    } else if (error.code === 'ECONNECTION') {
      userMessage = "Cannot connect to email server.";
    }

    return Response.json(
      { 
        success: false,
        message: userMessage,
        debug: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}