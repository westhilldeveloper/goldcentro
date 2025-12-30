// lib/email.js
import nodemailer from 'nodemailer';

const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail', // Use service instead of host/port
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
};

export const sendInquiryEmail = async (formData) => {
  const transporter = createTransporter();
  
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_USER,
    replyTo: formData.email || 'no-reply@example.com',
    subject: `Gold Inquiry from ${formData.name}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px; }
          .field { margin-bottom: 20px; }
          .label { font-weight: 600; color: #4b5563; margin-bottom: 5px; }
          .value { color: #1f2937; font-size: 16px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>💰 New Gold Inquiry</h1>
            <p>Opportunity to buy gold from ${formData.name}</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Customer Name:</div>
              <div class="value">${formData.name}</div>
            </div>
            <div class="field">
              <div class="label">Gold Quantity:</div>
              <div class="value">${formData.quantity} grams</div>
            </div>
            <div class="field">
              <div class="label">Mobile Number:</div>
              <div class="value">+91 ${formData.mobile}</div>
            </div>
            ${formData.email ? `
            <div class="field">
              <div class="label">Email Address:</div>
              <div class="value">${formData.email}</div>
            </div>
            ` : ''}
            <div class="field">
              <div class="label">Submission Time:</div>
              <div class="value">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'full', timeStyle: 'medium' })}</div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  return await transporter.sendMail(mailOptions);
};