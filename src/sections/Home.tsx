import type { SectionId } from '../types';
import { NAV } from '../nav';
import { Card } from '../components/Card';

interface HomeProps {
  readonly onNavigate: (id: SectionId) => void;
}

export function Home({ onNavigate }: HomeProps): JSXEl {
  const topics = NAV.filter((n) => n.id !== 'home');
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-50 tracking-tight">
          ENGG 152 — Exam 2 crash course
        </h1>
        <p className="mt-3 text-slate-300 max-w-2xl">
          Everything you need for tomorrow: block diagram reduction, stability
          criteria, the Routh array (with the tricky special cases), and
          steady-state error — including the exact lab problem you already did.
          Visual first. Mobile friendly. Each page has a summary, worked
          examples, and practice problems.
        </p>
      </section>

      <section className="grid gap-3 sm:grid-cols-2">
        {topics.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => {
              onNavigate(t.id);
            }}
            className="text-left rounded-xl border border-slate-700 bg-slate-900/60 hover:bg-slate-800/60 hover:border-sky-500 transition-colors p-4 md:p-5"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{t.emoji}</span>
              <div>
                <div className="font-semibold text-slate-100">{t.label}</div>
                <div className="text-xs text-slate-400">{subtitle(t.id)}</div>
              </div>
            </div>
          </button>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Card title="How to use this guide" tone="info">
          <ol className="list-decimal pl-5 space-y-1">
            <li>Skim each topic's “TL;DR”.</li>
            <li>Do the worked example without peeking.</li>
            <li>Hit the Practice tab and self-test.</li>
            <li>Re-read only the parts you got wrong.</li>
          </ol>
        </Card>
        <Card title="What the exam tests (from your notes)" tone="success">
          <ul className="list-disc pl-5 space-y-1">
            <li>Block diagram reduction → single transfer function.</li>
            <li>Stability: where are the closed-loop poles?</li>
            <li>Routh-Hurwitz + special cases (ε, row of zeros, gain K).</li>
            <li>Steady-state error: step/ramp/parabola, system type.</li>
            <li>Error with a <em>disturbance</em> (Nise §7.5, lab 3).</li>
          </ul>
        </Card>
      </section>

      <section>
        <Card tone="warn" title="Night-before strategy">
          <p>
            Don't grind new derivations. Re-do the ones you've seen: the Routh
            <em> K-gain </em> problem and the <em>lab 3 disturbance</em>{' '}
            problem. They are the exam's two hardest question shapes and
            they're already solved for you in this guide.
          </p>
        </Card>
      </section>
    </div>
  );
}

function subtitle(id: SectionId): string {
  switch (id) {
    case 'block-diagrams':
      return 'Series, parallel, feedback — reduce to one block.';
    case 'stability':
      return 'Pole locations, BIBO, marginal vs unstable.';
    case 'routh':
      return 'Build the array, handle ε and row-of-zeros, solve for K.';
    case 'errors':
      return 'Static constants, system type, disturbances.';
    case 'practice':
      return 'Exam-style problems with step-by-step solutions.';
    case 'home':
      return '';
  }
}
