import { useInView } from './ui.jsx'
import DEPTS from './boliviaGeo.js'

const proj = ([lo, la]) => [(lo + 69.7) * 31.7, (-9.6 - la) * 33] // same projection as boliviaGeo.js

// label offset [dx, dy, anchor]
export const CITIES = {
  cb: { n: 'Cochabamba', p: proj([-66.16, -17.39]), l: [-11, -9, 'end'] },
  sc: { n: 'Santa Cruz', p: proj([-63.18, -17.78]), l: [11, 4, 'start'] },
  lp: { n: 'La Paz', p: proj([-68.15, -16.5]), l: [-10, -2, 'end'] },
  su: { n: 'Sucre', p: proj([-65.26, -19.04]), l: [11, 4, 'start'] },
  ta: { n: 'Tarija', p: proj([-64.73, -21.53]), l: [11, 4, 'start'] },
  tr: { n: 'Trinidad', p: proj([-64.9, -14.83]), l: [11, 4, 'start'] },
  or: { n: 'Oruro', p: proj([-67.1, -17.97]), l: [-9, 4, 'end'] },
  po: { n: 'Potosí', p: proj([-65.75, -19.58]), l: [-9, 6, 'end'] },
}

const BEND = { sc: 0.28, lp: -0.22, su: 0.2, ta: 0.14, tr: -0.2 }
const ctrl = (a, b, k) => [(a[0] + b[0]) / 2 - (b[1] - a[1]) * k, (a[1] + b[1]) / 2 + (b[0] - a[0]) * k]
const route = (to) => {
  const a = CITIES.cb.p, b = CITIES[to].p
  return { a, b, c: ctrl(a, b, BEND[to] ?? 0.2) }
}
const at = ({ a, b, c }, t) => [0, 1].map((i) => (1 - t) ** 2 * a[i] + 2 * (1 - t) * t * c[i] + t * t * b[i])

function Truck() {
  return (
    <g>
      <circle r="11" fill="#ff6a13" stroke="#fff" strokeWidth="2.5" />
      <g transform="translate(-6.5 -6.5) scale(.54)">
        <path d="M2 6h11v10H2zM13 9h4l4 4v3h-8" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinejoin="round" />
      </g>
    </g>
  )
}

/**
 * routes: destination keys drawn from Cochabamba. solid: keys drawn as the active (orange) route.
 * progress: 0-1, if set the active route is partially travelled and the vehicle parks at that point.
 */
export default function BoliviaMap({
  routes = ['sc', 'lp', 'su', 'ta', 'tr'], solid = ['sc'], cities = ['cb', 'sc', 'lp', 'su', 'ta', 'tr'],
  progress, view = '0 0 390 440', fs = 11, moving = true, className = '',
}) {
  const [ref, on] = useInView(0.08)
  const d = (r) => `M${r.a[0]} ${r.a[1]}Q${r.c[0]} ${r.c[1]} ${r.b[0]} ${r.b[1]}`
  let i = 0
  return (
    <div ref={ref} className={`map ${on ? 'in' : ''} ${className}`}>
      <svg viewBox={view} role="img" aria-label="Mapa estilizado de Bolivia con rutas desde Cochabamba">
        <g className="depts">
          {Object.entries(DEPTS).map(([n, d], k) => (
            <path key={n} d={d} className={`dept ${n === 'Cochabamba' ? 'home' : ''}`} style={{ '--d': `${k * 70}ms` }} />
          ))}
        </g>

        {routes.map((k) => {
          const r = route(k)
          return solid.includes(k) ? null : (
            <path key={k} d={d(r)} className="route-dash" fill="none" stroke="#9a9a94" strokeWidth="1.6" strokeDasharray="3 5" strokeLinecap="round" />
          )
        })}

        {solid.filter((k) => routes.includes(k)).map((k) => {
          const r = route(k)
          const p = progress != null ? at(r, progress) : null
          return (
            <g key={k}>
              <path d={d(r)} fill="none" stroke="#e3e0d8" strokeWidth="4" strokeLinecap="round" />
              {p ? (
                <>
                  <path d={d(r)} pathLength="1" className="prog" style={{ '--to': progress }} fill="none" stroke="#ff6a13" strokeWidth="4" />
                  <g className="veh" transform={`translate(${p[0]} ${p[1]})`}>
                    <circle className="ping" r="11" fill="#ff6a13" />
                    <Truck />
                  </g>
                </>
              ) : (
                <>
                  <path d={d(r)} pathLength="1" className="draw" fill="none" stroke="#ff6a13" strokeWidth="4" />
                  {moving && (
                    <g className="veh">
                      <Truck />
                      <animateMotion dur="9s" begin="2s" repeatCount="indefinite" path={d(r)}
                        calcMode="spline" keyTimes="0;1" keyPoints="0;1" keySplines=".45 0 .55 1" />
                    </g>
                  )}
                </>
              )}
            </g>
          )
        })}

        {cities.map((k) => {
          const c = CITIES[k], origin = k === 'cb'
          const [dx, dy, anchor] = c.l
          return (
            <g key={k} transform={`translate(${c.p[0]} ${c.p[1]})`}>
              <g className="pin" style={{ '--d': `${300 + i++ * 140}ms` }}>
                {origin && <circle className="ping" r="9" fill="#ff6a13" />}
                <circle r={origin ? 7 : 5} fill={origin ? '#ff6a13' : '#111214'} stroke="#fff" strokeWidth="2.5" />
                <text x={dx} y={dy} textAnchor={anchor} fontSize={origin ? fs * 1.15 : fs} fontWeight={origin ? 800 : 600}
                  fill="#111214" stroke="#fbfaf8" strokeWidth="3.5" paintOrder="stroke" fontFamily="Inter, sans-serif">
                  {c.n}
                </text>
              </g>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
