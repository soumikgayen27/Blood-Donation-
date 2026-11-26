import type { ReactNode } from 'react';

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'center' | 'left';
}) {
  return (
    <div
      className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : 'text-left'}`}
    >
      {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
      <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-navy-600 sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
