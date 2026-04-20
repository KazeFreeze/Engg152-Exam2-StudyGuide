import { useEffect, useState } from 'react';
import type { SectionId } from './types';
import { NAV } from './nav';
import { Home } from './sections/Home';
import { BlockDiagrams } from './sections/BlockDiagrams';
import { Stability } from './sections/Stability';
import { RouthArray } from './sections/RouthArray';
import { Errors } from './sections/Errors';
import { Practice } from './sections/Practice';

function readHashSection(): SectionId {
  const raw = window.location.hash.replace(/^#/, '');
  const match = NAV.find((n) => n.id === raw);
  return match ? match.id : 'home';
}

export function App(): JSXEl {
  const [section, setSection] = useState<SectionId>(() => readHashSection());

  useEffect(() => {
    const onHash = (): void => {
      setSection(readHashSection());
    };
    window.addEventListener('hashchange', onHash);
    return () => {
      window.removeEventListener('hashchange', onHash);
    };
  }, []);

  useEffect(() => {
    if (window.location.hash.replace(/^#/, '') !== section) {
      window.history.replaceState(null, '', `#${section}`);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [section]);

  return (
    <div className="min-h-full flex flex-col">
      <Header section={section} onNavigate={setSection} />
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 md:px-6 py-6 md:py-10">
        {section === 'home' && <Home onNavigate={setSection} />}
        {section === 'block-diagrams' && <BlockDiagrams />}
        {section === 'stability' && <Stability />}
        {section === 'routh' && <RouthArray />}
        {section === 'errors' && <Errors />}
        {section === 'practice' && <Practice />}
      </main>
      <BottomNav section={section} onNavigate={setSection} />
      <footer className="pb-20 md:pb-6 pt-6 text-center text-xs text-slate-500">
        ENGG 152 — Exam 2 crash course. Built for mobile study.
      </footer>
    </div>
  );
}

interface NavProps {
  readonly section: SectionId;
  readonly onNavigate: (id: SectionId) => void;
}

function Header({ section, onNavigate }: NavProps): JSXEl {
  return (
    <header className="sticky top-0 z-20 bg-slate-950/90 backdrop-blur border-b border-slate-800">
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => {
            onNavigate('home');
          }}
          className="flex items-center gap-2 text-left"
        >
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-sky-500/20 text-sky-300 font-bold text-sm">
            E2
          </span>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-slate-100">ENGG 152</div>
            <div className="text-[11px] text-slate-400">Exam 2 Crash Course</div>
          </div>
        </button>
        <nav className="hidden md:flex items-center gap-1 text-sm">
          {NAV.filter((n) => n.id !== 'home').map((n) => (
            <button
              key={n.id}
              type="button"
              onClick={() => {
                onNavigate(n.id);
              }}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                section === n.id
                  ? 'bg-sky-500/20 text-sky-200'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              {n.short}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

function BottomNav({ section, onNavigate }: NavProps): JSXEl {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-20 bg-slate-950/95 backdrop-blur border-t border-slate-800">
      <div className="grid grid-cols-6 text-[10px]">
        {NAV.map((n) => (
          <button
            key={n.id}
            type="button"
            onClick={() => {
              onNavigate(n.id);
            }}
            className={`flex flex-col items-center justify-center py-2 gap-0.5 ${
              section === n.id ? 'text-sky-300' : 'text-slate-400'
            }`}
          >
            <span className="text-base leading-none">{n.emoji}</span>
            <span className="leading-none">{n.short}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
