import type { QuizQuestion } from '../components/MiniQuiz';
import { Math } from '../components/Math';

export const BLOCK_QUIZ: readonly QuizQuestion[] = [
  {
    id: 'b-1',
    prompt: (
      <>
        Two blocks <Math tex="G_1" /> and <Math tex="G_2" /> in <strong>series</strong>{' '}
        reduce to a single block equal to:
      </>
    ),
    options: [
      { label: <Math tex="G_1 + G_2" /> },
      { label: <Math tex="G_1 \cdot G_2" />, correct: true },
      { label: <Math tex="G_1 / G_2" /> },
      { label: <Math tex="G_1 - G_2" /> },
    ],
    explain: (
      <>
        Series = cascade = output of one feeds input of the next, so transfer
        functions multiply: <Math tex="C/R = G_1 G_2" />.
      </>
    ),
  },
  {
    id: 'b-2',
    prompt: (
      <>
        Two blocks in <strong>parallel</strong> (same input, outputs summed):
      </>
    ),
    options: [
      { label: <Math tex="G_1 + G_2" />, correct: true },
      { label: <Math tex="G_1 G_2" /> },
      { label: <Math tex="G_1 / (1 + G_2)" /> },
      { label: <Math tex="G_2 / G_1" /> },
    ],
    explain: (
      <>
        Parallel branches share an input and their outputs get summed →{' '}
        <Math tex="C/R = G_1 + G_2" /> (or <Math tex="G_1 - G_2" /> if the
        summer uses a minus on one branch).
      </>
    ),
  },
  {
    id: 'b-3',
    prompt: (
      <>
        A unity negative-feedback loop with forward path <Math tex="G(s)" />{' '}
        has closed-loop transfer function:
      </>
    ),
    options: [
      { label: <Math tex="G/(1 - G)" /> },
      { label: <Math tex="G/(1 + G)" />, correct: true },
      { label: <Math tex="(1+G)/G" /> },
      { label: <Math tex="1/(1+G)" /> },
    ],
    explain: (
      <>
        Feedback formula: <Math tex="T = G/(1 \pm GH)" /> with a <Math tex="+" />{' '}
        for <em>negative</em> feedback. Unity feedback → <Math tex="H=1" />.
      </>
    ),
  },
  {
    id: 'b-4',
    prompt: (
      <>
        You move a <strong>pickoff (takeoff) point</strong> from before a block{' '}
        <Math tex="G" /> to <em>after</em> it (i.e., the branch now comes off
        the block's output). To keep the signal values unchanged, you must
        compensate the branch by:
      </>
    ),
    options: [
      { label: <>multiplying by <Math tex="G" /></> },
      { label: <>multiplying by <Math tex="1/G" /></>, correct: true },
      { label: <>adding <Math tex="G" /></> },
      { label: <>no compensation needed</> },
    ],
    explain: (
      <>
        Previously the branch carried <Math tex="X" />. After the move, the
        output of <Math tex="G" /> is <Math tex="XG" /> — too big. Multiplying
        by <Math tex="1/G" /> restores <Math tex="X" />.
      </>
    ),
  },
  {
    id: 'b-5',
    prompt: (
      <>
        In the lab-3 / exam block diagram, where is the disturbance{' '}
        <Math tex="D(s)" /> injected?
      </>
    ),
    options: [
      { label: <>at the reference input before the summer</> },
      {
        label: <>between controller <Math tex="G_1" /> and plant <Math tex="G_2" /></>,
        correct: true,
      },
      { label: <>after the plant, directly on the output</> },
      { label: <>in the feedback path</> },
    ],
    explain: (
      <>
        The disturbance enters the second summing junction — between{' '}
        <Math tex="G_1" /> and <Math tex="G_2" />. Because the disturbance
        signal still passes through <Math tex="G_2" /> on its way to the
        output, the error formula gets that extra <Math tex="G_2" /> factor
        (Nise eq. 7.60).
      </>
    ),
  },
];

export const STABILITY_QUIZ: readonly QuizQuestion[] = [
  {
    id: 's-1',
    prompt: <>For a BIBO-stable LTI system, every closed-loop pole lies:</>,
    options: [
      { label: 'anywhere in the s-plane' },
      { label: 'in the left-half plane (LHP)', correct: true },
      { label: 'on the jω axis' },
      { label: 'in the right-half plane (RHP)' },
    ],
    explain: (
      <>
        Each pole at <Math tex="s = \sigma + j\omega" /> contributes a term{' '}
        <Math tex="e^{\sigma t}\cos(\omega t)" />. Negative <Math tex="\sigma" />{' '}
        decays → LHP is the stable region.
      </>
    ),
  },
  {
    id: 's-2',
    prompt: (
      <>
        The characteristic polynomial is <Math tex="s^4 + 3s^2 + 2s + 1" />.
        You can conclude immediately that it is:
      </>
    ),
    options: [
      { label: 'stable' },
      { label: 'NOT stable (necessary condition fails)', correct: true },
      { label: 'marginally stable' },
      { label: 'you still need the full Routh array' },
    ],
    explain: (
      <>
        The <Math tex="s^3" /> coefficient is missing → the necessary condition
        (all coefficients present and same sign) fails → cannot be stable. No
        Routh needed.
      </>
    ),
  },
  {
    id: 's-3',
    prompt: (
      <>
        A non-repeated pair of poles sitting exactly on the{' '}
        <Math tex="j\omega" /> axis (rest of poles in LHP) gives:
      </>
    ),
    options: [
      { label: 'stable behaviour' },
      { label: 'marginal stability (sustained oscillation)', correct: true },
      { label: 'exponential blow-up' },
      { label: "can't tell without more info" },
    ],
    explain: (
      <>
        <Math tex="\sigma = 0" /> means no decay, no growth — pure sinusoid
        forever. That's marginal stability.
      </>
    ),
  },
  {
    id: 's-4',
    prompt: <>Repeated poles on the jω axis produce:</>,
    options: [
      { label: 'marginal stability' },
      { label: 'instability (response grows like t·sin(ωt))', correct: true },
      { label: 'faster decay than single poles' },
      { label: 'no effect — same as a single pole' },
    ],
    explain: (
      <>
        Multiplicity on the imaginary axis introduces a <Math tex="t^k" />{' '}
        factor in the time response → unbounded → unstable.
      </>
    ),
  },
  {
    id: 's-5',
    prompt: (
      <>
        When we say "is this system stable?" on the exam, we are asking about:
      </>
    ),
    options: [
      { label: 'the open-loop transfer function G(s)' },
      { label: 'the closed-loop transfer function T(s)', correct: true },
      { label: 'the plant alone' },
      { label: 'the feedback path H(s)' },
    ],
    explain: (
      <>
        Stability of a feedback system is always about the closed-loop poles,
        which are the roots of <Math tex="1 + G(s)H(s) = 0" />.
      </>
    ),
  },
];

export const ROUTH_QUIZ: readonly QuizQuestion[] = [
  {
    id: 'r-1',
    prompt: (
      <>
        The number of sign changes in the <strong>first column</strong> of the
        Routh array equals:
      </>
    ),
    options: [
      { label: 'the system order' },
      { label: 'the number of poles in the RHP', correct: true },
      { label: 'the number of zeros of G(s)' },
      { label: 'the number of integrators in G(s)' },
    ],
    explain: (
      <>
        That's the whole point of Routh-Hurwitz: first-column sign changes =
        RHP pole count. Zero changes → no RHP poles → stable.
      </>
    ),
  },
  {
    id: 'r-2',
    prompt: (
      <>
        You get a <Math tex="0" /> in the first column but the rest of that row
        is nonzero. The standard fix is:
      </>
    ),
    options: [
      { label: 'discard that row and continue' },
      { label: 'replace the 0 with ε, continue, then take ε → 0⁺', correct: true },
      { label: 'differentiate the previous row' },
      { label: 'declare the system unstable and stop' },
    ],
    explain: (
      <>
        The ε trick keeps the array well-defined; at the end you evaluate the
        limit as <Math tex="\varepsilon \to 0^+" /> and count sign changes.
      </>
    ),
  },
  {
    id: 'r-3',
    prompt: <>An entire row of zeros signals:</>,
    options: [
      {
        label: 'roots symmetric about the origin (often a jω pair)',
        correct: true,
      },
      { label: 'a missing coefficient in D(s)' },
      { label: 'the system is guaranteed stable' },
      { label: 'a computational error — redo the array' },
    ],
    explain: (
      <>
        Row of zeros → symmetric roots. Build the auxiliary polynomial from the
        row above, differentiate, and substitute those coefficients to
        continue.
      </>
    ),
  },
  {
    id: 'r-4',
    prompt: (
      <>
        For a Routh array containing an unknown gain <Math tex="K" />, the
        stability condition is that every entry in the first column must be:
      </>
    ),
    options: [
      { label: 'nonzero (sign doesn\'t matter)' },
      { label: 'strictly positive (> 0)', correct: true },
      { label: 'negative' },
      { label: 'an integer' },
    ],
    explain: (
      <>
        All first-column entries must be the same sign (conventionally
        positive) for no sign changes. Each inequality gives one constraint on
        K; intersect them.
      </>
    ),
  },
  {
    id: 'r-5',
    prompt: (
      <>
        To test "are all poles to the <em>left</em> of <Math tex="s = -a" />?" you:
      </>
    ),
    options: [
      { label: 'multiply D(s) by s + a' },
      { label: 'substitute s = z − a and run Routh on the z-polynomial', correct: true },
      { label: 'set K = a and resolve' },
      { label: 'add a to every coefficient' },
    ],
    explain: (
      <>
        The substitution slides the imaginary axis to <Math tex="s = -a" />.
        Stability of the z-polynomial (no sign changes) ⇔ all original s-poles
        are left of <Math tex="-a" />.
      </>
    ),
  },
];

export const ERRORS_QUIZ: readonly QuizQuestion[] = [
  {
    id: 'e-1',
    prompt: <>The Final Value Theorem is valid only when:</>,
    options: [
      { label: 'the input is bounded' },
      { label: 'sE(s) has all its poles in the LHP (closed-loop is stable)', correct: true },
      { label: 'G(s) is minimum phase' },
      { label: 'the system is Type 1 or higher' },
    ],
    explain: (
      <>
        FVT blows up (gives a wrong answer) if <Math tex="sE(s)" /> has poles
        on or right of the jω axis. Always verify stability first.
      </>
    ),
  },
  {
    id: 'e-2',
    prompt: <>The "system type" of G(s) is:</>,
    options: [
      { label: 'the order of the denominator' },
      { label: 'the number of integrators (poles at s = 0) in G(s)', correct: true },
      { label: 'the number of zeros' },
      { label: 'the difference between poles and zeros' },
    ],
    explain: (
      <>
        Type <Math tex="n" /> = factor <Math tex="1/s^n" /> present in{' '}
        <Math tex="G(s)" />. Type 0 = no integrators, Type 1 = one, etc.
      </>
    ),
  },
  {
    id: 'e-3',
    prompt: (
      <>
        A Type 1 system tracks a unit <strong>step</strong> with steady-state
        error equal to:
      </>
    ),
    options: [
      { label: <Math tex="1/(1+K_p)" /> },
      { label: <>0</>, correct: true },
      { label: <>∞</> },
      { label: <Math tex="1/K_v" /> },
    ],
    explain: (
      <>
        From Table 7.2: Type 1 + step → <Math tex="K_p = \infty" /> →{' '}
        <Math tex="e_{ss} = 0" />.
      </>
    ),
  },
  {
    id: 'e-4',
    prompt: <>A Type 1 system's steady-state error for a unit ramp is:</>,
    options: [
      { label: <>0</> },
      { label: <Math tex="1/K_v" />, correct: true },
      { label: <>∞</> },
      { label: <Math tex="1/K_p" /> },
    ],
    explain: (
      <>
        Ramp + Type 1 → finite nonzero error <Math tex="1/K_v" /> where{' '}
        <Math tex="K_v = \lim_{s \to 0} s G(s)" />.
      </>
    ),
  },
  {
    id: 'e-5',
    prompt: (
      <>
        Step disturbance between <Math tex="G_1" /> and <Math tex="G_2" />,
        with <Math tex="G_2" /> having a pole at the origin. The disturbance
        error simplifies to:
      </>
    ),
    options: [
      { label: <Math tex="e_D = -1/\lim_{s\to 0} G_2(s)" /> },
      { label: <Math tex="e_D = -1/\lim_{s\to 0} G_1(s)" />, correct: true },
      { label: <>zero</> },
      { label: <Math tex="e_D = -G_2(0)" /> },
    ],
    explain: (
      <>
        <Math tex="\lim G_2 = \infty" /> kills the <Math tex="1/\lim G_2" />{' '}
        term in Eq. 7.62 → result collapses to{' '}
        <Math tex="-1/\lim G_1" />. This is the lab-3 shortcut.
      </>
    ),
  },
];

export const FINAL_QUIZ: readonly QuizQuestion[] = [
  {
    id: 'f-1',
    prompt: (
      <>
        Given <Math tex="G(s) = 10/[s(s+2)]" /> with unity feedback, the
        characteristic equation of <Math tex="T(s)" /> is:
      </>
    ),
    options: [
      { label: <Math tex="s^2 + 2s = 0" /> },
      { label: <Math tex="s^2 + 2s + 10 = 0" />, correct: true },
      { label: <Math tex="s + 10 = 0" /> },
      { label: <Math tex="s(s+2) + 1 = 0" /> },
    ],
    explain: (
      <>
        <Math tex="T = G/(1+G)" />; set denominator equal to zero →{' '}
        <Math tex="s(s+2) + 10 = 0 \Rightarrow s^2 + 2s + 10 = 0" />.
      </>
    ),
  },
  {
    id: 'f-2',
    prompt: (
      <>
        The polynomial <Math tex="s^3 + 4s^2 + 3s + K" /> must satisfy what
        upper bound on <Math tex="K" /> for stability?
      </>
    ),
    options: [
      { label: <Math tex="K < 3" /> },
      { label: <Math tex="K < 12" />, correct: true },
      { label: <Math tex="K < 4" /> },
      { label: <Math tex="K < 7" /> },
    ],
    explain: (
      <>
        Routh <Math tex="s^1" /> row: <Math tex="(12 - K)/4 > 0" /> →{' '}
        <Math tex="K < 12" />. Combined with <Math tex="K > 0" />, the stable
        range is <Math tex="0 < K < 12" />.
      </>
    ),
  },
  {
    id: 'f-3',
    prompt: (
      <>
        When Routh produces an entire row of zeros, the next step is:
      </>
    ),
    options: [
      { label: 'replace the row with its reciprocals' },
      {
        label: 'take the derivative of the auxiliary polynomial and substitute its coefficients',
        correct: true,
      },
      { label: 'stop — system is stable' },
      { label: 'swap two rows and continue' },
    ],
    explain: (
      <>
        Auxiliary polynomial from the row above the zeros; differentiate;
        coefficients of the derivative replace the zero row. This handles the
        symmetric-roots case.
      </>
    ),
  },
  {
    id: 'f-4',
    prompt: (
      <>
        A unity-feedback system has <Math tex="G = 20(s+1) / [s(s+4)(s+5)]" />.
        Steady-state error for a unit <strong>step</strong> reference is:
      </>
    ),
    options: [
      { label: <>0</>, correct: true },
      { label: <Math tex="1" /> },
      { label: <Math tex="1/20" /> },
      { label: <>∞</> },
    ],
    explain: (
      <>
        Type 1 system (one pole at origin) + step input → <Math tex="e_{ss}=0" />{' '}
        by Table 7.2.
      </>
    ),
  },
  {
    id: 'f-5',
    prompt: <>Same G(s) as Q4. Error for a unit ramp reference:</>,
    options: [
      { label: <>0</> },
      { label: <Math tex="1" />, correct: true },
      { label: <>∞</> },
      { label: <Math tex="1/4" /> },
    ],
    explain: (
      <>
        <Math tex="K_v = \lim_{s\to 0} s G = (20 \cdot 1)/(4 \cdot 5) = 1" />;{' '}
        <Math tex="e_{ramp} = 1/K_v = 1" />.
      </>
    ),
  },
  {
    id: 'f-6',
    prompt: (
      <>
        Lab-3 shape: <Math tex="G_1 = K_1(s+2)/(s+3)" />,{' '}
        <Math tex="G_2 = K_2/[s(s+4)]" />. Step-disturbance error = −0.000012
        uniquely fixes:
      </>
    ),
    options: [
      { label: <Math tex="K_1 = 125{,}000" />, correct: true },
      { label: <Math tex="K_1 = 2000" /> },
      { label: <Math tex="K_1 K_2 = 2000" /> },
      { label: <Math tex="K_2 = 0.016" /> },
    ],
    explain: (
      <>
        With <Math tex="G_2" /> having a pole at 0,{' '}
        <Math tex="e_D = -3/(2K_1) = -0.000012 \Rightarrow K_1 = 125{,}000" />.{' '}
        Only after that do you use the ramp spec to get{' '}
        <Math tex="K_2 = 0.016" />.
      </>
    ),
  },
  {
    id: 'f-7',
    prompt: (
      <>
        Moving a <strong>summing junction</strong> past a block{' '}
        <Math tex="G" /> (in the direction of flow), the input that was just
        entering the summer must be compensated by:
      </>
    ),
    options: [
      { label: <>multiplying by <Math tex="1/G" /></> },
      { label: <>multiplying by <Math tex="G" /></>, correct: true },
      { label: <>no compensation</> },
      { label: <>negating it</> },
    ],
    explain: (
      <>
        Originally <Math tex="(A-B)G = AG - BG" />. After moving the summer to
        the right of <Math tex="G" />, the B branch must carry{' '}
        <Math tex="BG" /> to keep the same output.
      </>
    ),
  },
  {
    id: 'f-8',
    prompt: (
      <>
        You're asked "are all poles of <Math tex="D(s)" /> to the left of{' '}
        <Math tex="s = -2" />?". The right move is:
      </>
    ),
    options: [
      { label: <>substitute <Math tex="s = z - 2" /> then Routh on z-polynomial</>, correct: true },
      { label: <>substitute <Math tex="s = z + 2" /></> },
      { label: <>multiply D(s) by (s+2)</> },
      { label: <>evaluate D(−2)</> },
    ],
    explain: (
      <>
        <Math tex="s = z - a" /> shifts the imaginary axis to{' '}
        <Math tex="s = -a" />. If the z-poly passes Routh (no sign changes),
        all original s-poles are left of <Math tex="-a" />.
      </>
    ),
  },
];
