import nodemailer from "nodemailer";

export async function GET(req) {
  return new Response(JSON.stringify({ message: "Hello, world!" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req) {
  const data = await req.json();

  // Configure the email transport using the default SMTP transport and a GMail account.
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your email password or app password
    },
  });

  // Set up email data
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender address
    to: "captainhong737@gmail.com", // List of recipients
    subject: "New Registration Submission", // Subject line
    html: `
      <h1>New Registration Details</h1>
      <p><strong>First Name:</strong> ${data.firstName}</p>
      <p><strong>Last Name:</strong> ${data.lastName}</p>
      <p><strong>Gender:</strong> ${data.gender}</p>
      <p><strong>State of Origin:</strong> ${data.stateOfOrigin}</p>
      <p><strong>Age:</strong> ${data.age}</p>
      <p><strong>Mobile Number:</strong> ${data.mobileNumber}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Country:</strong> ${data.country}</p>
      <p><strong>Password:</strong> ${data.password}</p>
      <p><strong>Confirm Password:</strong> ${data.confirmPassword}</p>
    `,
  };

  // Send mail with defined transport object
  try {
    await transporter.sendMail(mailOptions);
    return new Response(
      JSON.stringify({ message: "Email sent successfully!" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ message: "Failed to send email." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
