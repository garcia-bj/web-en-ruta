const Wheel = ({ cx, cy, r = 15 }) => (
  <g transform={`translate(${cx} ${cy})`}>
    <circle r={r + 2} fill="#111214" />
    <g className="wheel">
      <circle r={r * 0.62} fill="#e7e5df" />
      <path d={`M${-r * .62} 0H${r * .62}M0 ${-r * .62}V${r * .62}M${-r * .44} ${-r * .44}L${r * .44} ${r * .44}M${r * .44} ${-r * .44}L${-r * .44} ${r * .44}`} stroke="#9a9a94" strokeWidth="1.6" />
      <circle r="2.5" fill="#111214" />
    </g>
  </g>
)

// All vehicles face right; `.wheel` spins with --wr (set by the scroll scenes).
const ART = {
  van: [220, 120, (
    <>
      <ellipse cx="110" cy="112" rx="96" ry="5" fill="rgba(15,16,18,.18)" />
      <rect x="8" y="20" width="124" height="64" rx="9" fill="#ff6a13" />
      <rect x="8" y="48" width="124" height="7" fill="#fff" opacity=".92" />
      <path d="M22 34h30" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".7" />
      <path d="M132 36h36l28 24v26h-64z" fill="#1b1d21" />
      <path d="M140 44h24l18 16h-42z" fill="#cfd3d8" />
      <rect x="8" y="82" width="190" height="10" rx="4" fill="#111214" />
      <circle cx="192" cy="70" r="4" fill="#ffd9b8" />
      <Wheel cx={48} cy={94} /><Wheel cx={164} cy={94} />
    </>)],
  moto: [140, 96, (
    <>
      <ellipse cx="70" cy="90" rx="58" ry="4" fill="rgba(15,16,18,.18)" />
      <rect x="6" y="14" width="42" height="32" rx="5" fill="#ff6a13" />
      <rect x="6" y="26" width="42" height="5" fill="#fff" opacity=".9" />
      <path d="M28 70L54 44H88L112 70" stroke="#111214" strokeWidth="5" fill="none" strokeLinejoin="round" />
      <rect x="48" y="36" width="40" height="9" rx="4" fill="#111214" />
      <path d="M88 42L102 32L110 38L98 48Z" fill="#ff6a13" />
      <path d="M102 32L106 20H116" stroke="#111214" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M62 24Q76 20 86 32L82 42L60 40Z" fill="#1b1d21" />
      <path d="M82 28L108 24" stroke="#1b1d21" strokeWidth="6" strokeLinecap="round" />
      <path d="M66 42L82 60L76 70" stroke="#1b1d21" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="74" cy="14" r="9" fill="#111214" /><path d="M78 11h6" stroke="#cfd3d8" strokeWidth="3" strokeLinecap="round" />
      <Wheel cx={28} cy={72} r={14} /><Wheel cx={114} cy={72} r={14} />
    </>)],
  car: [200, 90, (
    <>
      <ellipse cx="100" cy="84" rx="88" ry="4" fill="rgba(15,16,18,.18)" />
      <path d="M8 62V48Q8 42 16 40L52 36L72 16Q76 12 82 12H128Q134 12 138 16L160 38L184 42Q192 44 192 52V62Z" fill="#ff6a13" />
      <path d="M62 36L78 20H100V36Z M106 20H130L148 36H106Z" fill="#cfd3d8" />
      <rect x="8" y="48" width="184" height="4" fill="#fff" opacity=".85" />
      <rect x="8" y="60" width="184" height="6" rx="3" fill="#111214" />
      <circle cx="186" cy="50" r="3.5" fill="#ffd9b8" />
      <Wheel cx={50} cy={66} /><Wheel cx={150} cy={66} />
    </>)],
  bus: [300, 112, (
    <>
      <ellipse cx="150" cy="106" rx="136" ry="5" fill="rgba(15,16,18,.18)" />
      <rect x="6" y="12" width="288" height="74" rx="14" fill="#1b1d21" />
      <rect x="6" y="58" width="288" height="11" fill="#ff6a13" />
      {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={20 + i * 38} y="26" width="29" height="26" rx="5" fill="#cfd3d8" />)}
      <path d="M252 26h28q8 0 8 8v18h-36z" fill="#cfd3d8" />
      <rect x="110" y="14" width="72" height="8" rx="4" fill="#ff6a13" />
      <circle cx="288" cy="76" r="4" fill="#ffd9b8" />
      <Wheel cx={70} cy={88} r={16} /><Wheel cx={226} cy={88} r={16} />
    </>)],
}

export default function Vehicle({ kind = 'van', className = '' }) {
  const [w, h, art] = ART[kind]
  return (
    <svg className={`vh ${className}`} viewBox={`0 0 ${w} ${h}`} width={w} height={h} aria-hidden="true">{art}</svg>
  )
}
