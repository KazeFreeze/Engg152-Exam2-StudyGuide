import type { ReactNode } from 'react';

interface CardProps {
  readonly children: ReactNode;
  readonly title?: string;
  readonly tone?: 'default' | 'info' | 'warn' | 'success' | 'danger';
  readonly className?: string;
}

const TONES: Record<NonNullable<CardProps['tone']>, string> = {
  default: 'bg-slate-900/60 border-slate-700',
  info: 'bg-sky-950/60 border-sky-700',
  warn: 'bg-amber-950/60 border-amber-700',
  success: 'bg-emerald-950/60 border-emerald-700',
  danger: 'bg-rose-950/60 border-rose-700',
};

export function Card({ children, title, tone = 'default', className = '' }: CardProps): JSXEl {
  return (
    <div className={`border rounded-xl p-4 md:p-5 ${TONES[tone]} ${className}`}>
      {title !== undefined && (
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-2">
          {title}
        </h3>
      )}
      <div className="text-slate-100 text-[15px] leading-relaxed">{children}</div>
    </div>
  );
}
