import { Card } from '../components/Card';
import { Collapsible } from '../components/Collapsible';
import { Math } from '../components/Math';
import { MiniQuiz } from '../components/MiniQuiz';
import { STABILITY_QUIZ } from './quizzes';

export function Stability(): JSXEl {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-slate-50">⚖️ Stability</h1>
        <p className="mt-2 text-slate-300">
          “Stable” means bounded input → bounded output (BIBO). For an LTI
          system this is 100% decided by the <em>locations of the closed-loop
          poles</em>.
        </p>
      </header>

      <Card title="The one-line rule" tone="info">
        <ul className="space-y-1">
          <li>
            <strong>All poles in the open left-half plane (LHP)</strong> →{' '}
            <span className="text-emerald-300">stable</span>.
          </li>
          <li>
            <strong>Any pole in the right-half plane (RHP)</strong> →{' '}
            <span className="text-rose-300">unstable</span>.
          </li>
          <li>
            <strong>Poles exactly on the <Math tex="j\omega" /> axis, none
              repeated</strong> →{' '}
            <span className="text-amber-300">marginally stable</span>{' '}
            (oscillates forever).
          </li>
          <li>
            <strong>Repeated poles on the <Math tex="j\omega" /> axis</strong> →
            unstable (grows like <Math tex="t \sin(\omega t)" />).
          </li>
        </ul>
      </Card>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-100">
          The s-plane at a glance
        </h2>
        <SPlaneSVG />
        <p className="text-sm text-slate-400">
          Each pole contributes a term of the form{' '}
          <Math tex="e^{\sigma t}\cos(\omega t + \phi)" />. Negative{' '}
          <Math tex="\sigma" /> (LHP) decays. Positive <Math tex="\sigma" />{' '}
          (RHP) blows up. Zero <Math tex="\sigma" /> oscillates.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-100">
          Necessary condition (quick disqualifier)
        </h2>
        <Card>
          <p>
            For the characteristic polynomial{' '}
            <Math tex="a_n s^n + a_{n-1} s^{n-1} + \dots + a_0" />, a{' '}
            <em>necessary</em> (but not sufficient) condition for stability is:
          </p>
          <ol className="list-decimal pl-5 mt-2 space-y-1">
            <li>All coefficients are present (no missing powers).</li>
            <li>All coefficients have the same sign (usually all positive).</li>
          </ol>
          <p className="mt-2 text-sm text-slate-400">
            If either fails → the system is unstable or marginally stable. You
            can stop there. If both pass → you still have to do the Routh test
            to <em>prove</em> stability.
          </p>
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-100">Closed-loop vs open-loop</h2>
        <Card tone="warn">
          <p>
            Stability is always about the <strong>closed-loop</strong> system{' '}
            <Math tex="T(s)" />. So:
          </p>
          <ol className="list-decimal pl-5 mt-2 space-y-1">
            <li>
              Reduce the block diagram to{' '}
              <Math tex="T(s) = N(s)/D(s)" />.
            </li>
            <li>
              The characteristic equation is <Math tex="D(s) = 0" /> — for
              unity feedback this is <Math tex="1 + G(s) = 0" />.
            </li>
            <li>Check the roots of <Math tex="D(s)" /> (Routh does this for you).</li>
          </ol>
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-100">Worked example (lab 2)</h2>
        <Collapsible label="Range of K for stability — G(s) from lab stability" defaultOpen>
          <p>Start from:</p>
          <Math
            display
            tex="G(s) = \dfrac{K(s^2 - 10s + 50)}{s^4 + 22s^3 + 144s^2 + 288s}"
          />
          <p>Unity-feedback closed-loop characteristic polynomial:</p>
          <Math
            display
            tex="D(s) = s^4 + 22s^3 + (144+K)s^2 + (288-10K)s + 50K"
          />
          <p>
            Apply Routh-Hurwitz to <Math tex="D(s)" /> (see the Routh tab for
            the full mechanics). Demand all first-column entries are positive.
            Solving the resulting inequalities gives the stable range of{' '}
            <Math tex="K" />.
          </p>
          <p className="text-sm text-slate-400 mt-2">
            The lab's <Math tex="K_{marginal}" /> is the value of{' '}
            <Math tex="K" /> that makes one of those first-column entries
            exactly zero — at that instant the system has a pair of poles
            sitting on the <Math tex="j\omega" /> axis and it oscillates
            forever.
          </p>
        </Collapsible>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-100">
          Checklist — “is this system stable?”
        </h2>
        <Card tone="success">
          <ol className="list-decimal pl-5 space-y-1">
            <li>Reduce diagram → <Math tex="T(s)" />.</li>
            <li>
              Write down <Math tex="D(s)" /> (the denominator of{' '}
              <Math tex="T" />).
            </li>
            <li>
              Necessary condition: no missing terms, all signs match?
              <br />
              <span className="text-slate-400 text-sm">
                Fails? → unstable. Done.
              </span>
            </li>
            <li>
              Build the Routh array. Look at first column.
            </li>
            <li>
              No sign changes + no zeros → <strong>stable</strong>. Sign
              changes → count them = # of RHP poles.
            </li>
            <li>
              Entire row of zeros → possibly marginally stable; use auxiliary
              polynomial (Routh tab).
            </li>
          </ol>
        </Card>
      </section>

      <MiniQuiz
        title="Retention check — Stability"
        subtitle="5 questions • instant feedback"
        questions={STABILITY_QUIZ}
      />
    </div>
  );
}

function SPlaneSVG(): JSXEl {
  const axisStroke = 'stroke-slate-400 [stroke-width:1.25]';
  const guide = 'stroke-slate-700 [stroke-width:1]';
  return (
    <svg
      viewBox="0 0 440 280"
      className="w-full h-auto bg-slate-900/60 rounded-lg border border-slate-700 p-2"
      role="img"
      aria-label="s-plane diagram showing LHP stable, RHP unstable, jω axis marginal"
    >
      {/* LHP / RHP shading */}
      <rect x="20" y="20" width="200" height="240" fill="#064e3b" opacity="0.25" />
      <rect x="220" y="20" width="200" height="240" fill="#7f1d1d" opacity="0.25" />
      {/* guides */}
      <line x1="20" y1="140" x2="420" y2="140" className={guide} />
      <line x1="220" y1="20" x2="220" y2="260" className={guide} />
      {/* axes */}
      <line x1="20" y1="140" x2="420" y2="140" className={axisStroke} markerEnd="url(#arr-s)" />
      <line x1="220" y1="260" x2="220" y2="20" className={axisStroke} markerEnd="url(#arr-s)" />
      <defs>
        <marker id="arr-s" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
          <polygon points="0 0, 10 5, 0 10" fill="#cbd5e1" />
        </marker>
      </defs>
      {/* labels */}
      <text x="405" y="134" className="fill-slate-300 text-[12px]">σ</text>
      <text x="226" y="28" className="fill-slate-300 text-[12px]">jω</text>
      <text x="70" y="45" className="fill-emerald-300 text-[12px] font-semibold">
        LHP — stable
      </text>
      <text x="260" y="45" className="fill-rose-300 text-[12px] font-semibold">
        RHP — unstable
      </text>
      {/* sample poles */}
      <g>
        <circle cx="120" cy="100" r="5" fill="#34d399" />
        <circle cx="120" cy="180" r="5" fill="#34d399" />
        <text x="130" y="104" className="fill-slate-100 text-[11px]">stable pair</text>
      </g>
      <g>
        <circle cx="300" cy="140" r="5" fill="#fb7185" />
        <text x="310" y="144" className="fill-slate-100 text-[11px]">RHP pole</text>
      </g>
      <g>
        <circle cx="220" cy="80" r="5" fill="#fbbf24" />
        <circle cx="220" cy="200" r="5" fill="#fbbf24" />
        <text x="180" y="76" className="fill-slate-100 text-[11px]">on jω</text>
        <text x="180" y="220" className="fill-slate-100 text-[11px]">marginal</text>
      </g>
    </svg>
  );
}
