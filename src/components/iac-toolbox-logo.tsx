export function IaCToolboxLogo({ className = 'h-10 w-10' }: { className?: string }) {
  return (
    <svg viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg' className={className}>
      {/* Background hexagon - representing infrastructure/tech */}
      <path d='M24 4L42 14V34L24 44L6 34V14L24 4Z' className='fill-primary' />

      {/* Inner hexagon glow */}
      <path d='M24 8L38 16V32L24 40L10 32V16L24 8Z' className='fill-primary-foreground/10' />

      {/* Stack layers - representing infrastructure layers */}
      <rect x='14' y='16' width='20' height='4' rx='1' className='fill-primary-foreground' />
      <rect x='16' y='22' width='16' height='4' rx='1' className='fill-primary-foreground/80' />
      <rect x='18' y='28' width='12' height='4' rx='1' className='fill-primary-foreground/60' />

      {/* Code bracket accents */}
      <path
        d='M12 20L9 24L12 28'
        className='stroke-primary-foreground'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M36 20L39 24L36 28'
        className='stroke-primary-foreground'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
