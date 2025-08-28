// app/api/contact/route.ts
import { Resend } from 'resend';

export const runtime = 'nodejs'; // Resend needs the Node runtime (not Edge)

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return Response.json({ ok: false, error: 'Missing fields' }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const from = process.env.CONTACT_FROM || 'Kandid Edit <onboarding@resend.dev>';
    const to = process.env.CONTACT_TO || 'thekandidedit@gmail.com';

    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: String(email), // important: camelCase
      subject: 'New enquiry — The Kandid Edit',
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    if (error) {
      console.error('Resend error:', error);
      return Response.json({ ok: false, error: String(error) }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error('API error:', err);
    return Response.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}
