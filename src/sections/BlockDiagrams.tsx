import { Card } from '../components/Card';
import { Collapsible } from '../components/Collapsible';
import { Math } from '../components/Math';

export function BlockDiagrams(): JSXEl {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-slate-50">🧩 Block Diagrams</h1>
        <p className="mt-2 text-slate-300">
          A block diagram is just a picture of an equation. Your job is to
          collapse it down to <em>one</em> transfer function from input to
          output. Three rules do 95% of the work.
        </p>
      </header>

      <Card title="TL;DR — the three rules" tone="info">
        <ul className="space-y-2">
          <li>
            <strong>Series:</strong> cascade multiplies.{' '}
            <Math tex="G_1 G_2" />
          </li>
          <li>
            <strong>Parallel:</strong> branches add.{' '}
            <Math tex="G_1 + G_2" />
          </li>
          <li>
            <strong>Feedback:</strong>{' '}
            <Math tex="T(s) = \dfrac{G(s)}{1 \pm G(s)H(s)}" /> &nbsp; (use{' '}
            <Math tex="+" /> for <em>negative</em> feedback,{' '}
            <Math tex="-" /> for positive).
          </li>
        </ul>
      </Card>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-100">1. Series (cascade)</h2>
        <div className="grid md:grid-cols-2 gap-4 items-center">
          <SeriesSVG />
          <Card>
            <p>Two blocks one after another. The combined transfer function is:</p>
            <Math display tex="\dfrac{C(s)}{R(s)} = G_1(s) \cdot G_2(s)" />
            <p className="text-sm text-slate-400 mt-2">
              Valid when the second block doesn't load the first (an idealised
              assumption you can make on paper).
            </p>
          </Card>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-100">2. Parallel (summing)</h2>
        <div className="grid md:grid-cols-2 gap-4 items-center">
          <ParallelSVG />
          <Card>
            <p>Same input splits into two branches, outputs are summed:</p>
            <Math display tex="\dfrac{C(s)}{R(s)} = G_1(s) + G_2(s)" />
            <p className="text-sm text-slate-400 mt-2">
              If the summer has a minus sign on one branch, subtract instead of add.
            </p>
          </Card>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-100">
          3. Feedback (the money rule)
        </h2>
        <div className="grid md:grid-cols-2 gap-4 items-center">
          <FeedbackSVG />
          <Card tone="success">
            <p>
              Forward path <Math tex="G(s)" />, feedback path <Math tex="H(s)" />,
              summer at the input.
            </p>
            <Math display tex="T(s) = \dfrac{G(s)}{1 + G(s)H(s)}" />
            <p className="text-sm text-slate-400 mt-2">
              Negative feedback (the common case) → <Math tex="+" /> in the
              denominator. Positive feedback → <Math tex="-" />.
              <br />
              <strong>Unity feedback</strong> means <Math tex="H(s) = 1" />, so{' '}
              <Math tex="T = G/(1+G)" />.
            </p>
          </Card>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-100">
          Moving summers &amp; takeoff points
        </h2>
        <Card>
          <p>
            When the diagram is messier than the three patterns above, you have
            to <em>move</em> junctions until it fits one of them. The rule:
            whatever you move a block over, you have to compensate so the
            signal relationship stays the same.
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
            <li>
              Moving a takeoff point <em>past</em> a block <Math tex="G" /> →
              multiply the takeoff by <Math tex="1/G" /> to preserve the
              signal.
            </li>
            <li>
              Moving a takeoff point <em>before</em> a block <Math tex="G" /> →
              multiply the takeoff by <Math tex="G" />.
            </li>
            <li>
              Moving a summer past a block → same idea, compensate the branch
              you moved.
            </li>
          </ul>
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-100">
          Lab 3 diagram (same shape as the exam's error problem)
        </h2>
        <Card>
          <p className="mb-3">
            Reference <Math tex="R(s)" /> enters a unity-feedback loop with
            controller <Math tex="G_1(s)" /> and plant <Math tex="G_2(s)" />. A
            disturbance <Math tex="D(s)" /> is injected <em>between</em> the
            controller and the plant (this is important — it changes the error
            formula).
          </p>
          <LabDiagramSVG />
          <div className="mt-3 text-sm text-slate-300 space-y-1">
            <p>
              The output equation is{' '}
              <Math tex="C(s) = E(s)G_1 G_2 + D(s) G_2" />.
            </p>
            <p>
              The error splits into two pieces (superposition):{' '}
              <Math tex="e(\infty) = e_R(\infty) - e_D(\infty)" />.
            </p>
          </div>
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-100">Worked reduction</h2>
        <Collapsible label="Example: reduce to T(s) given G(s) and unity feedback" defaultOpen>
          <p>
            From lab stability:{' '}
            <Math
              display
              tex="G(s) = \dfrac{K(s^2 - 10s + 50)}{s^4 + 22s^3 + 144s^2 + 288s}"
            />
          </p>
          <p>With unity feedback:</p>
          <Math
            display
            tex="T(s) = \dfrac{G(s)}{1 + G(s)} = \dfrac{K(s^2-10s+50)}{s^4 + 22s^3 + (144+K)s^2 + (288-10K)s + 50K}"
          />
          <p className="text-sm text-slate-400 mt-2">
            The characteristic polynomial (denominator of <Math tex="T" />) is
            exactly what you feed into the Routh array.
          </p>
        </Collapsible>
      </section>
    </div>
  );
}

/* ---------- SVG diagrams ---------- */

const box =
  'fill-slate-800 stroke-slate-300 [stroke-width:1.5]';
const arrow = 'stroke-slate-300 [stroke-width:1.5]';
const label = 'fill-slate-100 text-[13px] font-medium';
const small = 'fill-slate-400 text-[11px]';

function SeriesSVG(): JSXEl {
  return (
    <svg
      viewBox="0 0 420 120"
      className="w-full h-auto bg-slate-900/60 rounded-lg border border-slate-700 p-2"
      role="img"
      aria-label="Series cascade: G1 followed by G2"
    >
      <defs>
        <marker id="arrhead-s" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <polygon points="0 0, 8 4, 0 8" fill="#cbd5e1" />
        </marker>
      </defs>
      <line x1="10" y1="60" x2="80" y2="60" className={arrow} markerEnd="url(#arrhead-s)" />
      <text x="20" y="50" className={small}>R(s)</text>
      <rect x="80" y="40" width="80" height="40" rx="4" className={box} />
      <text x="120" y="65" textAnchor="middle" className={label}>G₁(s)</text>
      <line x1="160" y1="60" x2="240" y2="60" className={arrow} markerEnd="url(#arrhead-s)" />
      <rect x="240" y="40" width="80" height="40" rx="4" className={box} />
      <text x="280" y="65" textAnchor="middle" className={label}>G₂(s)</text>
      <line x1="320" y1="60" x2="410" y2="60" className={arrow} markerEnd="url(#arrhead-s)" />
      <text x="360" y="50" className={small}>C(s)</text>
    </svg>
  );
}

function ParallelSVG(): JSXEl {
  return (
    <svg
      viewBox="0 0 420 180"
      className="w-full h-auto bg-slate-900/60 rounded-lg border border-slate-700 p-2"
      role="img"
      aria-label="Parallel: G1 and G2 summed"
    >
      <defs>
        <marker id="arrhead-p" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <polygon points="0 0, 8 4, 0 8" fill="#cbd5e1" />
        </marker>
      </defs>
      <line x1="10" y1="90" x2="90" y2="90" className={arrow} markerEnd="url(#arrhead-p)" />
      <text x="20" y="80" className={small}>R(s)</text>
      <circle cx="100" cy="90" r="2" fill="#cbd5e1" />
      <line x1="100" y1="90" x2="100" y2="40" className={arrow} />
      <line x1="100" y1="40" x2="160" y2="40" className={arrow} markerEnd="url(#arrhead-p)" />
      <line x1="100" y1="90" x2="100" y2="140" className={arrow} />
      <line x1="100" y1="140" x2="160" y2="140" className={arrow} markerEnd="url(#arrhead-p)" />
      <rect x="160" y="20" width="80" height="40" rx="4" className={box} />
      <text x="200" y="45" textAnchor="middle" className={label}>G₁(s)</text>
      <rect x="160" y="120" width="80" height="40" rx="4" className={box} />
      <text x="200" y="145" textAnchor="middle" className={label}>G₂(s)</text>
      <line x1="240" y1="40" x2="320" y2="40" className={arrow} />
      <line x1="240" y1="140" x2="320" y2="140" className={arrow} />
      <line x1="320" y1="40" x2="320" y2="82" className={arrow} />
      <line x1="320" y1="140" x2="320" y2="98" className={arrow} />
      <circle cx="320" cy="90" r="10" className={box} />
      <text x="320" y="94" textAnchor="middle" className={label}>+</text>
      <text x="305" y="60" className={small}>+</text>
      <text x="305" y="125" className={small}>+</text>
      <line x1="330" y1="90" x2="410" y2="90" className={arrow} markerEnd="url(#arrhead-p)" />
      <text x="370" y="80" className={small}>C(s)</text>
    </svg>
  );
}

function FeedbackSVG(): JSXEl {
  return (
    <svg
      viewBox="0 0 480 180"
      className="w-full h-auto bg-slate-900/60 rounded-lg border border-slate-700 p-2"
      role="img"
      aria-label="Negative feedback loop with G and H"
    >
      <defs>
        <marker id="arrhead-f" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <polygon points="0 0, 8 4, 0 8" fill="#cbd5e1" />
        </marker>
      </defs>
      <line x1="10" y1="60" x2="70" y2="60" className={arrow} markerEnd="url(#arrhead-f)" />
      <text x="20" y="50" className={small}>R(s)</text>
      <circle cx="82" cy="60" r="12" className={box} />
      <text x="82" y="64" textAnchor="middle" className={label}>±</text>
      <text x="60" y="45" className={small}>+</text>
      <text x="75" y="90" className={small}>−</text>
      <line x1="94" y1="60" x2="160" y2="60" className={arrow} markerEnd="url(#arrhead-f)" />
      <text x="120" y="50" className={small}>E(s)</text>
      <rect x="160" y="40" width="90" height="40" rx="4" className={box} />
      <text x="205" y="65" textAnchor="middle" className={label}>G(s)</text>
      <line x1="250" y1="60" x2="380" y2="60" className={arrow} markerEnd="url(#arrhead-f)" />
      <text x="340" y="50" className={small}>C(s)</text>
      <circle cx="350" cy="60" r="2" fill="#cbd5e1" />
      <line x1="380" y1="60" x2="470" y2="60" className={arrow} markerEnd="url(#arrhead-f)" />
      <line x1="350" y1="60" x2="350" y2="140" className={arrow} />
      <line x1="350" y1="140" x2="250" y2="140" className={arrow} markerEnd="url(#arrhead-f)" />
      <rect x="160" y="120" width="90" height="40" rx="4" className={box} />
      <text x="205" y="145" textAnchor="middle" className={label}>H(s)</text>
      <line x1="160" y1="140" x2="82" y2="140" className={arrow} />
      <line x1="82" y1="140" x2="82" y2="72" className={arrow} markerEnd="url(#arrhead-f)" />
    </svg>
  );
}

function LabDiagramSVG(): JSXEl {
  return (
    <svg
      viewBox="0 0 560 220"
      className="w-full h-auto bg-slate-900/60 rounded-lg border border-slate-700 p-2"
      role="img"
      aria-label="Unity feedback with G1 controller, D disturbance injected, G2 plant"
    >
      <defs>
        <marker id="arrhead-l" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <polygon points="0 0, 8 4, 0 8" fill="#cbd5e1" />
        </marker>
      </defs>
      <line x1="10" y1="90" x2="70" y2="90" className={arrow} markerEnd="url(#arrhead-l)" />
      <text x="20" y="80" className={small}>R(s)</text>
      <circle cx="82" cy="90" r="12" className={box} />
      <text x="82" y="94" textAnchor="middle" className={label}>±</text>
      <text x="60" y="76" className={small}>+</text>
      <text x="75" y="118" className={small}>−</text>
      <line x1="94" y1="90" x2="150" y2="90" className={arrow} markerEnd="url(#arrhead-l)" />
      <text x="110" y="80" className={small}>E(s)</text>
      <rect x="150" y="70" width="90" height="40" rx="4" className={box} />
      <text x="195" y="95" textAnchor="middle" className={label}>G₁(s)</text>
      <line x1="240" y1="90" x2="290" y2="90" className={arrow} markerEnd="url(#arrhead-l)" />

      {/* disturbance injection */}
      <text x="297" y="20" className={small}>D(s)</text>
      <line x1="302" y1="25" x2="302" y2="78" className={arrow} markerEnd="url(#arrhead-l)" />
      <circle cx="302" cy="90" r="12" className={box} />
      <text x="302" y="94" textAnchor="middle" className={label}>+</text>

      <line x1="314" y1="90" x2="370" y2="90" className={arrow} markerEnd="url(#arrhead-l)" />
      <rect x="370" y="70" width="90" height="40" rx="4" className={box} />
      <text x="415" y="95" textAnchor="middle" className={label}>G₂(s)</text>
      <line x1="460" y1="90" x2="550" y2="90" className={arrow} markerEnd="url(#arrhead-l)" />
      <text x="510" y="80" className={small}>C(s)</text>

      {/* unity feedback */}
      <circle cx="500" cy="90" r="2" fill="#cbd5e1" />
      <line x1="500" y1="90" x2="500" y2="170" className={arrow} />
      <line x1="500" y1="170" x2="82" y2="170" className={arrow} />
      <line x1="82" y1="170" x2="82" y2="102" className={arrow} markerEnd="url(#arrhead-l)" />
    </svg>
  );
}
