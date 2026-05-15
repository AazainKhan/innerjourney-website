import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

function sanitize(str: unknown): string {
  if (typeof str !== 'string') return ''
  return str.replace(/[<>]/g, '').trim().slice(0, 2000)
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Honeypot — bots auto-fill `website`, humans never see the hidden input.
    // Pretend we accepted the submission so the bot doesn't retry.
    if (typeof body.website === 'string' && body.website.length > 0) {
      return NextResponse.json({ success: true, message: 'Received.' })
    }

    const formType = sanitize(body.form_type)
    const email = sanitize(body.email)

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ success: false, error: 'Valid email is required.' }, { status: 400 })
    }

    const isBooking = formType === 'booking'
    const name = isBooking
      ? `${sanitize(body.first_name)} ${sanitize(body.last_name)}`.trim()
      : sanitize(body.name)

    if (!name) {
      return NextResponse.json({ success: false, error: 'Name is required.' }, { status: 400 })
    }

    const message = sanitize(body.message)
    const service = sanitize(body.service)
    const phone = sanitize(body.phone)
    const countryCode = sanitize(body.country_code)

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Contact form notifications always go to the Gmail inbox. We still let
    // ADMIN_EMAIL override (e.g. for staging) but ignore the legacy
    // info@innerjourney-with-shanila.com value in case Vercel's env still has
    // it set from before the migration.
    const ADMIN_RECIPIENT = 'innerjourneywithshanila@gmail.com'
    const envEmail = (process.env.ADMIN_EMAIL || '').trim().toLowerCase()
    const adminEmail = envEmail && envEmail !== 'info@innerjourney-with-shanila.com'
      ? envEmail
      : ADMIN_RECIPIENT

    const adminSubject = isBooking
      ? `New Booking Request from ${name}`
      : `New Contact Message from ${name}`

    const adminHtml = isBooking
      ? `
        <h2>New Booking Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> +${countryCode} ${phone}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong> ${message || 'No message provided'}</p>
      `
      : `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> +${countryCode} ${phone}</p>
        <p><strong>Message:</strong> ${message}</p>
      `

    await transporter.sendMail({
      from: `"Inner Journey Website" <${process.env.SMTP_USER}>`,
      to: adminEmail,
      subject: adminSubject,
      html: adminHtml,
      replyTo: email,
    })

    await transporter.sendMail({
      from: `"Shanila Khan" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Thank you for reaching out – Inner Journey with Shanila',
      html: `
        <p>Hi ${name.split(' ')[0]},</p>
        <p>Thank you for getting in touch! I've received your ${isBooking ? 'booking request' : 'message'} and will get back to you within 24 hours.</p>
        <p>Looking forward to connecting with you.</p>
        <p>Warm regards,<br>Shanila Khan<br>Inner Journey with Shanila</p>
      `,
    })

    return NextResponse.json({ success: true, message: "Thank you! I'll be in touch within 24 hours." })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json({ success: false, error: 'Failed to send message. Please try again.' }, { status: 500 })
  }
}
