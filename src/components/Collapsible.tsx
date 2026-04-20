import { useState } from 'react';
import type { ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

interface CollapsibleProps {
  readonly label: string;
  readonly children: ReactNode;
  readonly defaultOpen?: boolean;
}

export function Collapsible({
  label,
  children,
  defaultOpen = false,
}: CollapsibleProps): JSXEl {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-slate-700 rounded-lg overflow-hidden bg-slate-900/40">
      <button
        type="button"
        onClick={() => {
          setOpen((v) => !v);
        }}
        className="w-full flex items-center justify-between px-4 py-3 text-left text-slate-100 hover:bg-slate-800/60 transition-colors"
      >
        <span className="font-medium">{label}</span>
        <ChevronDown
          size={18}
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="px-4 py-4 border-t border-slate-700 text-slate-200">
          {children}
        </div>
      )}
    </div>
  );
}
