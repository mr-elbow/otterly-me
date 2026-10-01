// A cute hand-drawn SVG otter mascot for Otterly Me!
export default function OtterMascot({ size = 96, className = '', wave = false }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={`${wave ? 'animate-wiggle' : ''} ${className}`}
      role="img"
      aria-label="Ollie the otter"
    >
      {/* Ears */}
      <circle cx="28" cy="34" r="13" fill="#7c4a21" />
      <circle cx="28" cy="34" r="6" fill="#a4713d" />
      <circle cx="92" cy="34" r="13" fill="#7c4a21" />
      <circle cx="92" cy="34" r="6" fill="#a4713d" />
      {/* Head */}
      <ellipse cx="60" cy="66" rx="42" ry="38" fill="#8b5a2b" />
      {/* Cheek fluff */}
      <circle cx="26" cy="80" r="7" fill="#a4713d" opacity="0.7" />
      <circle cx="94" cy="80" r="7" fill="#a4713d" opacity="0.7" />
      {/* Muzzle */}
      <ellipse cx="60" cy="86" rx="24" ry="17" fill="#e8c07d" />
      {/* Eyes */}
      <circle cx="43" cy="58" r="7" fill="#2b1a0e" />
      <circle cx="77" cy="58" r="7" fill="#2b1a0e" />
      <circle cx="45.5" cy="55.5" r="2.4" fill="#ffffff" />
      <circle cx="79.5" cy="55.5" r="2.4" fill="#ffffff" />
      {/* Nose */}
      <ellipse cx="60" cy="78" rx="7" ry="5.5" fill="#3b2412" />
      {/* Smile */}
      <path
        d="M60 83.5 Q60 90 52 91 M60 83.5 Q60 90 68 91"
        stroke="#3b2412"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Whiskers */}
      <g stroke="#3b2412" strokeWidth="1.6" strokeLinecap="round" opacity="0.7">
        <line x1="18" y1="78" x2="34" y2="82" />
        <line x1="18" y1="88" x2="34" y2="87" />
        <line x1="102" y1="78" x2="86" y2="82" />
        <line x1="102" y1="88" x2="86" y2="87" />
      </g>
      {/* Water splash base */}
      <path
        d="M14 108 q8 -10 16 0 q8 10 16 0 q8 -10 16 0 q8 10 16 0 q8 -10 16 0"
        stroke="#2dd4bf"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  )
}
