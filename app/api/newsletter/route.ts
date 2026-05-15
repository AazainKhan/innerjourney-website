import { NextRequest, NextResponse } from 'next/server'

// MailerLite Connect API: https://developers.mailerlite.com/docs/subscribers.html#create-upsert-subscriber
// Behaviour: POST /api/subscribers with { email, groups? } upserts a subscriber.
// 200 = already existed and updated, 201 = newly created, 422 = validation
// (e.g. bounced/blocked email). All of those are user-facing "you're on the
// list" success states from the visitor's perspective.

const MAILERLITE_ENDPOINT = 'https://connect.mailerlite.com/api/subscribers'

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function sanitizeEmail(value: unknown): string {
  if (typeof value !== 'string') return ''
  return value.trim().toLowerCase().slice(0, 320)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))

    // Honeypot — same pattern as /api/contact. Bots fill `website`, humans
    // never see it. Pretend we accepted so the bot doesn't retry.
    if (typeof body.website === 'string' && body.website.length > 0) {
      return NextResponse.json({ success: true })
    }

    const email = sanitizeEmail(body.email)
    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address.' },
        { status: 400 },
      )
    }

    const apiKey = process.env.MAILERLITE_API_KEY
    if (!apiKey) {
      // Surface the misconfiguration clearly in dev / preview so the owner
      // knows to add MAILERLITE_API_KEY in Vercel.
      console.error('MAILERLITE_API_KEY is not set — newsletter signup not delivered.')
      return NextResponse.json(
        { success: false, error: 'Newsletter is not configured yet. Please try again later.' },
        { status: 503 },
      )
    }

    const groupId = process.env.MAILERLITE_GROUP_ID?.trim()
    const payload: Record<string, unknown> = { email }
    if (groupId) payload.groups = [groupId]

    const upstream = await fetch(MAILERLITE_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    })

    // MailerLite Connect API status codes:
    //   201 → new subscriber created
    //   200 → existing subscriber updated (already on the list)
    // We surface that distinction so the frontend can show a different
    // message ("You're already on the list" vs "Welcome aboard").
    if (upstream.ok) {
      const alreadySubscribed = upstream.status === 200
      return NextResponse.json({ success: true, alreadySubscribed })
    }

    // 422 typically means the address is blocklisted, bounced, or was
    // previously unsubscribed. Treat that as "already known" from the
    // visitor's POV so they don't see a confusing error.
    if (upstream.status === 422) {
      const detail = await upstream.text().catch(() => '')
      console.warn('MailerLite 422 for newsletter signup:', detail)
      return NextResponse.json({ success: true, alreadySubscribed: true })
    }

    const detail = await upstream.text().catch(() => '')
    console.error('MailerLite upstream error', upstream.status, detail)
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again in a moment.' },
      { status: 502 },
    )
  } catch (err) {
    console.error('Newsletter signup error:', err)
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again in a moment.' },
      { status: 500 },
    )
  }
}
