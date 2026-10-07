import { useEffect, useRef } from 'react'

// A van that lives in a fixed layer and is driven by scroll. Between every pair of consecutive
// sections it makes one "pass": grows, crosses the screen and parks on the other side.
const SECTIONS = ['#inicio', '.problem', '#como-funciona', '#seguimiento', '#personas', '#negocios', '#red', '.proof', '#transportistas', '#cobertura', '.final']
// [x at start, x at end] as a fraction of viewport width; >1 / <0 means off-screen
const PASS = [[.5, .9], [.9, .1], [.1, 1.25], [-.25, .9], [.9, .1], [.1, .9], [.9, .1], [.1, .9], [.9, .1], [.1, .88]]
const W = 220, H = 120
const ease = (t) => t * t * (3 - 2 * t)
const lerp = (a, b, t) => a + (b - a) * t

export default function ScrollCar() {
  const box = useRef(null)
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = box.current
    const secs = SECTIONS.map((s) => document.querySelector(s))
    let raf
    const draw = () => {
      raf = 0
      const vw = innerWidth, vh = innerHeight
      const k = Math.min(1, vw / 1100) // smaller van on small screens
      // find the latest pass that has started
      let i = -1, t = 0
      for (let n = 0; n < PASS.length; n++) {
        const top = secs[n + 1]?.getBoundingClientRect().top
        if (top == null) break
        const tn = (vh * 0.95 - top) / (vh * 1.2)
        if (tn > 0) { i = n; t = Math.min(tn, 1) }
      }
      if (i < 0) { el.style.opacity = 0; return }
      const [x0, x1] = PASS[i]
      const e = ease(t), arc = Math.sin(Math.PI * t)
      const x = lerp(x0, x1, e) * vw
      const y = (0.86 - 0.36 * arc) * vh
      const s = (0.5 + 1.15 * arc) * k
      const dir = x1 >= x0 ? 1 : -1
      const bob = arc * Math.sin(scrollY / 14) * 2
      el.style.opacity = i === 0 ? Math.min(1, t * 5) : 1
      el.style.transform = `translate3d(${x - W / 2}px,${y - H / 2 + bob}px,0) scale(${s * dir},${s})`
      el.style.setProperty('--wr', `${scrollY * 0.7}deg`)
      el.style.setProperty('--sp', arc.toFixed(2))
    }
    const f = () => { raf ||= requestAnimationFrame(draw) }
    draw()
    addEventListener('scroll', f, { passive: true })
    addEventListener('resize', f)
    return () => { removeEventListener('scroll', f); removeEventListener('resize', f); cancelAnimationFrame(raf) }
  }, [])

  const Wheel = ({ cx }) => (
    <g transform={`translate(${cx} 94)`}>
      <circle r="16" fill="#111214" />
      <g className="wheel">
        <circle r="9" fill="#e7e5df" />
        <path d="M-9 0H9M0 -9V9M-6.4 -6.4L6.4 6.4M6.4 -6.4L-6.4 6.4" stroke="#9a9a94" strokeWidth="1.6" />
        <circle r="2.5" fill="#111214" />
      </g>
    </g>
  )

  return (
    <div ref={box} className="scrollcar" aria-hidden="true" style={{ width: W, height: H, opacity: 0 }}>
      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} overflow="visible">
        <ellipse cx="110" cy="112" rx="96" ry="6" fill="rgba(15,16,18,.18)" />
        <g className="speed" stroke="#ff6a13" strokeWidth="3" strokeLinecap="round">
          <path d="M-14 40H-60M-8 58H-80M-14 76H-50" />
        </g>
        <path d="M196 70L330 40V100Z" fill="url(#beam)" className="beam" />
        <defs>
          <linearGradient id="beam" x1="0" x2="1"><stop offset="0" stopColor="#ffd9b8" stopOpacity=".55" /><stop offset="1" stopColor="#ffd9b8" stopOpacity="0" /></linearGradient>
        </defs>
        <rect x="8" y="20" width="124" height="64" rx="9" fill="#ff6a13" />
        <rect x="8" y="48" width="124" height="7" fill="#fff" opacity=".92" />
        <path d="M22 34h30" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".7" />
        <path d="M132 36h36l28 24v26h-64z" fill="#1b1d21" />
        <path d="M140 44h24l18 16h-42z" fill="#cfd3d8" />
        <rect x="8" y="82" width="190" height="10" rx="4" fill="#111214" />
        <circle cx="192" cy="70" r="4" fill="#ffd9b8" />
        <Wheel cx={48} /><Wheel cx={164} />
      </svg>
    </div>
  )
}
