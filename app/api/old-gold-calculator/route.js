import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();

    const { karat, weight, name, phone, email } = body;

    if (!karat || !weight || !name || !phone) {
      return Response.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: { rejectUnauthorized: false },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_USER,
      subject: "🟡 Old Gold Calculator Submission",
      html: `
        <h2>Old Gold Calculator Details</h2>
        <table cellpadding="10" cellspacing="0" border="1">
          <tr><td><b>Karat</b></td><td>${karat}K</td></tr>
          <tr><td><b>Weight</b></td><td>${weight} grams</td></tr>
          <tr><td><b>Name</b></td><td>${name}</td></tr>
          <tr><td><b>Phone</b></td><td>${phone}</td></tr>
          <tr><td><b>Email</b></td><td>${email || "Not Provided"}</td></tr>
          <tr><td><b>Submitted At</b></td><td>${new Date().toLocaleString()}</td></tr>
        </table>
      `,
    };

    await transporter.sendMail(mailOptions);

    return Response.json({
      success: true,
      message: "Details submitted successfully",
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
