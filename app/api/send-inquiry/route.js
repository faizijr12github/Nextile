import nodemailer from 'nodemailer'

export async function POST(request) {
  const body = await request.json()
  const {
    email,
    productDescription,
    quantity,
    leadTime,
    paymentTerms,
    qualityRequirements,
    additionalNotes,
    recipientEmail,
  } = body

  if (!email || !productDescription || !quantity || !leadTime || !recipientEmail) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    const mailOptions = {
      from: `"Nextile" <${process.env.EMAIL_USER}>`,
      to: recipientEmail,
      subject: 'New Inquiry Received',
      html: `
        <h2>New Inquiry Details</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Product Description:</strong> ${productDescription}</p>
        <p><strong>Quantity:</strong> ${quantity}</p>
        <p><strong>Lead Time:</strong> ${leadTime}</p>
        <p><strong>Payment Terms:</strong> ${paymentTerms || 'N/A'}</p>
        <p><strong>Quality Requirements:</strong> ${qualityRequirements || 'N/A'}</p>
        <p><strong>Additional Notes:</strong><br/>${additionalNotes || 'None'}</p>
      `,
    }

    await transporter.sendMail(mailOptions)

    return new Response(JSON.stringify({ success: true, message: 'Email sent successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Email send error:', error)
    return new Response(JSON.stringify({ error: 'Failed to send email' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
