import { useEffect } from 'react'
import { Logo } from './ui.jsx'
import { Business, Carriers, Coverage, FinalCta, Footer, Hero, How, Nav, Network, People, Problem, Proof, SendDialog, Tracking } from './sections.jsx'

export default function App() {
  // scroll position as a CSS var for subtle parallax
  useEffect(() => {
    let raf
    const f = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => { const r = document.documentElement.style; r.setProperty('--sy', scrollY); r.setProperty('--p', scrollY / (document.documentElement.scrollHeight - innerHeight || 1)) })
    }
    addEventListener('scroll', f, { passive: true })
    return () => removeEventListener('scroll', f)
  }, [])
  return (
    <>
      <div className="intro" aria-hidden="true"><div className="intro-in"><Logo />
        <svg viewBox="0 0 100 20" preserveAspectRatio="none"><path pathLength="1" d="M0 10C25 10 25 2 50 10S75 18 100 10" fill="none" stroke="#ff6a13" strokeWidth="3" strokeLinecap="round" /></svg></div></div>
      <div className="progress" />
      <Nav />
      <main>
        <Hero />
        <Problem />
        <How />
        <Tracking />
        <People />
        <Business />
        <Network />
        <Proof />
        <Carriers />
        <Coverage />
        <FinalCta />
      </main>
      <Footer />
      <SendDialog />
    </>
  )
}
