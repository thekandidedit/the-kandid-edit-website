'use client';

import { motion, easeOut } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useState, type FormEvent, type ReactNode } from 'react';

/* Animation variants */
const container: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.06,
      ease: easeOut, // function, not string
      duration: 0.5,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 10 },
  show:   { opacity: 1, y: 0 },
};

/* Small UI helpers */
function Pill({ children }: { children: ReactNode }) {
  return <span className="pill">{children}</span>;
}

function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="section">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
      >
        <motion.h2 variants={item} className="mb-2">
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p variants={item} className="mb-10 max-w-2xl muted">
            {subtitle}
          </motion.p>
        )}
        <motion.div variants={item}>{children}</motion.div>
      </motion.div>
    </section>
  );
}

export default function Page() {
  const [sending, setSending] = useState(false);
  const [ok, setOk] = useState<boolean | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setSending(true);
    setOk(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fd.get('name'),
          email: fd.get('email'),
          message: fd.get('message'),
        }),
      });
      const j = await res.json();
      setOk(j.ok);
      if (j.ok) e.currentTarget.reset();
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 backdrop-blur bg-black/20">
        <div className="section py-4 flex items-center justify-between">
          <a href="#home" className="font-semibold flex items-center gap-2">
            <span>✨</span>
            <span>The Kandid Edit</span>
          </a>
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#services">Services</a>
            <a href="#packages">Packages</a>
            <a href="#work">Work</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="hidden md:block">
            <a href="#contact">
              <Button>Get a Quote</Button>
            </a>
          </div>
        </div>
      </header>

      {/* Hero / services / packages sections can go here */}

      <Section
        id="contact"
        title="Let’s build something"
        subtitle="Tell us about your project. We’ll reply quickly."
      >
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm mb-1">Name</label>
              <input
                name="name"
                required
                className="w-full rounded-xl border border-white/20 bg-white/5 p-2"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full rounded-xl border border-white/20 bg-white/5 p-2"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm mb-1">Project Details</label>
              <textarea
                name="message"
                rows={6}
                className="w-full rounded-xl border border-white/20 bg-white/5 p-2"
              />
            </div>
            <div className="md:col-span-2 flex justify-end">
              <Button type="submit">{sending ? 'Sending…' : 'Send enquiry'}</Button>
            </div>
            {ok === true && (
              <p className="text-green-400 text-sm">
                Thanks! We’ll get back to you shortly.
              </p>
            )}
            {ok === false && (
              <p className="text-red-400 text-sm">Something went wrong. Try again.</p>
            )}
          </form>
        </Card>
      </Section>
    </div>
  );
}
