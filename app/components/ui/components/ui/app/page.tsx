'use client'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ArrowRight, Camera, Palette, Presentation, Link as LinkIcon, Check } from 'lucide-react'
import { useState } from 'react'

const container = { hidden:{opacity:0,y:20}, show:{opacity:1,y:0, transition:{staggerChildren:0.06, ease:'easeOut', duration:0.5}} }
const item = { hidden:{opacity:0,y:10}, show:{opacity:1,y:0} }

function Pill({children}:{children: React.ReactNode}) { return <span className='pill'>{children}</span> }
function Section({id, title, subtitle, children}:{id:string, title:string, subtitle?:string, children:React.ReactNode}){
  return (
    <section id={id} className='section'>
      <motion.div variants={container} initial='hidden' whileInView='show' viewport={{ once:true, margin: '-80px'}}>
        <motion.h2 variants={item} className='mb-2'>{title}</motion.h2>
        {subtitle && <motion.p variants={item} className='mb-10 max-w-2xl muted'>{subtitle}</motion.p>}
        <motion.div variants={item}>{children}</motion.div>
      </motion.div>
    </section>
  )
}

export default function Page(){
  const [sending, setSending] = useState(false)
  const [ok, setOk] = useState<boolean|null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement
    const fd = new FormData(form)
    setSending(true); setOk(null)
    try {
      const res = await fetch('/api/contact', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ name: fd.get('name'), email: fd.get('email'), message: fd.get('message') })
      })
      const j = await res.json(); setOk(j.ok)
      if(j.ok) form.reset()
    } finally { setSending(false) }
  }

  return (
    <div className='min-h-screen'>
      <header className='sticky top-0 z-50 backdrop-blur bg-black/20'>
        <div className='section py-4 !px-4 md:!px-8 flex items-center justify-between'>
          <a href='#home' className='font-semibold flex items-center gap-2'><span>✨</span><span>The Kandid Edit</span></a>
          <nav className='hidden md:flex gap-6 text-sm'>
            <a href='#services'>Services</a><a href='#packages'>Packages</a><a href='#work'>Work</a><a href='#about'>About</a><a href='#contact'>Contact</a>
          </nav>
          <div className='hidden md:block'><a href='#contact'><Button>Get a Quote</Button></a></div>
        </div>
      </header>

      <section id='home' className='relative overflow-hidden'>
        <div className='section grid md:grid-cols-2 items-center gap-8'>
          <motion.div variants={container} initial='hidden' animate='show'>
            <motion.div variants={item} className='mb-4 flex flex-wrap gap-2'>
              <Pill>Brand & Narrative Studio</Pill><Pill>Design × Storytelling</Pill><Pill>ROI-minded Creative</Pill>
            </motion.div>
            <motion.h1 variants={item} className='mb-4'>From raw ideas to <span className='underline decoration-yellow-500/60 underline-offset-4'>compelling stories</span> & visuals.</motion.h1>
            <motion.p variants={item} className='mb-6 max-w-xl muted'>We craft websites, pitch decks, content systems, and brand narratives backed by clear strategy and measurable outcomes.</motion.p>
            <motion.div variants={item} className='flex flex-wrap gap-3'>
              <a href='#packages'><Button className='group'>Explore Packages <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5' /></Button></a>
              <a href='#work'><Button variant='outline'>See Work</Button></a>
            </motion.div>
          </motion.div>
          <motion.div variants={container} initial='hidden' animate='show'>
            <motion.div variants={item} className='grid grid-cols-2 gap-4'>
              <Card className='p-4'><div className='text-base font-semibold flex items-center gap-2'><Palette className='h-4 w-4'/>Brand Kits</div><p className='muted text-sm mt-1'>Logos, palettes, tone-of-voice.</p></Card>
              <Card className='p-4'><div className='text-base font-semibold flex items-center gap-2'><Presentation className='h-4 w-4'/>Pitch Decks</div><p className='muted text-sm mt-1'>Investor, sales & creds.</p></Card>
              <Card className='p-4'><div className='text-base font-semibold flex items-center gap-2'><Camera className='h-4 w-4'/>Content Systems</div><p className='muted text-sm mt-1'>Reels, grids, templates.</p></Card>
              <Card className='p-4'><div className='text-base font-semibold flex items-center gap-2'><LinkIcon className='h-4 w-4'/>Websites</div><p className='muted text-sm mt-1'>Lightning-fast one-pagers.</p></Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Section id='services' title='What we make' subtitle='Everything you need to look sharp, sound smart, and ship fast.'>
        <div className='grid gap-6 md:grid-cols-3'>
          {[
            {title:'Brand & Identity',desc:'Logo suite, color & type, voice & messaging, mini brand book.',bullets:['3 logo directions','Palette & type system','Tone of voice guide','Usage kit']},
            {title:'Websites',desc:'High-converting one-page sites with clean UX, SEO basics, and analytics.',bullets:['UX copy & wireframe','Responsive build','On-page SEO','Analytics setup']},
            {title:'Pitch Decks',desc:'Investor, sales, creds decks with narrative arcs that land.',bullets:['Narrative outline','Custom visuals','Data slides','Export kit']}
          ].map(s => (
            <Card key={s.title} className='p-6'>
              <h3 className='text-xl font-semibold'>{s.title}</h3>
              <p className='muted mt-1'>{s.desc}</p>
              <ul className='mt-4 space-y-2 text-sm'>{s.bullets.map(b => <li key={b} className='flex items-start gap-2'><Check className='mt-0.5 h-4 w-4'/><span>{b}</span></li>)}</ul>
            </Card>
          ))}
        </div>
      </Section>

      <Section id='packages' title='Packages' subtitle='Choose a starting point. Add-ons like video editing, grid planning, and website design are available.'>
        <div className='grid gap-6 md:grid-cols-3'>
          {[
            {name:'Quick Edit', price:'₹ — custom', tag:'Fastest', points:['Audit + strategy call','Copy polish for 5 pages or 1 deck','3 story/reel templates','7-day turnaround'], cta:'Start Quick Edit'},
            {name:'Core Edit', price:'₹ — custom', tag:'Most Popular', points:['Brand mini-kit (logo, palette, voice)','One-page website','Content system (8 posts + 4 reels)','Basic analytics'], cta:'Build My Core'},
            {name:'Full Edit', price:'₹ — custom', tag:'All-in', points:['Full brand system','Website + blog','Sales/investor deck','90-day content engine'], cta:'Go Full Edit'}
          ].map(p => (
            <Card key={p.name} className='p-6'>
              <div className='mb-2 flex items-center gap-2'><h3 className='text-xl font-semibold'>{p.name}</h3><span className='pill'>{p.tag}</span></div>
              <p className='muted'>{p.price}</p>
              <ul className='my-4 space-y-2 text-sm'>{p.points.map(pt => <li key={pt} className='flex items-start gap-2'><Check className='mt-0.5 h-4 w-4'/><span>{pt}</span></li>)}</ul>
              <Button className='w-full'>{p.cta}</Button>
            </Card>
          ))}
        </div>
      </Section>

      <Section id='work' title='Selected Work' subtitle='Replace placeholders with your visuals and links.'>
        <div className='grid gap-6 md:grid-cols-3'>
          {[1,2,3].map(n => (
            <Card key={n} className='overflow-hidden'>
              <div className='aspect-[16/10] bg-white/10' />
              <div className='p-4'><div className='text-lg font-semibold'>Project {n}</div><p className='muted text-sm'>• What we did • Result metric • Link</p></div>
            </Card>
          ))}
        </div>
      </Section>

      <Section id='about' title='Why we’re different' subtitle='Design and storytelling are inseparable. We make strategy feel human—quiet, powerful, unforgettable.'>
        <div className='grid items-start gap-8 md:grid-cols-2'>
          <Card className='p-6'>
            <div className='text-lg font-semibold'>Our POV</div>
            <div className='mt-3 space-y-3 text-sm'>
              <p className='flex items-start gap-2'><Check className='mt-0.5 h-4 w-4'/>Narratives first, then visuals to amplify.</p>
              <p className='flex items-start gap-2'><Check className='mt-0.5 h-4 w-4'/>Clear ROI: tied to measurable business goals.</p>
              <p className='flex items-start gap-2'><Check className='mt-0.5 h-4 w-4'/>Fast iteration loops + thoughtful feedback.</p>
              <p className='flex items-start gap-2'><Check className='mt-0.5 h-4 w-4'/>Ownership-friendly templates & systems.</p>
            </div>
          </Card>
          <Card className='p-6'>
            <div className='text-lg font-semibold'>Process</div>
            <ol className='mt-3 space-y-3 text-sm'>
              <li><strong>01. Discover:</strong> goals, audience, constraints.</li>
              <li><strong>02. Frame:</strong> narrative, structure, success metrics.</li>
              <li><strong>03. Design:</strong> visual system, components, content.</li>
              <li><strong>04. Ship:</strong> QA, launch plan, handover kit.</li>
            </ol>
          </Card>
        </div>
      </Section>

      <Section id='contact' title='Let’s build something' subtitle='Tell us about your project. We’ll reply quickly.'>
        <Card className='p-6'>
          <form onSubmit={handleSubmit} className='grid gap-4 md:grid-cols-2'>
            <div className='md:col-span-1'>
              <label className='mb-1 block text-sm'>Name</label>
              <input className='w-full rounded-xl border border-white/20 bg-white/5 p-2' placeholder='Your name' name='name' required />
            </div>
            <div className='md:col-span-1'>
              <label className='mb-1 block text-sm'>Email</label>
              <input className='w-full rounded-xl border border-white/20 bg-white/5 p-2' type='email' placeholder='you@example.com' name='email' required />
            </div>
            <div className='md:col-span-2'>
              <label className='mb-1 block text-sm'>Project Details</label>
              <textarea className='w-full rounded-xl border border-white/20 bg-white/5 p-2' name='message' rows={6} placeholder='What are you trying to achieve?' />
            </div>
            <div className='md:col-span-2 flex items-center justify-between'>
              <div className='flex gap-2 text-xs muted'><Pill>Web</Pill><Pill>Brand</Pill><Pill>Decks</Pill><Pill>Content</Pill></div>
              <Button type='submit'>{sending ? 'Sending…' : 'Send enquiry'}</Button>
            </div>
            {ok === true && <p className='text-sm text-green-400'>Thanks! We’ll get back to you shortly.</p>}
            {ok === false && <p className='text-sm text-red-400'>Something went wrong. Please try again.</p>}
          </form>
        </Card>
      </Section>

      <footer className='border-t border-white/10'>
        <div className='section py-8 !px-4 md:!px-8 flex items-center justify-between'>
          <p className='text-sm muted'>© {new Date().getFullYear()} The Kandid Edit</p>
          <div className='flex gap-4 text-sm'>
            <a href='#'>Instagram</a><a href='#'>LinkedIn</a><a href='mailto:thekandidedit@gmail.com'>Email</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
