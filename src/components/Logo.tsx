import { Droplet } from 'lucide-react';

export function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary-600 text-white shadow-glow-sm">
          <Droplet className="h-5 w-5" fill="currentColor" strokeWidth={1.5} />
        </div>
        <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-success-500 ring-2 ring-white" />
      </div>
      <div className="leading-none">
        <p className="font-display text-lg font-extrabold tracking-tight text-navy-900">
          LIFE<span className="text-primary-600">LINK</span>
        </p>
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-navy-400">
          Donor Network
        </p>
      </div>
    </div>
  );
}

export function BloodGroupBadge({
  group,
  size = 'md',
}: {
  group: string;
  size?: 'sm' | 'md' | 'lg';
}) {
  const sizes = {
    sm: 'h-8 w-8 text-sm',
    md: 'h-11 w-11 text-base',
    lg: 'h-14 w-14 text-lg',
  };
  return (
    <div
      className={`grid ${sizes[size]} place-items-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 font-display font-extrabold text-white shadow-glow-sm ring-1 ring-primary-300/50`}
      title={`Blood group ${group}`}
    >
      {group}
    </div>
  );
}
