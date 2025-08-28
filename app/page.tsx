'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, Instagram, Mail } from 'lucide-react'

export default function Page() {
  // OPTIONAL: countdown target (change or remove)
  const launch = new Date()
  launch.setMonth(launch.getMonth() + 1) // +1 month

  const [left, setLeft] = useState<number>(launch.getTime() - Date.now())
  useEffect(() => {
    const id = setInterval(() => setLeft(launch.getTime() - Date.now()), 1000)
    return () => clearInterval(id)
  }, [launch])

  const d = Math.max(0, Math.floor(left / (1000 * 60 * 60 * 24)))
  const h = Math.max(0, Math.floor((left / (1000 * 60 * 60)) % 24))
  const m = Math.max(0, Math.floor((left / (1000 * 60)) % 60))
  const s = Math.max(0, Math.floor((left / 1000) % 60))

  return (
    <main className="relative min-h-screen overflow-hidden text-white">
      {/* animated gradient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-blob absolute -top-40 -left-32 h-96 w-96 rounded-full bg-gradient-to-br from-amber-500/40 to-pink-500/40 blur-3xl" />
        <div className="animate-blob animation-delay-2000 absolute -bottom-24 -right-24 h-[28rem] w-[28rem] rounded-full bg-gradient-to-tr from-purple-500/40 to-cyan-500/40 blur-3xl" />
        <div className="animate-blob animation-delay-4000 absolute top-1/3 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-gradient-to-tr from-lime-400/30 to-sky-500/30 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.06),transparent_45%)]" />
      </div>

      {/* content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="mx-auto w-full max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl">
          <div className="mb-6 text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs uppercase tracking-wider text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              Coming Soon
            </p>
            <h1 className="mt-6 font-[var(--font-serif)] text-4xl leading-tight md:text-6xl">
              The Kandid Edit
            </h1>
            <p className="mt-3 text-lg text-white/70 md:text-xl">
              Elegant edits for ambitious creators & brands.
            </p>
          </div>

          {/* countdown */}
          <div className="mx-auto mb-8 grid w-full max-w-xl grid-cols-4 gap-3">
            {[
              { label: 'Days', value: d },
              { label: 'Hours', value: h },
              { label: 'Minutes', value: m },
              { label: 'Seconds', value: s },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="rounded-xl border border-white/10 bg-black/30 py-4 text-center"
              >
                <div className="text-3xl font-semibold tabular-nums">{String(value).padStart(2, '0')}</div>
                <div className="mt-1 text-xs uppercase tracking-wide text-white/60">{label}</div>
              </div>
            ))}
          </div>

          {/* CTA row */}
          <div className="flex flex-col items-center justify-center gap-3 md:flex-row">
            <a
              href="mailto:thekandidedit@gmail.com?subject=Project%20Enquiry%20—%20The%20Kandid%20Edit"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-medium text-black transition hover:brightness-95"
            >
              Get in touch <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
            </a>
            <div className="flex items-center gap-2">
              <a
                aria-label="Email"
                href="mailto:thekandidedit@gmail.com"
                className="rounded-xl border border-white/15 bg-white/10 p-3 text-white/80 transition hover:bg-white/20"
              >
                <Mail className="size-5" />
              </a>
              <a
                aria-label="Instagram"
                href="https://instagram.com/"
                target="_blank"
                className="rounded-xl border border-white/15 bg-white/10 p-3 text-white/80 transition hover:bg-white/20"
              >
                <Instagram className="size-5" />
              </a>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-white/50">
            © {new Date().getFullYear()} The Kandid Edit — All rights reserved.
          </p>
        </div>
      </div>
    </main>
  )
}
