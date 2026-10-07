import { useEffect, useRef, useState } from 'react'
import BoliviaMap from './BoliviaMap.jsx'
import { Count, Icon, Logo, Reveal, Words } from './ui.jsx'

const Send = ({ children = 'Enviar un paquete', cls = 'primary lg' }) => (
  <a href="#enviar" data-send className={`btn ${cls}`}>{children} <Icon n="arrow" size={18} className="arr" /></a>
)

/* ───────────── NAV ───────────── */
const LINKS = [['Inicio', '#inicio'], ['Cómo funciona', '#como-funciona'], ['Seguimiento', '#seguimiento'], ['Para negocios', '#negocios']]

export function Nav() {
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  useEffect(() => {
    const f = () => setSolid(scrollY > 12)
    f(); addEventListener('scroll', f, { passive: true })
    return () => removeEventListener('scroll', f)
  }, [])
  return (
    <header className={`nav ${solid || open ? 'solid' : ''}`}>
      <div className="container nav-in">
        <a href="#inicio" aria-label="En Ruta, inicio"><Logo /></a>
        <nav className={`menu ${open ? 'open' : ''}`} aria-label="Principal">
          {LINKS.map(([t, h]) => <a key={h} href={h} onClick={() => setOpen(false)}>{t}</a>)}
          <a href="#login" className="btn ghost only-m">Iniciar sesión</a>
        </nav>
        <div className="nav-cta">
          <a href="#login" className="btn ghost sm not-m">Iniciar sesión</a>
          <a href="#enviar" data-send className="btn primary sm">Enviar un paquete</a>
          <button className="burger" aria-label="Menú" aria-expanded={open} onClick={() => setOpen(!open)}>
            <Icon n={open ? 'x' : 'menu'} size={22} />
          </button>
        </div>
      </div>
    </header>
  )
}

/* ───────────── HERO ───────────── */
export function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow"><span className="dot" />Envíos entre ciudades de Bolivia</p>
          <h1 className="display">
            <span className="w" style={{ '--i': 0 }}>Envía.</span>{' '}
            <span className="w o" style={{ '--i': 1 }}>Sigue.</span>{' '}
            <span className="w" style={{ '--i': 2 }}>Recibe.</span>
          </h1>
          <p className="lead">Tus paquetes viajan contigo, estés donde estés.</p>
          <p className="sub">En Ruta conecta personas, negocios y transportistas para hacer que los envíos interdepartamentales sean simples, seguros y trazables.</p>
          <div className="cta-row">
            <Send />
            <a href="#como-funciona" className="btn ghost lg">Ver cómo funciona</a>
          </div>
        </div>
        <div className="hero-stage" onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect()
          e.currentTarget.style.setProperty('--mx', (e.clientX - r.left) / r.width - 0.5)
          e.currentTarget.style.setProperty('--my', (e.clientY - r.top) / r.height - 0.5)
        }}>
          <div className="stage-map"><BoliviaMap /></div>
          <div className="tcard hero-card">
            <div className="tc-top"><span className="live"><i />En tránsito</span><span className="mono">ENR-28491</span></div>
            <h3>Tu paquete está en ruta</h3>
            <p className="tc-route">Cochabamba <Icon n="arrow" size={16} /> Santa Cruz</p>
            <div className="bar"><i style={{ '--w': '62%' }} /></div>
            <div className="tc-eta"><small>Llegada estimada</small><b>Hoy · 18:40</b></div>
          </div>
          <div className="chip-float"><Icon n="box" size={16} /> Paquete recogido · 09:10</div>
        </div>
      </div>
      <div className="container trust">
        <span><Icon n="box" size={16} />Envíos reales</span>
        <span><Icon n="pin" size={16} />Seguimiento en tiempo real</span>
        <span><Icon n="truck" size={16} />Transportistas afiliados</span>
      </div>
    </section>
  )
}

/* ───────────── PROBLEMA ───────────── */
function Person({ x, s = 1, fill, box }) {
  return (
    <g transform={`translate(${x} 300) scale(${s})`}>
      <circle cx="0" cy="-70" r="10" fill={fill} />
      <rect x="-12" y="-57" width="24" height="46" rx="10" fill={fill} />
      <rect x="-9" y="-12" width="7" height="14" rx="3" fill={fill} />
      <rect x="2" y="-12" width="7" height="14" rx="3" fill={fill} />
      {box && <rect x="6" y="-42" width="20" height="18" rx="3" fill="#ff6a13" />}
    </g>
  )
}

function Scene() {
  return (
    <Reveal className="scene">
      <svg viewBox="0 0 560 360" role="img" aria-label="Persona en una fila larga en la terminal, con tráfico alrededor">
        <rect width="560" height="360" fill="#1b1d21" />
        <g>
          <rect x="330" y="50" width="190" height="130" rx="10" fill="#26292e" />
          <rect x="344" y="62" width="162" height="26" rx="6" fill="#ff6a13" />
          <text x="425" y="80" textAnchor="middle" fontSize="13" fontWeight="800" fill="#fff" letterSpacing="3" fontFamily="Archivo">TERMINAL</text>
          {[0, 1, 2, 3].map((i) => <rect key={i} x={346 + i * 41} y="104" width="30" height="56" rx="4" fill="#33373d" />)}
        </g>
        <rect x="0" y="300" width="560" height="60" fill="#15161a" />
        <path d="M0 330H560" stroke="#3a3e45" strokeDasharray="14 12" strokeWidth="3" />
        {[[210, '#3a3e45'], [390, "#4a4f57"]].map(([x, c]) => (
          <g key={x} className="car" style={{ '--x': x + 'px' }}>
            <rect x="0" y="312" width="62" height="22" rx="8" fill={c} />
            <rect x="12" y="304" width="34" height="14" rx="6" fill={c} />
            <circle cx="58" cy="322" r="2.5" fill="#ff4d3d" />
          </g>
        ))}
        {[300, 266, 232, 198, 164, 130].map((x, i) => <Person key={x} x={x} fill={['#4b5058', '#5a6069', '#434850'][i % 3]} />)}
        <Person x="62" s="1.35" fill="#f2efe9" box />
        <g transform="translate(34 70)">
          <circle cx="26" cy="26" r="26" fill="#26292e" stroke="#ff6a13" strokeWidth="2" />
          <path d="M26 12v15l9 6" stroke="#ff6a13" strokeWidth="3" strokeLinecap="round" fill="none" />
        </g>
      </svg>
      <span className="tag t1">Fila · 2 h 40 min</span>
      <span className="tag t2">Tráfico a la terminal</span>
      <span className="tag t3">¿Cuándo llega?</span>
    </Reveal>
  )
}

export function Problem() {
  return (
    <section className="sec problem">
      <div className="container">
        <div className="prob-grid">
          <Reveal>
            <h2 className="h2"><Words>Enviar un paquete no debería quitarte toda una tarde.</Words></h2>
            <p className="body">Actualmente, enviar un paquete entre ciudades puede significar trasladarse hasta una terminal, esperar, entregar el paquete y después quedarse sin saber exactamente cuándo llegará.</p>
          </Reveal>
          <Scene />
        </div>

        <Reveal className="bridge">
          <svg className="bridge-line" viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden="true">
            <path className="draw" pathLength="1" d="M0 90C200 90 220 30 420 30S700 100 1000 40" fill="none" stroke="#ff6a13" strokeWidth="4" />
          </svg>
          <div className="bridge-in">
            <h3 className="h3">En Ruta <span className="o">cambia eso.</span></h3>
            <p className="body">Tu envío comienza desde donde estás y puedes conocer su recorrido.</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ───────────── CÓMO FUNCIONA ───────────── */
const HOW = [
  ['Solicita', 'Indica qué quieres enviar y dónde debe llegar.'],
  ['Conectamos', 'En Ruta encuentra la mejor alternativa de transporte disponible.'],
  ['Sigue', 'Consulta el recorrido de tu paquete y conoce su estado.'],
  ['Recibe', 'Tu destinatario recibe el paquete sin depender de información informal.'],
]

function Mini({ i }) {
  if (i === 0) return (
    <div className="mini">
      <div className="mrow"><Icon n="pin" size={15} /><span>Origen</span><b>Cochabamba</b></div>
      <div className="mrow"><Icon n="pin" size={15} /><span>Destino</span><b>Santa Cruz</b></div>
      <div className="mchips"><em className="on">Caja mediana</em><em>Sobre</em><em>Bulto</em></div>
    </div>
  )
  if (i === 1) return (
    <div className="mini">
      {[['truck', 'Bus interdepartamental', 'Mejor opción'], ['bike', 'Delivery', ''], ['building', 'Operador logístico', '']].map(([ic, t, b]) => (
        <div key={t} className={`mrow ${b ? 'best' : ''}`}><Icon n={ic} size={15} /><b>{t}</b>{b && <em className="on">{b}</em>}</div>
      ))}
    </div>
  )
  if (i === 2) return (
    <div className="mini">
      <div className="mrow"><span className="live"><i />En tránsito</span><b className="mono">ENR-28491</b></div>
      <div className="bar"><i style={{ '--w': '58%' }} /></div>
      <small className="muted">Actualizado hace 4 min</small>
    </div>
  )
  return (
    <div className="mini center">
      <span className="okc"><Icon n="check" size={22} /></span>
      <b>Entregado</b>
      <small className="muted">Recibido en Santa Cruz</small>
    </div>
  )
}

export function How() {
  return (
    <section id="como-funciona" className="sec how">
      <div className="container">
        <Reveal className="sec-head">
          <p className="kicker">Cómo funciona</p>
          <h2 className="h2"><Words>Cuatro pasos. Cero filas.</Words></h2>
        </Reveal>
        <Reveal className="steps">
          <div className="steps-line"><i /></div>
          {HOW.map(([t, p], i) => (
            <div key={t} className="step card" style={{ '--d': `${i * 140}ms` }}>
              <span className="num">0{i + 1}</span>
              <h3>{t}</h3>
              <p>{p}</p>
              <Mini i={i} />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

/* ───────────── TRACKING ───────────── */
const TL = [['Envío solicitado', 'Cochabamba · 08:05'], ['Paquete recibido', 'Cochabamba · 09:10'], ['Salió de Cochabamba', '11:32'], ['En ruta', 'Carretera a Santa Cruz'], ['Llegada a Santa Cruz', 'Estimada 18:40'], ['Entregado', '']]
const NOW = 3
const clamp = (v, a, b) => Math.min(b, Math.max(a, v))

export function Tracking() {
  const [code, setCode] = useState('ENR-28491')
  const [shown, setShown] = useState(true)
  const [run, setRun] = useState(0)
  // Wide screens: the section pins and scrolling advances the shipment (p: 0 → 1). Elsewhere it stays static.
  const secRef = useRef(null)
  const [scrub, setScrub] = useState(false)
  const [p, setP] = useState(0)
  useEffect(() => {
    const mq = matchMedia('(min-width:1000px) and (min-height:640px)')
    const f = () => setScrub(mq.matches)
    f(); mq.addEventListener('change', f)
    return () => mq.removeEventListener('change', f)
  }, [])
  useEffect(() => {
    if (!scrub) return
    const f = () => {
      const r = secRef.current.getBoundingClientRect()
      setP(Math.round(clamp(-r.top / (r.height - innerHeight), 0, 1) * 100) / 100)
    }
    f(); addEventListener('scroll', f, { passive: true })
    return () => removeEventListener('scroll', f)
  }, [scrub])
  const now = scrub ? clamp(Math.floor(p * 5.99) + 1, 1, 5) : NOW
  const prog = scrub ? 0.06 + p * 0.88 : 0.55
  const submit = (e) => {
    e.preventDefault()
    const ok = code.trim().toUpperCase() === 'ENR-28491'
    setShown(ok)
    if (ok) setRun((n) => n + 1)
  }
  return (
    <section id="seguimiento" ref={secRef} className={`sec track ${scrub ? 'scrub' : ''}`}>
      <div className="sticky"><div className="container">
        <Reveal className="sec-head split">
          <div>
            <p className="kicker">Seguimiento</p>
            <h2 className="h2"><Words>Siempre sabes dónde está.</Words></h2>
          </div>
          <form className="trackform" onSubmit={submit}>
            <Icon n="search" size={18} />
            <input value={code} onChange={(e) => setCode(e.target.value)} aria-label="Código de seguimiento" placeholder="ENR-00000" />
            <button className="btn primary sm">Rastrear</button>
          </form>
        </Reveal>

        {shown ? (
          <Reveal key={run} className="track-grid">
            <div className="card trk">
              <div className="trk-head">
                <div>
                  <small className="muted">Código de seguimiento</small>
                  <h3 className="mono big">ENR-28491</h3>
                </div>
                <span className="live pill"><i />{now === 5 ? 'Entregado' : 'En tránsito'}</span>
              </div>
              <p className="tc-route lg">Cochabamba <Icon n="arrow" size={18} /> Santa Cruz</p>
              <ol className="tl">
                {TL.map(([t, s], i) => (
                  <li key={t} className={i < now ? 'done' : i === now ? 'now' : ''} style={{ '--d': `${300 + i * 160}ms` }}>
                    <span className="node">{i < now && <Icon n="check" size={13} />}</span>
                    <div><b>{t}</b>{s && <small>{s}</small>}</div>
                  </li>
                ))}
              </ol>
              <div className="trk-foot"><span><small>Última actualización</small><b>{scrub && p > 0.02 ? 'Ahora mismo' : 'Hace 4 minutos'}</b></span><span><small>Llegada estimada</small><b>Hoy · 18:40</b></span></div>
            </div>
            <div className="trk-map">
              <BoliviaMap view="45 195 230 125" routes={['sc']} cities={['cb', 'sc']} progress={prog} fs={7} />
              <div className="chip-float on-map"><Icon n="truck" size={15} /> Transporte en movimiento</div>
              {scrub && <span className="hint">Desplaza para avanzar el envío</span>}
            </div>
          </Reveal>
        ) : (
          <p className="nf card">No encontramos ese código. Prueba con <button type="button" onClick={() => { setCode('ENR-28491'); setShown(true); setRun((n) => n + 1) }}>ENR-28491</button>.</p>
        )}
      </div>
    </div></section>
  )
}

/* ───────────── PARA PERSONAS ───────────── */
export function People() {
  return (
    <section id="personas" className="sec people">
      <div className="container two">
        <Reveal>
          <p className="kicker">Para personas</p>
          <h2 className="h2"><Words>Envía desde donde estés.</Words></h2>
          <p className="body">No necesitas perder tiempo en terminales ni depender de mensajes para saber dónde está tu paquete.</p>
          <ul className="benefits">
            {[['clock', 'Menos traslados', 'Gestiona tu envío sin perder horas.'], ['shield', 'Más tranquilidad', 'Conoce el estado de tu paquete.'], ['compass', 'Más control', 'Información clara durante todo el recorrido.']].map(([ic, t, p]) => (
              <li key={t}><span className="ico"><Icon n={ic} /></span><div><b>{t}</b><p>{p}</p></div></li>
            ))}
          </ul>
          <Send cls="primary lg">Quiero enviar un paquete</Send>
        </Reveal>
        <Reveal delay={150} className="phone-wrap">
          <div className="phone">
            <div className="notch" />
            <small className="muted">Nuevo envío</small>
            <h4>¿Qué quieres enviar?</h4>
            <div className="field"><small>Recojo</small><b>Av. Heroínas, Cochabamba</b></div>
            <div className="field"><small>Destino</small><b>Santa Cruz de la Sierra</b></div>
            <div className="mchips"><em className="on">Caja mediana</em><em>Sobre</em><em>Bulto</em></div>
            <div className="quote"><span>Llega</span><b>Hoy · 18:40</b></div>
            <div className="btn primary block">Confirmar envío</div>
          </div>
          <div className="chip-float side"><Icon n="check" size={15} /> Recojo confirmado</div>
        </Reveal>
      </div>
    </section>
  )
}

/* ───────────── PARA NEGOCIOS ───────────── */
const ORDERS = [['#1042', 'María R.', 'Santa Cruz', 'En tránsito', 'now'], ['#1043', 'Luis P.', 'La Paz', 'Recogido', ''], ['#1044', 'Ana C.', 'Sucre', 'Entregado', 'done'], ['#1045', 'Carlos M.', 'Tarija', 'Pendiente', 'wait']]

export function Business() {
  return (
    <section id="negocios" className="sec biz">
      <div className="container two">
        <Reveal>
          <p className="kicker">Para negocios</p>
          <h2 className="h2"><Words>Tus ventas no terminan cuando haces clic en “vender”.</Words></h2>
          <p className="body">En Ruta ayuda a negocios y emprendedores a gestionar sus despachos de forma recurrente, sin convertir cada envío en una tarea manual.</p>
          <ul className="bl">
            {[['repeat', 'Despachos recurrentes'], ['eye', 'Seguimiento de pedidos'], ['clock', 'Menos tiempo operativo'], ['layers', 'Mayor control de entregas']].map(([ic, t]) => (
              <li key={t}><Icon n={ic} size={18} />{t}</li>
            ))}
          </ul>
          <Send cls="primary lg">Conocer soluciones para negocios</Send>
        </Reveal>
        <Reveal delay={150} className="orders-wrap">
          <div className="orders">
            <div className="o-head"><b>Despachos de hoy</b><span className="mono">Cochabamba →</span></div>
            {ORDERS.map(([id, who, to, st, c], i) => (
              <div key={id} className="o-row" style={{ '--d': `${300 + i * 120}ms` }}>
                <span className="mono muted">{id}</span>
                <div><b>{who}</b><small>{to}</small></div>
                <em className={`st ${c}`}>{st}</em>
              </div>
            ))}
          </div>
          <div className="plus">
            {['pedidos gestionados', 'clientes satisfechos', 'tiempo recuperado'].map((t) => <div key={t}><b>+</b><span>{t}</span></div>)}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ───────────── RED ───────────── */
export function Network() {
  const nodes = [['users', 'Personas', 'Piden el envío'], ['box', 'En Ruta', 'Conecta y rastrea'], ['truck', 'Transportistas', 'Mueven el paquete'], ['pin', 'Ciudades', 'Lo reciben']]
  return (
    <section id="red" className="sec net">
      <div className="container">
        <Reveal className="sec-head center">
          <p className="kicker">Red de transporte</p>
          <h2 className="h2"><Words>Una ruta. Muchas posibilidades.</Words></h2>
          <p className="body">En Ruta conecta la demanda de envíos con operadores de transporte y delivery para aprovechar mejor las rutas existentes.</p>
        </Reveal>
        <Reveal className="flow">
          {nodes.map(([ic, t, s], i) => (
            <div key={t} className={`node-c card ${i === 1 ? 'hub' : ''}`} style={{ '--d': `${i * 160}ms` }}>
              <span className="ico"><Icon n={ic} size={24} /></span>
              <b>{t}</b><small>{s}</small>
            </div>
          ))}
          <div className="flow-line"><i /></div>
        </Reveal>
        <Reveal className="ops">
          {[['building', 'Empresas de transporte'], ['bike', 'Deliveries'], ['layers', 'Operadores logísticos']].map(([ic, t]) => (
            <span key={t} className="op"><Icon n={ic} size={17} />{t}</span>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

/* ───────────── VALIDACIÓN ───────────── */
export function Proof() {
  const stats = [[19, '', 'personas encuestadas digitalmente'], [22, '', 'personas entrevistadas directamente'], [5, '', 'envíos interdepartamentales reales realizados'], [100, '%', 'de efectividad operativa en las pruebas realizadas']]
  return (
    <section className="sec proof">
      <div className="container">
        <Reveal className="sec-head">
          <p className="kicker">Validación</p>
          <h2 className="h2"><Words>Ya estamos moviéndonos.</Words></h2>
          <p className="body">En Ruta no nace solo de una idea. La solución fue validada con usuarios, negocios y operadores de transporte.</p>
        </Reveal>
        <div className="stats">
          {stats.map(([n, s, t]) => (
            <div key={t}><b className="stat"><Count to={n} suffix={s} /></b><span>{t}</span></div>
          ))}
        </div>
        <Reveal as="figure" className="quote-card">
          <blockquote>“Quiero una membresía recurrente para evitar perder tardes enteras despachando paquetes manualmente.”</blockquote>
          <figcaption><span className="av">VD</span><div><b>Vendedora digital</b><small>Entrevista de validación</small></div></figcaption>
        </Reveal>
      </div>
    </section>
  )
}

/* ───────────── TRANSPORTISTAS ───────────── */
export function Carriers() {
  return (
    <section id="transportistas" className="sec carriers">
      <div className="container two">
        <Reveal>
          <p className="kicker">Transportistas</p>
          <h2 className="h2"><Words>Convierte el espacio disponible en una oportunidad.</Words></h2>
          <p className="body">Los transportistas pueden integrar sus rutas a En Ruta y generar ingresos adicionales aprovechando mejor la capacidad de sus vehículos.</p>
          <a href="#transportista" data-send className="btn dark lg">Quiero ser transportista <Icon n="arrow" size={18} className="arr" /></a>
        </Reveal>
        <Reveal delay={150} className="road card">
          <svg viewBox="0 0 520 240" aria-hidden="true">
            <path id="road" d="M50 170C170 170 190 70 300 90S440 60 470 70" fill="none" stroke="#e3e0d8" strokeWidth="14" strokeLinecap="round" />
            <path className="draw" pathLength="1" d="M50 170C170 170 190 70 300 90S440 60 470 70" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="1 1" />
            <path d="M50 170C170 170 190 70 300 90S440 60 470 70" fill="none" stroke="#ff6a13" strokeWidth="14" strokeLinecap="round" className="draw" pathLength="1" opacity=".18" />
            {[[50, 170, 'Cochabamba'], [470, 70, 'Destino']].map(([x, y, t]) => (
              <g key={t}><circle cx={x} cy={y} r="9" fill="#111214" stroke="#fff" strokeWidth="3" /><text x={x} y={y + 30} textAnchor="middle" fontSize="13" fontWeight="600" fill="#111214" fontFamily="Inter">{t}</text></g>
            ))}
            <g className="veh">
              <rect x="-24" y="-16" width="34" height="24" rx="5" fill="#ff6a13" />
              <path d="M10 -8h10l8 8v8H10z" fill="#111214" />
              <circle cx="-12" cy="10" r="5" fill="#111214" stroke="#fff" strokeWidth="2" /><circle cx="18" cy="10" r="5" fill="#111214" stroke="#fff" strokeWidth="2" />
              <animateMotion dur="8s" begin="1s" repeatCount="indefinite" calcMode="spline" keyTimes="0;1" keyPoints="0;1" keySplines=".45 0 .55 1">
                <mpath href="#road" />
              </animateMotion>
            </g>
          </svg>
          <div className="cap"><span>Espacio disponible</span><div className="bar"><i style={{ '--w': '45%' }} /></div><b>Ingreso adicional</b></div>
        </Reveal>
      </div>
    </section>
  )
}

/* ───────────── COBERTURA ───────────── */
export function Coverage() {
  return (
    <section id="cobertura" className="sec cov">
      <div className="container">
        <Reveal className="sec-head split">
          <div>
            <p className="kicker">Cobertura</p>
            <h2 className="h2"><Words>Conectando ciudades, una ruta a la vez.</Words></h2>
          </div>
          <ul className="legend">
            <li><i className="lg-o" />Origen inicial · Cochabamba</li>
            <li><i className="lg-s" />Ruta activa de referencia</li>
            <li><i className="lg-d" />Destinos en expansión</li>
          </ul>
        </Reveal>
        <div className="cov-map card">
          <BoliviaMap routes={['sc', 'lp', 'su', 'ta', 'tr']} cities={['cb', 'sc', 'lp', 'su', 'ta', 'tr', 'or', 'po']} fs={10} />
          <p className="note">Mapa conceptual, preparado para evolucionar a un mapa interactivo en vivo.</p>
        </div>
      </div>
    </section>
  )
}

/* ───────────── CTA FINAL ───────────── */
export function FinalCta() {
  return (
    <section className="final">
      <Reveal className="final-in">
        <svg className="final-line" viewBox="0 0 1440 400" preserveAspectRatio="none" aria-hidden="true">
          <path className="draw slow" pathLength="1" d="M-20 320C260 320 300 90 620 130S1000 330 1460 110" fill="none" stroke="#ff6a13" strokeWidth="5" />
        </svg>
        <div className="container">
          <h2 className="display sm">Tu próximo envío <span className="o">empieza aquí.</span></h2>
          <p className="lead">Más simple. Más claro. Más En Ruta.</p>
          <div className="cta-row">
            <Send />
            <a href="#como-funciona" className="btn ghost-d lg">Quiero conocer En Ruta</a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

/* ───────────── FOOTER ───────────── */
export function Footer() {
  return (
    <footer id="contacto" className="footer">
      <div className="container foot-grid">
        <div>
          <Logo chip />
          <p className="tag-line">Envíos que siguen tu ritmo.</p>
          <div className="social">
            {[['ig', 'Instagram'], ['fb', 'Facebook'], ['tt', 'TikTok']].map(([i, n]) => <a key={i} href="#" aria-label={n}><Icon n={i} size={18} /></a>)}
          </div>
        </div>
        <nav aria-label="Pie de página">
          {[['Producto', '#inicio'], ['Cómo funciona', '#como-funciona'], ['Para negocios', '#negocios'], ['Transportistas', '#transportistas'], ['Seguimiento', '#seguimiento'], ['Contacto', '#contacto']].map(([t, h]) => <a key={t} href={h}>{t}</a>)}
        </nav>
      </div>
      <div className="container copy">© 2026 En Ruta. Todos los derechos reservados.</div>
    </footer>
  )
}

/* ───────────── MODAL ENVÍO ───────────── */
export function SendDialog() {
  const ref = useRef(null)
  const [sent, setSent] = useState(false)
  useEffect(() => {
    const f = (e) => {
      const t = e.target.closest('[data-send]')
      if (!t) return
      e.preventDefault(); setSent(false); ref.current.showModal()
    }
    document.addEventListener('click', f)
    return () => document.removeEventListener('click', f)
  }, [])
  const close = () => ref.current.close()
  return (
    <dialog ref={ref} className="dlg" onClick={(e) => e.target === ref.current && close()}>
      <button className="dlg-x" aria-label="Cerrar" onClick={close}><Icon n="x" /></button>
      {sent ? (
        <div className="dlg-ok">
          <span className="okc"><Icon n="check" size={24} /></span>
          <h3>¡Recibimos tu solicitud!</h3>
          <p>Te contactaremos para coordinar el recojo de tu paquete.</p>
          <button className="btn primary" onClick={close}>Listo</button>
        </div>
      ) : (
        // ponytail: no backend yet; wire onSubmit to the API / WhatsApp when available
        <form onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
          <h3>Enviar un paquete</h3>
          <p className="muted">Cuéntanos qué quieres enviar y te contactamos.</p>
          <label>Origen<input value="Cochabamba" readOnly /></label>
          <label>Destino
            <select defaultValue="Santa Cruz">{['Santa Cruz', 'La Paz', 'Sucre', 'Tarija', 'Trinidad', 'Otro'].map((c) => <option key={c}>{c}</option>)}</select>
          </label>
          <label>¿Qué envías?<textarea required rows="2" placeholder="Ej. caja mediana con ropa" /></label>
          <label>Tu celular<input required type="tel" inputMode="tel" placeholder="7XXXXXXX" /></label>
          <button className="btn primary block">Solicitar envío</button>
        </form>
      )}
    </dialog>
  )
}
