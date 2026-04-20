import { useState } from 'react';
import type { ReactNode } from 'react';
import { Check, Eye, EyeOff } from 'lucide-react';
import { Card } from '../components/Card';
import { Math } from '../components/Math';
import { MiniQuiz } from '../components/MiniQuiz';
import { FINAL_QUIZ } from './quizzes';

interface Problem {
  readonly id: string;
  readonly topic: 'Block' | 'Stability' | 'Routh' | 'Error';
  readonly prompt: ReactNode;
  readonly solution: ReactNode;
  readonly hint?: ReactNode;
}

export function Practice(): JSXEl {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-slate-50">📝 Practice</h1>
        <p className="mt-2 text-slate-300">
          Try each one without peeking. Tap “show solution” only after you've
          attempted it (or are stuck for more than 5 minutes — don't burn time
          tonight).
        </p>
      </header>

      <Card tone="info" title="Exam-day heuristics">
        <ul className="list-disc pl-5 space-y-1">
          <li>If the problem gives you a diagram → first step is always reduce to T(s).</li>
          <li>Routh: write coefficients carefully — the #1 error is an arithmetic slip.</li>
          <li>
            K-gain stability: every first-column entry <Math tex="> 0" /> → two
            (or more) inequalities → intersect them.
          </li>
          <li>Error problems: identify system type FIRST.</li>
          <li>
            Disturbance problems: compute <Math tex="e_R" /> and{' '}
            <Math tex="e_D" /> separately.
          </li>
        </ul>
      </Card>

      <div className="space-y-4">
        {PROBLEMS.map((p, i) => (
          <ProblemCard key={p.id} index={i + 1} problem={p} />
        ))}
      </div>

      <section className="pt-4">
        <h2 className="text-2xl font-bold text-slate-50 mb-1">
          🏁 Cumulative test
        </h2>
        <p className="text-sm text-slate-300 mb-4">
          Eight questions spanning all four topics. Treat it like a timed
          warm-up — answer without peeking at the study guide, then review any
          you miss.
        </p>
        <MiniQuiz
          title="Final retention test — all topics"
          subtitle="8 questions • instant feedback"
          questions={FINAL_QUIZ}
        />
      </section>
    </div>
  );
}

interface ProblemCardProps {
  readonly index: number;
  readonly problem: Problem;
}

function ProblemCard({ index, problem }: ProblemCardProps): JSXEl {
  const [showSolution, setShowSolution] = useState(false);
  const [showHint, setShowHint] = useState(false);
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900/60 overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 border-b border-slate-700 text-xs font-semibold uppercase tracking-wider">
        <span className="text-slate-400">Problem {index}</span>
        <span className={topicBadge(problem.topic)}>{problem.topic}</span>
      </div>
      <div className="p-4 md:p-5 space-y-4">
        <div className="text-slate-100 leading-relaxed text-[15px]">
          {problem.prompt}
        </div>
        <div className="flex flex-wrap gap-2">
          {problem.hint !== undefined && (
            <button
              type="button"
              onClick={() => {
                setShowHint((v) => !v);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm bg-amber-500/15 text-amber-200 border border-amber-700 hover:bg-amber-500/25 transition"
            >
              {showHint ? <EyeOff size={14} /> : <Eye size={14} />}
              {showHint ? 'Hide hint' : 'Hint'}
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              setShowSolution((v) => !v);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm bg-sky-500/15 text-sky-200 border border-sky-700 hover:bg-sky-500/25 transition"
          >
            <Check size={14} />
            {showSolution ? 'Hide solution' : 'Show solution'}
          </button>
        </div>
        {showHint && problem.hint !== undefined && (
          <div className="rounded-md border border-amber-700 bg-amber-500/10 p-3 text-sm text-amber-100">
            <div className="font-semibold mb-1">Hint</div>
            {problem.hint}
          </div>
        )}
        {showSolution && (
          <div className="rounded-md border border-emerald-700 bg-emerald-500/10 p-3 text-sm text-emerald-50">
            <div className="font-semibold mb-1 text-emerald-200">Solution</div>
            {problem.solution}
          </div>
        )}
      </div>
    </div>
  );
}

function topicBadge(topic: Problem['topic']): string {
  const base = 'px-2 py-0.5 rounded-full border';
  switch (topic) {
    case 'Block':
      return `${base} bg-violet-500/15 text-violet-200 border-violet-700`;
    case 'Stability':
      return `${base} bg-emerald-500/15 text-emerald-200 border-emerald-700`;
    case 'Routh':
      return `${base} bg-sky-500/15 text-sky-200 border-sky-700`;
    case 'Error':
      return `${base} bg-rose-500/15 text-rose-200 border-rose-700`;
  }
}

const PROBLEMS: readonly Problem[] = [
  {
    id: 'b1',
    topic: 'Block',
    prompt: (
      <>
        <p>
          A unity negative-feedback loop has forward path{' '}
          <Math tex="G(s) = \dfrac{10}{s(s+2)}" />. Find the closed-loop
          transfer function <Math tex="T(s)" /> and its characteristic equation.
        </p>
      </>
    ),
    solution: (
      <>
        <Math display tex="T(s) = \dfrac{G}{1+G} = \dfrac{10/[s(s+2)]}{1 + 10/[s(s+2)]} = \dfrac{10}{s^2 + 2s + 10}" />
        <p>Characteristic equation (denominator = 0):</p>
        <Math display tex="s^2 + 2s + 10 = 0" />
      </>
    ),
  },
  {
    id: 's1',
    topic: 'Stability',
    prompt: (
      <>
        <p>
          Without using Routh, can you immediately conclude anything about the
          stability of a system whose characteristic polynomial is{' '}
          <Math tex="s^4 + 3s^2 + 2s + 1" />?
        </p>
      </>
    ),
    hint: <p>Check the necessary condition (all coefficients present, same sign).</p>,
    solution: (
      <>
        <p>
          The <Math tex="s^3" /> term is missing → violates the necessary
          condition → <strong>not stable</strong> (either unstable or
          marginally stable). No Routh needed to rule it out.
        </p>
      </>
    ),
  },
  {
    id: 'r1',
    topic: 'Routh',
    prompt: (
      <>
        <p>Apply Routh-Hurwitz to determine stability of</p>
        <Math display tex="s^3 + 2s^2 + 3s + 6 = 0" />
      </>
    ),
    hint: <p>You will get a zero in column 1 → special case.</p>,
    solution: (
      <>
        <p>Rows:</p>
        <Math display tex="\begin{array}{c|cc} s^3 & 1 & 3 \\ s^2 & 2 & 6 \\ s^1 & 0 & 0 \end{array}" />
        <p>
          An entire row of zeros → auxiliary polynomial from <Math tex="s^2" />{' '}
          row: <Math tex="A(s) = 2s^2 + 6" />. Differentiate:{' '}
          <Math tex="A'(s) = 4s" />. Replace zeros with <Math tex="4, 0" />:
        </p>
        <Math display tex="\begin{array}{c|cc} s^1 & 4 & 0 \\ s^0 & 6 & 0 \end{array}" />
        <p>
          First column: (1, 2, 4, 6). No sign changes, but the row-of-zeros
          signalled symmetric roots → <strong>marginally stable</strong> (a
          pair on the <Math tex="j\omega" /> axis).
        </p>
      </>
    ),
  },
  {
    id: 'r2',
    topic: 'Routh',
    prompt: (
      <>
        <p>
          Find the range of <Math tex="K" /> for which the unity-feedback
          system with forward path{' '}
          <Math tex="G(s) = \dfrac{K}{s(s+1)(s+3)}" /> is stable.
        </p>
      </>
    ),
    hint: <p>Write down D(s) from T = G/(1+G), then build the Routh array in terms of K.</p>,
    solution: (
      <>
        <p>
          <Math tex="D(s) = s(s+1)(s+3) + K = s^3 + 4s^2 + 3s + K" />.
        </p>
        <p>Routh array:</p>
        <Math
          display
          tex="\begin{array}{c|cc} s^3 & 1 & 3 \\ s^2 & 4 & K \\ s^1 & (12-K)/4 & 0 \\ s^0 & K & 0 \end{array}"
        />
        <p>Need every first-column entry &gt; 0:</p>
        <Math display tex="\dfrac{12-K}{4} > 0 \;\Rightarrow\; K < 12" />
        <Math display tex="K > 0" />
        <p>
          <strong>Stable for <Math tex="0 < K < 12" />.</strong>
        </p>
      </>
    ),
  },
  {
    id: 'r3',
    topic: 'Routh',
    prompt: (
      <>
        <p>
          From lab 2 you had{' '}
          <Math tex="D(s) = s^4 + 22s^3 + (144+K)s^2 + (288-10K)s + 50K" />.
        </p>
        <p>
          What three conditions on <Math tex="K" /> must simultaneously hold
          for stability? (You don't need the final numeric range; write the
          inequalities.)
        </p>
      </>
    ),
    hint: (
      <p>
        After building the array, require positivity of every first-column
        entry. The tricky row is <Math tex="s^1" /> because its entry is a
        rational function of K.
      </p>
    ),
    solution: (
      <>
        <p>The first-column entries come from the Routh table:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <Math tex="s^4" />: 1 &gt; 0 (always true).
          </li>
          <li>
            <Math tex="s^3" />: 22 &gt; 0 (always true).
          </li>
          <li>
            <Math tex="s^2" />:{' '}
            <Math tex="\dfrac{22(144+K) - (288-10K)}{22} > 0" /> →{' '}
            <Math tex="K > -30" /> (auto-satisfied for <Math tex="K>0" />).
          </li>
          <li>
            <Math tex="s^1" />: the rational expression in <Math tex="K" /> &gt; 0
            → gives an upper bound (this is where{' '}
            <Math tex="K_{marginal}" /> lives).
          </li>
          <li>
            <Math tex="s^0" />: <Math tex="50K > 0" /> →{' '}
            <Math tex="K > 0" />.
          </li>
        </ul>
        <p className="mt-2 text-xs text-slate-300">
          The lab's <Math tex="K_{marginal}" /> is obtained by setting the{' '}
          <Math tex="s^1" /> entry = 0 and taking the smallest positive real
          root.
        </p>
      </>
    ),
  },
  {
    id: 'e1',
    topic: 'Error',
    prompt: (
      <>
        <p>Unity feedback with</p>
        <Math display tex="G(s) = \dfrac{20(s+1)}{s(s+4)(s+5)}" />
        <p>
          Find the steady-state error for (a) a unit step input and (b) a unit
          ramp input. Assume the closed-loop is stable.
        </p>
      </>
    ),
    hint: (
      <p>
        Count integrators in <Math tex="G" /> → system type. Use Table 7.2 to
        know whether you need <Math tex="K_p" /> or <Math tex="K_v" />.
      </p>
    ),
    solution: (
      <>
        <p>
          <Math tex="G" /> has one pole at origin → Type 1.
        </p>
        <p>(a) Step: Type 1 → <Math tex="e_{\text{step}} = 0" />.</p>
        <p>(b) Ramp:</p>
        <Math
          display
          tex="K_v = \lim_{s \to 0} s G = \lim_{s \to 0} \dfrac{20(s+1)}{(s+4)(s+5)} = \dfrac{20 \cdot 1}{4 \cdot 5} = 1"
        />
        <Math display tex="e_{\text{ramp}} = 1/K_v = 1" />
      </>
    ),
  },
  {
    id: 'e2',
    topic: 'Error',
    prompt: (
      <>
        <p>(Lab 3 shape — same structure as the likely exam problem.)</p>
        <p>
          Unity feedback with <Math tex="G_1(s) = \dfrac{K_1(s+2)}{s+3}" /> as
          controller, plant <Math tex="G_2(s) = \dfrac{K_2}{s(s+4)}" />, and a
          step disturbance injected between them.
        </p>
        <p>Design <Math tex="K_1, K_2" /> so that:</p>
        <ul className="list-disc pl-5 mt-1">
          <li>Step-disturbance error = <Math tex="-0.000012" />,</li>
          <li>Unit-ramp reference error = <Math tex="0.003" />.</li>
        </ul>
      </>
    ),
    hint: (
      <p>
        Two specs → two equations. Start with the disturbance formula (only
        depends on <Math tex="K_1" />), then use ramp to fix <Math tex="K_2" />.
      </p>
    ),
    solution: (
      <>
        <p>System type of <Math tex="G_1 G_2" />: one pole at origin → Type 1.</p>
        <p>Ramp error:</p>
        <Math
          display
          tex="K_v = \lim_{s \to 0} s G_1 G_2 = \dfrac{K_1 K_2 \cdot 2}{3 \cdot 4} = \dfrac{K_1 K_2}{6}"
        />
        <Math
          display
          tex="e_R = 1/K_v = 6/(K_1 K_2) = 0.003 \;\Rightarrow\; K_1 K_2 = 2000"
        />
        <p>Disturbance (step):</p>
        <Math display tex="\lim G_2 = \infty \;\Rightarrow\; 1/\lim G_2 = 0" />
        <Math display tex="\lim G_1 = 2K_1/3" />
        <Math
          display
          tex="e_D = -\dfrac{1}{0 + 2K_1/3} = -\dfrac{3}{2K_1} = -0.000012 \;\Rightarrow\; K_1 = 125{,}000"
        />
        <Math display tex="K_2 = 2000/K_1 = 0.016" />
        <div className="mt-2 p-2 bg-emerald-900/60 border border-emerald-700 rounded">
          <Math display tex="\boxed{K_1 = 125{,}000,\; K_2 = 0.016}" />
        </div>
      </>
    ),
  },
  {
    id: 'r4',
    topic: 'Routh',
    prompt: (
      <>
        <p>
          Are all roots of <Math tex="s^3 + 6s^2 + 12s + 10 = 0" /> to the left
          of <Math tex="s = -1" />?
        </p>
      </>
    ),
    hint: <p>Substitute <Math tex="s = z - 1" /> and run Routh on the z-polynomial.</p>,
    solution: (
      <>
        <p>
          Substituting <Math tex="s = z - 1" /> into the polynomial and
          expanding:
        </p>
        <Math display tex="(z-1)^3 + 6(z-1)^2 + 12(z-1) + 10 = z^3 + 3z^2 + 3z + 3" />
        <p>Routh in z:</p>
        <Math
          display
          tex="\begin{array}{c|cc} z^3 & 1 & 3 \\ z^2 & 3 & 3 \\ z^1 & 2 & 0 \\ z^0 & 3 & 0 \end{array}"
        />
        <p>
          First column (1, 3, 2, 3) — no sign changes. All <Math tex="z" />{' '}
          roots are in the LHP, so all original <Math tex="s" /> roots lie
          strictly to the left of <Math tex="s = -1" />. <strong>Yes.</strong>
        </p>
      </>
    ),
  },
];
