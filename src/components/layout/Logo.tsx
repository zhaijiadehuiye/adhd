export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
      className="shrink-0"
    >
      <rect width="64" height="64" rx="16" fill="var(--brand)" />
      <g
        fill="none"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.95"
      >
        <circle cx="32" cy="32" r="7" fill="#fff" stroke="none" />
        <circle cx="32" cy="32" r="15" opacity="0.55" />
        <circle cx="32" cy="32" r="23" opacity="0.28" />
      </g>
    </svg>
  )
}
