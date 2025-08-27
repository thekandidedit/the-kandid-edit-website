import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400 })
    }

    const resendKey = process.env.RESEND_API_KEY
    const contactTo = process.env.CONTACT_TO
    const from = process.env.CONTACT_FROM || 'Kandid Edit <onboarding@resend.dev>'

    if (!resendKey || !contactTo) {
      return NextResponse.json({ ok: false, error: 'Server not configured' }, { status: 500 })
    }

    const resend = new Resend(resendKey)
    await resend.emails.send({
      from,
      to: contactTo!,
      reply_to: email,
      subject: 'New enquiry — The Kandid Edit',
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false, error: 'Bad request' }, { status: 400 })
  }
}
