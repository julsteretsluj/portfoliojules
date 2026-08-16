export default function Squiggle({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`squiggle ${className}`}
      viewBox="0 0 180 18"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 11c18-10 28 8 46 0s28-12 44 0 30 10 46-2 26-8 38 2"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
