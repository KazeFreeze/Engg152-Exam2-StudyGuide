import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { Card } from '../components/Card';
import { Collapsible } from '../components/Collapsible';
import { Math } from '../components/Math';
import { MiniQuiz } from '../components/MiniQuiz';
import { BLOCK_QUIZ } from './quizzes';

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

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-100">
          Transform (equivalence) rules — moving junctions
        </h2>
        <Card tone="info">
          <p>
            When the diagram doesn't match series/parallel/feedback directly,
            you have to <em>relocate</em> junctions until it does. The
            governing principle is always the same:
          </p>
          <p className="mt-2 italic text-slate-200">
            Whatever block the junction crosses, the moved branch must be
            compensated so every signal in the diagram keeps the same algebraic
            value as before.
          </p>
        </Card>

        <TransformRule
          title="Rule 1 — Moving a takeoff (pickoff) point PAST a block"
          before={<TakeoffBeforeBlock />}
          after={<TakeoffAfterBlock />}
          explanation={
            <>
              <p>
                Originally the branch carried <Math tex="X" />. After moving
                the pickoff to the <em>right</em> of <Math tex="G" />, the
                branch would carry <Math tex="XG" /> — too big. Restore it by
                multiplying the branch by <Math tex="1/G" />.
              </p>
              <p className="mt-2">
                Mnemonic:{' '}
                <strong>
                  pickoff crosses a block → branch gets the{' '}
                  <em>inverse</em>.
                </strong>
              </p>
            </>
          }
        />

        <TransformRule
          title="Rule 2 — Moving a takeoff point BEFORE a block"
          before={<TakeoffAfterBlock />}
          after={<TakeoffBeforeBlockWithG />}
          explanation={
            <>
              <p>
                Originally the branch carried <Math tex="XG" />. Moving the
                pickoff to the <em>left</em> of <Math tex="G" /> drops it to{' '}
                <Math tex="X" /> — too small. Restore it by multiplying by{' '}
                <Math tex="G" />.
              </p>
              <p className="mt-2">
                Mnemonic:{' '}
                <strong>
                  pickoff crosses backward → branch gets <em>G itself</em>.
                </strong>
              </p>
            </>
          }
        />

        <TransformRule
          title="Rule 3 — Moving a summing junction PAST a block"
          before={<SummerBeforeBlock />}
          after={<SummerAfterBlock />}
          explanation={
            <>
              <p>
                Originally: <Math tex="(A - B)G = AG - BG" />. After moving the
                summer past <Math tex="G" />, the first input is already{' '}
                <Math tex="AG" />, but the second input <Math tex="B" /> is now
                subtracted un-multiplied → we'd get <Math tex="AG - B" />.
              </p>
              <p className="mt-2">
                Fix: multiply the moved branch by <Math tex="G" /> so the sum
                becomes <Math tex="AG - BG" /> again.
              </p>
            </>
          }
        />

        <TransformRule
          title="Rule 4 — Moving a summing junction BEFORE a block"
          before={<SummerAfterBlock />}
          after={<SummerBeforeBlockInv />}
          explanation={
            <>
              <p>
                Originally: <Math tex="AG - B" />. Moving the summer to the
                left of <Math tex="G" /> would give{' '}
                <Math tex="(A - B)G = AG - BG" /> — the <Math tex="B" /> branch
                got extra <Math tex="G" />. Pre-divide the moved branch by{' '}
                <Math tex="G" /> (i.e. multiply by <Math tex="1/G" />) so the
                output is still <Math tex="AG - B" />.
              </p>
            </>
          }
        />

        <Card tone="warn" title="Shortcut: the 1/G ↔ G pattern">
          <p>
            There are really only two patterns to remember:
          </p>
          <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
            <li>
              Moving a junction so it crosses a block <em>in the direction
              of signal flow</em> → compensate with <Math tex="1/G" />.
            </li>
            <li>
              Moving a junction so it crosses a block <em>against the flow</em>{' '}
              → compensate with <Math tex="G" />.
            </li>
          </ul>
          <p className="mt-2 text-sm text-slate-300">
            This applies whether it's a pickoff or a summing junction — the
            direction of the crossing is what matters.
          </p>
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

      <MiniQuiz
        title="Retention check — Block Diagrams"
        subtitle="4 questions • instant feedback"
        questions={BLOCK_QUIZ}
      />
    </div>
  );
}

/* ---------- Transform-rule helper ---------- */

interface TransformRuleProps {
  readonly title: string;
  readonly before: ReactNode;
  readonly after: ReactNode;
  readonly explanation: ReactNode;
}

function TransformRule({
  title,
  before,
  after,
  explanation,
}: TransformRuleProps): JSXEl {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-4 space-y-3">
      <h3 className="text-[15px] font-semibold text-slate-100">{title}</h3>
      <div className="grid md:grid-cols-[1fr_auto_1fr] items-center gap-3">
        <div className="space-y-1">
          <div className="text-[11px] uppercase font-semibold tracking-wider text-slate-400">
            Before
          </div>
          {before}
        </div>
        <ArrowRight
          size={24}
          className="text-sky-300 mx-auto hidden md:block"
          aria-hidden
        />
        <div className="md:hidden text-center text-slate-400 text-xs">
          ↓ equivalent ↓
        </div>
        <div className="space-y-1">
          <div className="text-[11px] uppercase font-semibold tracking-wider text-slate-400">
            After
          </div>
          {after}
        </div>
      </div>
      <div className="text-sm text-slate-300 leading-relaxed">
        {explanation}
      </div>
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

/* ---------- Transform-rule before/after SVGs ---------- */

const tBox = 'fill-slate-800 stroke-slate-300 [stroke-width:1.5]';
const tBoxHl = 'fill-sky-900 stroke-sky-300 [stroke-width:1.5]';
const tArr = 'stroke-slate-300 [stroke-width:1.5]';
const tLbl = 'fill-slate-100 text-[12px] font-medium';
const tSm = 'fill-slate-400 text-[10px]';
const tMark = 'fill-amber-300 text-[10px] font-bold';

function TransformSvg({
  label,
  children,
}: {
  readonly label: string;
  readonly children: ReactNode;
}): JSXEl {
  return (
    <svg
      viewBox="0 0 340 160"
      className="w-full h-auto bg-slate-950 rounded-md border border-slate-700 p-2"
      role="img"
      aria-label={label}
    >
      <defs>
        <marker
          id={`m-${label.replace(/\s+/g, '-')}`}
          markerWidth="8"
          markerHeight="8"
          refX="7"
          refY="4"
          orient="auto"
        >
          <polygon points="0 0, 8 4, 0 8" fill="#cbd5e1" />
        </marker>
      </defs>
      {children}
    </svg>
  );
}

/* Rule 1 before: pickoff BEFORE the block */
function TakeoffBeforeBlock(): JSXEl {
  return (
    <TransformSvg label="pickoff-before">
      <line
        x1="10"
        y1="60"
        x2="110"
        y2="60"
        className={tArr}
        markerEnd="url(#m-pickoff-before)"
      />
      <text x="15" y="50" className={tSm}>
        X
      </text>
      <circle cx="120" cy="60" r="3" fill="#fbbf24" />
      <rect x="135" y="42" width="70" height="36" rx="4" className={tBox} />
      <text x="170" y="65" textAnchor="middle" className={tLbl}>
        G
      </text>
      <line
        x1="205"
        y1="60"
        x2="320"
        y2="60"
        className={tArr}
        markerEnd="url(#m-pickoff-before)"
      />
      <text x="285" y="50" className={tSm}>
        XG
      </text>
      {/* branch */}
      <line
        x1="120"
        y1="60"
        x2="120"
        y2="130"
        className={tArr}
        markerEnd="url(#m-pickoff-before)"
      />
      <text x="90" y="140" className={tSm}>
        branch: X
      </text>
    </TransformSvg>
  );
}

/* Rule 1 after: pickoff moved PAST the block, needs 1/G */
function TakeoffAfterBlock(): JSXEl {
  return (
    <TransformSvg label="pickoff-after">
      <line
        x1="10"
        y1="60"
        x2="60"
        y2="60"
        className={tArr}
        markerEnd="url(#m-pickoff-after)"
      />
      <text x="15" y="50" className={tSm}>
        X
      </text>
      <rect x="60" y="42" width="70" height="36" rx="4" className={tBox} />
      <text x="95" y="65" textAnchor="middle" className={tLbl}>
        G
      </text>
      <line
        x1="130"
        y1="60"
        x2="220"
        y2="60"
        className={tArr}
        markerEnd="url(#m-pickoff-after)"
      />
      <circle cx="220" cy="60" r="3" fill="#fbbf24" />
      <line
        x1="220"
        y1="60"
        x2="320"
        y2="60"
        className={tArr}
        markerEnd="url(#m-pickoff-after)"
      />
      <text x="285" y="50" className={tSm}>
        XG
      </text>
      {/* branch with compensating 1/G */}
      <line x1="220" y1="60" x2="220" y2="95" className={tArr} />
      <rect x="195" y="95" width="50" height="30" rx="4" className={tBoxHl} />
      <text x="220" y="115" textAnchor="middle" className={tMark}>
        1/G
      </text>
      <line
        x1="220"
        y1="125"
        x2="220"
        y2="148"
        className={tArr}
        markerEnd="url(#m-pickoff-after)"
      />
      <text x="240" y="145" className={tSm}>
        = X
      </text>
    </TransformSvg>
  );
}

/* Rule 2 after: pickoff moved BEFORE the block, branch compensated with G */
function TakeoffBeforeBlockWithG(): JSXEl {
  return (
    <TransformSvg label="pickoff-before-g">
      <line
        x1="10"
        y1="60"
        x2="110"
        y2="60"
        className={tArr}
        markerEnd="url(#m-pickoff-before-g)"
      />
      <text x="15" y="50" className={tSm}>
        X
      </text>
      <circle cx="120" cy="60" r="3" fill="#fbbf24" />
      <rect x="135" y="42" width="70" height="36" rx="4" className={tBox} />
      <text x="170" y="65" textAnchor="middle" className={tLbl}>
        G
      </text>
      <line
        x1="205"
        y1="60"
        x2="320"
        y2="60"
        className={tArr}
        markerEnd="url(#m-pickoff-before-g)"
      />
      <text x="285" y="50" className={tSm}>
        XG
      </text>
      {/* branch with compensating G */}
      <line x1="120" y1="60" x2="120" y2="95" className={tArr} />
      <rect x="95" y="95" width="50" height="30" rx="4" className={tBoxHl} />
      <text x="120" y="115" textAnchor="middle" className={tMark}>
        G
      </text>
      <line
        x1="120"
        y1="125"
        x2="120"
        y2="148"
        className={tArr}
        markerEnd="url(#m-pickoff-before-g)"
      />
      <text x="140" y="145" className={tSm}>
        = XG
      </text>
    </TransformSvg>
  );
}

/* Rule 3 before: summer BEFORE block */
function SummerBeforeBlock(): JSXEl {
  return (
    <TransformSvg label="summer-before">
      <line
        x1="10"
        y1="60"
        x2="70"
        y2="60"
        className={tArr}
        markerEnd="url(#m-summer-before)"
      />
      <text x="15" y="50" className={tSm}>
        A
      </text>
      <circle cx="82" cy="60" r="12" className={tBox} />
      <text x="82" y="64" textAnchor="middle" className={tLbl}>
        ±
      </text>
      <text x="60" y="45" className={tSm}>
        +
      </text>
      <text x="90" y="95" className={tSm}>
        −
      </text>
      <line
        x1="94"
        y1="60"
        x2="150"
        y2="60"
        className={tArr}
        markerEnd="url(#m-summer-before)"
      />
      <rect x="150" y="42" width="70" height="36" rx="4" className={tBox} />
      <text x="185" y="65" textAnchor="middle" className={tLbl}>
        G
      </text>
      <line
        x1="220"
        y1="60"
        x2="320"
        y2="60"
        className={tArr}
        markerEnd="url(#m-summer-before)"
      />
      <text x="260" y="50" className={tSm}>
        (A−B)G
      </text>
      {/* B input from below */}
      <line
        x1="82"
        y1="130"
        x2="82"
        y2="72"
        className={tArr}
        markerEnd="url(#m-summer-before)"
      />
      <text x="60" y="145" className={tSm}>
        B
      </text>
    </TransformSvg>
  );
}

/* Rule 3 after: summer moved PAST the block, B branch multiplied by G */
function SummerAfterBlock(): JSXEl {
  return (
    <TransformSvg label="summer-after">
      <line
        x1="10"
        y1="60"
        x2="50"
        y2="60"
        className={tArr}
        markerEnd="url(#m-summer-after)"
      />
      <text x="15" y="50" className={tSm}>
        A
      </text>
      <rect x="50" y="42" width="70" height="36" rx="4" className={tBox} />
      <text x="85" y="65" textAnchor="middle" className={tLbl}>
        G
      </text>
      <line
        x1="120"
        y1="60"
        x2="180"
        y2="60"
        className={tArr}
        markerEnd="url(#m-summer-after)"
      />
      <circle cx="192" cy="60" r="12" className={tBox} />
      <text x="192" y="64" textAnchor="middle" className={tLbl}>
        ±
      </text>
      <text x="170" y="45" className={tSm}>
        +
      </text>
      <text x="200" y="95" className={tSm}>
        −
      </text>
      <line
        x1="204"
        y1="60"
        x2="320"
        y2="60"
        className={tArr}
        markerEnd="url(#m-summer-after)"
      />
      <text x="260" y="50" className={tSm}>
        AG − BG
      </text>
      {/* B branch with G compensation */}
      <text x="170" y="148" className={tSm}>
        B
      </text>
      <line x1="192" y1="145" x2="192" y2="125" className={tArr} />
      <rect x="167" y="95" width="50" height="30" rx="4" className={tBoxHl} />
      <text x="192" y="115" textAnchor="middle" className={tMark}>
        G
      </text>
      <line
        x1="192"
        y1="95"
        x2="192"
        y2="72"
        className={tArr}
        markerEnd="url(#m-summer-after)"
      />
    </TransformSvg>
  );
}

/* Rule 4 after: summer moved BEFORE block, B branch gets 1/G */
function SummerBeforeBlockInv(): JSXEl {
  return (
    <TransformSvg label="summer-before-inv">
      <line
        x1="10"
        y1="60"
        x2="70"
        y2="60"
        className={tArr}
        markerEnd="url(#m-summer-before-inv)"
      />
      <text x="15" y="50" className={tSm}>
        A
      </text>
      <circle cx="82" cy="60" r="12" className={tBox} />
      <text x="82" y="64" textAnchor="middle" className={tLbl}>
        ±
      </text>
      <text x="60" y="45" className={tSm}>
        +
      </text>
      <text x="90" y="95" className={tSm}>
        −
      </text>
      <line
        x1="94"
        y1="60"
        x2="150"
        y2="60"
        className={tArr}
        markerEnd="url(#m-summer-before-inv)"
      />
      <rect x="150" y="42" width="70" height="36" rx="4" className={tBox} />
      <text x="185" y="65" textAnchor="middle" className={tLbl}>
        G
      </text>
      <line
        x1="220"
        y1="60"
        x2="320"
        y2="60"
        className={tArr}
        markerEnd="url(#m-summer-before-inv)"
      />
      <text x="270" y="50" className={tSm}>
        AG − B
      </text>
      {/* B branch with 1/G compensation */}
      <text x="60" y="148" className={tSm}>
        B
      </text>
      <line x1="82" y1="145" x2="82" y2="125" className={tArr} />
      <rect x="57" y="95" width="50" height="30" rx="4" className={tBoxHl} />
      <text x="82" y="115" textAnchor="middle" className={tMark}>
        1/G
      </text>
      <line
        x1="82"
        y1="95"
        x2="82"
        y2="72"
        className={tArr}
        markerEnd="url(#m-summer-before-inv)"
      />
    </TransformSvg>
  );
}
