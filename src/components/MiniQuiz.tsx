import { useState } from 'react';
import type { ReactNode } from 'react';
import { Check, X, RotateCcw, Trophy } from 'lucide-react';

export interface QuizOption {
  readonly label: ReactNode;
  readonly correct?: boolean;
}

export interface QuizQuestion {
  readonly id: string;
  readonly prompt: ReactNode;
  readonly options: readonly QuizOption[];
  readonly explain: ReactNode;
}

interface MiniQuizProps {
  readonly title: string;
  readonly subtitle?: string;
  readonly questions: readonly QuizQuestion[];
}

export function MiniQuiz({ title, subtitle, questions }: MiniQuizProps): JSXEl {
  const [picked, setPicked] = useState<Record<string, number>>({});
  const [version, setVersion] = useState(0);

  const answeredCount = Object.keys(picked).length;
  const correctCount = questions.reduce((acc, q) => {
    const idx = picked[q.id];
    if (idx === undefined) return acc;
    return acc + (q.options[idx]?.correct === true ? 1 : 0);
  }, 0);
  const done = answeredCount === questions.length;

  const reset = (): void => {
    setPicked({});
    setVersion((v) => v + 1);
  };

  return (
    <section
      className="rounded-xl border border-sky-700 bg-sky-950/40 p-4 md:p-5 space-y-4"
      aria-label={title}
    >
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h2 className="text-lg font-semibold text-sky-100 flex items-center gap-2">
            <Trophy size={18} className="text-amber-300" />
            {title}
          </h2>
          {subtitle !== undefined && (
            <p className="text-xs text-slate-400 mt-1">{subtitle}</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <div
            className="text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-slate-200"
            aria-live="polite"
          >
            {correctCount}/{questions.length} correct
            {done ? ' ✓' : ''}
          </div>
          {answeredCount > 0 && (
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 transition"
            >
              <RotateCcw size={12} />
              Reset
            </button>
          )}
        </div>
      </div>

      <ol className="space-y-3 list-decimal pl-5">
        {questions.map((q, i) => (
          <li key={`${String(version)}-${q.id}`} className="pl-1">
            <QuizItem
              question={q}
              picked={picked[q.id]}
              onPick={(idx) => {
                setPicked((prev) => {
                  if (prev[q.id] !== undefined) return prev;
                  return { ...prev, [q.id]: idx };
                });
              }}
              index={i + 1}
            />
          </li>
        ))}
      </ol>

      {done && <DoneBanner correct={correctCount} total={questions.length} />}
    </section>
  );
}

interface QuizItemProps {
  readonly question: QuizQuestion;
  readonly picked: number | undefined;
  readonly onPick: (idx: number) => void;
  readonly index: number;
}

function QuizItem({ question, picked, onPick }: QuizItemProps): JSXEl {
  const locked = picked !== undefined;
  const correctIdx = question.options.findIndex((o) => o.correct === true);
  return (
    <div className="space-y-2">
      <div className="text-slate-100 text-[15px] leading-relaxed">
        {question.prompt}
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {question.options.map((opt, idx) => {
          const isPicked = picked === idx;
          const isCorrect = opt.correct === true;
          let tone =
            'bg-slate-900/70 border-slate-700 text-slate-200 hover:bg-slate-800';
          if (locked) {
            if (isCorrect) {
              tone = 'bg-emerald-500/20 border-emerald-500 text-emerald-100';
            } else if (isPicked) {
              tone = 'bg-rose-500/20 border-rose-500 text-rose-100';
            } else {
              tone = 'bg-slate-900/40 border-slate-800 text-slate-400';
            }
          }
          return (
            <button
              key={idx}
              type="button"
              disabled={locked}
              onClick={() => {
                onPick(idx);
              }}
              className={`text-left text-sm px-3 py-2 rounded-md border transition-colors disabled:cursor-default ${tone}`}
            >
              <span className="inline-flex items-center gap-2">
                <span
                  className={`inline-flex w-5 h-5 items-center justify-center rounded-full text-[11px] font-bold ${
                    locked && isCorrect
                      ? 'bg-emerald-500 text-white'
                      : locked && isPicked
                        ? 'bg-rose-500 text-white'
                        : 'bg-slate-700 text-slate-200'
                  }`}
                >
                  {locked && isCorrect ? (
                    <Check size={12} />
                  ) : locked && isPicked ? (
                    <X size={12} />
                  ) : (
                    String.fromCharCode(65 + idx)
                  )}
                </span>
                <span>{opt.label}</span>
              </span>
            </button>
          );
        })}
      </div>
      {locked && (
        <div
          className={`text-xs px-3 py-2 rounded-md border ${
            picked === correctIdx
              ? 'bg-emerald-950/60 border-emerald-800 text-emerald-100'
              : 'bg-amber-950/60 border-amber-800 text-amber-100'
          }`}
        >
          <span className="font-semibold">
            {picked === correctIdx ? 'Correct — ' : 'Not quite — '}
          </span>
          {question.explain}
        </div>
      )}
    </div>
  );
}

function DoneBanner({
  correct,
  total,
}: {
  readonly correct: number;
  readonly total: number;
}): JSXEl {
  const pct = Math.round((correct / total) * 100);
  const tier =
    pct === 100
      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-100'
      : pct >= 70
        ? 'bg-sky-500/20 border-sky-500 text-sky-100'
        : 'bg-amber-500/20 border-amber-500 text-amber-100';
  const message =
    pct === 100
      ? 'Perfect. You own this topic.'
      : pct >= 70
        ? 'Solid. Skim the ones you missed and move on.'
        : 'Re-read this topic before moving on.';
  return (
    <div className={`rounded-md border px-3 py-2 text-sm ${tier}`} role="status">
      <span className="font-semibold">
        {correct}/{total} ({pct}%) — {message}
      </span>
    </div>
  );
}
