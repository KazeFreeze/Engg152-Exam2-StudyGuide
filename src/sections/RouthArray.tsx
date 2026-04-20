import { useState } from 'react';
import { ArrowRight, SkipBack, Info } from 'lucide-react';
import { Card } from '../components/Card';
import { Math } from '../components/Math';
import { MiniQuiz } from '../components/MiniQuiz';
import { SCENARIOS, type ScenarioId } from './routh-data';
import { ROUTH_QUIZ } from './quizzes';

export function RouthArray(): JSXEl {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-slate-50">🧮 Routh Array</h1>
        <p className="mt-2 text-slate-300">
          A purely algebraic trick to count right-half-plane roots of{' '}
          <Math tex="D(s)" /> <em>without</em> factoring it. You build a table
          of coefficients, then count sign changes in the first column.
        </p>
      </header>

      <Card title="The recipe" tone="info">
        <ol className="list-decimal pl-5 space-y-1">
          <li>
            Write the characteristic polynomial{' '}
            <Math tex="a_n s^n + a_{n-1} s^{n-1} + \dots + a_0" />.
          </li>
          <li>
            Row <Math tex="s^n" />: every <em>other</em> coefficient starting
            from <Math tex="a_n" />. Row <Math tex="s^{n-1}" />: the ones in
            between. Pad with zeros on the right.
          </li>
          <li>
            For each new entry: cross-multiply the two rows above (anchor
            column stays at the leftmost column, the other column slides over)
            and divide by the first entry of the row directly above. It's the
            same as a <Math tex="2\times 2" /> determinant with a sign flip.
          </li>
          <li>
            When the array is built, count sign changes in the first column.
            That count equals the number of RHP roots.
          </li>
          <li>
            Zero changes → <strong>stable</strong>.
          </li>
        </ol>
      </Card>

      <Card title="The cross-multiply formula">
        <p>
          For target cell below, using the two rows above:
        </p>
        <Math
          display
          tex="\text{target} = \dfrac{(\text{left-pivot})(\text{right-top}) - (\text{top-pivot})(\text{right-bot})}{(\text{left-pivot of row above target})}"
        />
        <p className="text-sm text-slate-400 mt-2">
          Easier to remember: it's a negative determinant of the
          <Math tex="2\times 2" /> block above, divided by the leading entry of
          the row directly above.
        </p>
      </Card>

      <Card title="Special cases cheat-sheet" tone="warn">
        <ul className="space-y-2">
          <li>
            <strong>Zero in first column (rest of row nonzero):</strong>{' '}
            replace with <Math tex="\varepsilon" />, continue. At the end, take{' '}
            <Math tex="\varepsilon \to 0^+" /> and count sign changes.
          </li>
          <li>
            <strong>Entire row of zeros:</strong> form the auxiliary polynomial
            from the row <em>above</em> the zeros, differentiate, and replace
            the zero row with those coefficients. This case signals roots
            symmetric about the origin (often a pair on the{' '}
            <Math tex="j\omega" /> axis — marginal stability).
          </li>
          <li>
            <strong>Unknown gain K:</strong> build the array with K inside. For
            stability, demand <em>every</em> first-column entry <Math tex="> 0" />.
            Solve the resulting inequalities → range of K.
          </li>
          <li>
            <strong>Relative stability (left of <Math tex="s = -a" />):</strong>{' '}
            substitute <Math tex="s = z - a" /> into <Math tex="D(s)" />, run
            Routh on the z-polynomial. No sign changes → all original poles lie
            left of <Math tex="s = -a" />.
          </li>
        </ul>
      </Card>

      <h2 className="text-xl font-semibold text-slate-100 pt-4">
        Interactive walkthrough
      </h2>
      <p className="text-sm text-slate-300">
        Six scenarios — step through each one to see exactly where every number
        comes from. Tap <em>Next</em> to advance.
      </p>
      <RouthInteractive />

      <MiniQuiz
        title="Retention check — Routh Array"
        subtitle="5 questions • instant feedback"
        questions={ROUTH_QUIZ}
      />
    </div>
  );
}

/* ---------- Interactive (ported from routh_array_animation.jsx, TS-strict) ---------- */

function RouthInteractive(): JSXEl {
  const scenarioIds = Object.keys(SCENARIOS) as ScenarioId[];
  const firstId: ScenarioId = scenarioIds[0] ?? 'standard';
  const [activeTab, setActiveTab] = useState<ScenarioId>(firstId);
  const [currentStep, setCurrentStep] = useState(0);

  const scenario = SCENARIOS[activeTab];
  const stepData = scenario.steps[currentStep] ?? scenario.steps[0];
  if (!stepData) throw new Error('scenario must have at least one step');

  const handleTabChange = (id: ScenarioId): void => {
    setActiveTab(id);
    setCurrentStep(0);
  };

  const handleNext = (): void => {
    if (currentStep < scenario.steps.length - 1) {
      setCurrentStep((c) => c + 1);
    }
  };

  const handlePrev = (): void => {
    if (currentStep > 0) {
      setCurrentStep((c) => c - 1);
    }
  };

  const getCellClass = (r: number, c: number): string => {
    const base =
      'w-14 sm:w-16 md:w-20 h-10 md:h-12 flex items-center justify-center border text-sm md:text-lg font-medium transition-all duration-300 ';
    const hl = stepData.highlights;
    if (!hl) return base + 'bg-slate-950 border-slate-700 text-slate-100';
    if (hl.columnOne === true && c === 0) {
      return (
        base +
        'bg-sky-500/20 border-sky-400 font-bold text-sky-200 shadow-sm'
      );
    }
    if (hl.targetRow === r) {
      if (hl.error === true) return base + 'bg-rose-500/20 border-rose-400 text-rose-200';
      if (hl.success === true) return base + 'bg-emerald-500/20 border-emerald-400 text-emerald-200';
    }
    if (hl.target?.[0] === r && hl.target[1] === c) {
      if (hl.error === true)
        return base + 'bg-rose-500/20 border-rose-400 border-2 text-rose-200 scale-105';
      if (hl.success === true)
        return base + 'bg-emerald-500/20 border-emerald-400 border-2 text-emerald-200 scale-105';
      return (
        base +
        'bg-amber-500/20 border-amber-400 border-dashed border-2 text-amber-200 scale-105 shadow-sm'
      );
    }
    if (hl.pivot?.[0] === r && hl.pivot[1] === c)
      return base + 'bg-sky-500/20 border-sky-400 text-sky-200';
    if (hl.topPivot?.[0] === r && hl.topPivot[1] === c)
      return base + 'bg-purple-500/20 border-purple-400 text-purple-200';
    if (hl.rightTop?.[0] === r && hl.rightTop[1] === c)
      return base + 'bg-orange-500/20 border-orange-400 text-orange-200';
    if (hl.rightBot?.[0] === r && hl.rightBot[1] === c)
      return base + 'bg-pink-500/20 border-pink-400 text-pink-200';

    return base + 'bg-slate-900 border-slate-800 text-slate-500 opacity-60';
  };

  const highestPower = stepData.grid.length;
  const variable = scenario.variable ?? 's';

  return (
    <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-900/40">
      <div className="bg-slate-900 p-4 md:p-5">
        <div className="flex flex-wrap gap-2">
          {Object.values(SCENARIOS).map((scen) => (
            <button
              key={scen.id}
              type="button"
              onClick={() => {
                handleTabChange(scen.id);
              }}
              className={`px-3 py-1.5 rounded-md font-medium text-xs md:text-sm transition-colors ${
                activeTab === scen.id
                  ? 'bg-sky-500 text-white shadow'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {scen.title}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 md:p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <div className="flex flex-col items-center">
          <div className="text-base md:text-lg font-semibold text-slate-100 mb-3 bg-slate-800/60 px-3 py-1.5 rounded-md">
            {scenario.equation}
          </div>

          <div className="relative p-3 md:p-5 bg-slate-950 rounded-lg border border-slate-700">
            {stepData.grid.map((row, r) => (
              <div key={r} className="flex mb-1 items-center">
                <div className="w-10 md:w-12 font-bold text-slate-400 mr-2 md:mr-4 text-right text-xs md:text-sm">
                  {variable}
                  <sup className="text-[10px]">{highestPower - 1 - r}</sup>
                </div>
                <div className="flex gap-0.5 md:gap-1">
                  {row.map((cell, c) => (
                    <div key={c} className={getCellClass(r, c)}>
                      {cell}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4">
          <div className="bg-sky-950/60 border border-sky-800 text-sky-100 p-4 md:p-5 rounded-lg min-h-[120px] flex items-start gap-3">
            <Info size={20} className="text-sky-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm md:text-base leading-relaxed">
              {stepData.message}
            </p>
          </div>

          <div className="h-32 md:h-40 flex items-center justify-center">
            {stepData.formula ? (
              <div className="bg-slate-900 border border-slate-700 rounded-lg p-3 md:p-4 flex items-center text-sm md:text-lg font-medium flex-wrap gap-2 justify-center">
                <span className="text-slate-400">Target =</span>
                <div className="flex flex-col items-center">
                  <div className="flex items-center pb-1 border-b-2 border-slate-200 px-2 gap-1">
                    <span className="text-sky-300 font-bold">
                      ({stepData.formula.c})
                    </span>
                    <span>×</span>
                    <span className="text-orange-300 font-bold">
                      ({stepData.formula.b})
                    </span>
                    <span className="text-slate-400">−</span>
                    <span className="text-purple-300 font-bold">
                      ({stepData.formula.a})
                    </span>
                    <span>×</span>
                    <span className="text-pink-300 font-bold">
                      ({stepData.formula.d})
                    </span>
                  </div>
                  <div className="pt-1 text-sky-300 font-bold">
                    {stepData.formula.c}
                  </div>
                </div>
                <span className="text-slate-400">=</span>
                <span className="text-base md:text-xl font-bold bg-amber-500/20 text-amber-200 px-3 py-1 rounded border border-amber-400">
                  {stepData.formula.result}
                </span>
              </div>
            ) : (
              <div className="text-slate-500 italic text-sm">
                Follow the steps to see each calculation.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border-t border-slate-700 p-3 md:p-4 flex items-center justify-between gap-3">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Step {currentStep + 1} / {scenario.steps.length}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="flex items-center gap-1 px-3 py-2 rounded-md font-medium text-sm bg-slate-800 border border-slate-600 text-slate-200 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <SkipBack size={16} />
            Prev
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={currentStep === scenario.steps.length - 1}
            className="flex items-center gap-1 px-4 py-2 rounded-md font-semibold text-sm bg-sky-600 text-white hover:bg-sky-500 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Next
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
