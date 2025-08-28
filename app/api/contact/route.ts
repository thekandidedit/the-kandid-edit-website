// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

// Resend requires the Node runtime (not Edge)
export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing fields" },
        { status: 400 }
      );
    }

    // Validate env
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.CONTACT_FROM || "Kandid Edit <onboarding@resend.dev>";
    const to = process.env.CONTACT_TO || "thekandidedit@gmail.com";

    if (!apiKey) {
      console.error("Missing RESEND_API_KEY");
      return NextResponse.json({ ok: false, error: "Server misconfigured" }, { status: 500 });
    }

    const resend = new Resend(apiKey);

    const payload: Parameters<typeof resend.emails.send>[0] = {
      from,
      to,
      subject: "New enquiry — The Kandid Edit",
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <div style="font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.5">
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
        </div>
      `,
    };

    // Only set replyTo if it looks like an email
    if (EMAIL_RE.test(String(email))) {
      (payload as any).replyTo = String(email); // Resend typings accept `replyTo`
    }

    const { error } = await resend.emails.send(payload);

    if (error) {
      // Resend returns a structured error object
      console.error("Resend error:", error);
      return NextResponse.json(
        { ok: false, error: (error as any)?.message || "Email send failed" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}

/** very small helper so user input doesn't render as HTML */
function escapeHtml(s: string) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
