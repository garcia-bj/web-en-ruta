import { useEffect, useRef } from 'react'
import Vehicle from './Vehicles.jsx'

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
// how far an element has travelled through the viewport: 0 when its top reaches a*vh, 1 when its bottom reaches b*vh
const prog = (r, vh, a = 0.85, b = 0.35) => clamp((vh * a - r.top) / (r.height + vh * (a - b)))
const still = () => matchMedia('(prefers-reduced-motion: reduce)').matches

export function useScrub(ref, apply) {
  useEffect(() => {
    const el = ref.current
    let raf
    const run = () => { raf = 0; apply(el.getBoundingClientRect(), innerHeight, el) }
    const f = () => { raf ||= requestAnimationFrame(run) }
    run()
    addEventListener('scroll', f, { passive: true })
    addEventListener('resize', f)
    return () => { removeEventListener('scroll', f); removeEventListener('resize', f); cancelAnimationFrame(raf) }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
}

/** Hero: a van grows and drives out of the hero as you scroll it away. */
export function HeroVan() {
  const ref = useRef(null)
  useScrub(ref, (r) => {
    const p = clamp(-r.top / (r.height * 0.75))
    const v = ref.current.firstChild
    v.style.opacity = p > 0.01 ? 1 : 0
    v.style.transform = `translate(${-300 + p * (r.width + 700)}px,0) scale(${0.45 + p * 1.1})`
    ref.current.style.setProperty('--wr', `${p * 2400}deg`)
  })
  return <div ref={ref} className="hero-van" aria-hidden="true"><div className="rider-hero"><Vehicle kind="van" /></div></div>
}

/** A vehicle that follows an SVG path as the section scrolls; the path fills in behind it. */
export function Rider({ d, vb, kind, scale = 0.5, preserve = 'xMidYMid meet', className = '', stroke = 4, base = '#e3e0d8', a, b, children }) {
  const wrap = useRef(null), svg = useRef(null), path = useRef(null), fill = useRef(null), veh = useRef(null)
  useScrub(wrap, (r, vh) => {
    const p = still() ? 1 : prog(r, vh, a, b)
    const len = path.current.getTotalLength()
    fill.current.style.strokeDasharray = `${p} 1`
    const at = (t) => {
      const q = path.current.getPointAtLength(len * t), s = svg.current.createSVGPoint()
      s.x = q.x; s.y = q.y
      return s.matrixTransform(svg.current.getScreenCTM())
    }
    const q = at(p), q2 = at(Math.min(1, p + 0.01)), q1 = at(Math.max(0, p - 0.01))
    const ang = clamp(Math.atan2(q2.y - q1.y, q2.x - q1.x) * 180 / Math.PI, -22, 22)
    veh.current.style.transform = `translate(${q.x - r.left}px,${q.y - r.top}px) translate(-50%,-88%) rotate(${ang}deg) scale(${scale})`
    wrap.current.style.setProperty('--wr', `${p * len * 1.4}deg`)
  })
  return (
    <div ref={wrap} className={`ride ${className}`}>
      <svg ref={svg} viewBox={vb} preserveAspectRatio={preserve} overflow="visible">
        <path ref={path} d={d} fill="none" stroke={base} strokeWidth={stroke} vectorEffect="non-scaling-stroke" />
        <path ref={fill} d={d} pathLength="1" fill="none" stroke="#ff6a13" strokeWidth={stroke} vectorEffect="non-scaling-stroke" style={{ strokeDasharray: '0 1' }} />
        {children}
      </svg>
      <div ref={veh} className="rider"><Vehicle kind={kind} /></div>
    </div>
  )
}

/** Cómo funciona: a car drives along the step line and lights up each step it reaches. */
export function StepsLine() {
  const ref = useRef(null)
  useScrub(ref, (r, vh, el) => {
    const parent = el.parentElement
    const p = still() ? 1 : prog(parent.getBoundingClientRect(), vh, 0.8, 0.45)
    parent.style.setProperty('--lp', p)
    parent.style.setProperty('--wr', `${p * 2600}deg`)
    parent.querySelectorAll('.step').forEach((s, i) => s.classList.toggle('reached', p >= (i + 0.5) / 4 - 0.03))
  })
  return (
    <div ref={ref} className="steps-line"><i /><span className="step-car"><Vehicle kind="car" /></span></div>
  )
}
