export type ScenarioId =
  | 'standard'
  | 'epsilon'
  | 'auxiliary'
  | 'higherOrder'
  | 'unknownGain'
  | 'relativeStability';

export type Grid = readonly (readonly string[])[];

export interface Highlights {
  readonly pivot?: readonly [number, number];
  readonly topPivot?: readonly [number, number];
  readonly rightTop?: readonly [number, number];
  readonly rightBot?: readonly [number, number];
  readonly target?: readonly [number, number];
  readonly targetRow?: number;
  readonly columnOne?: boolean;
  readonly error?: boolean;
  readonly success?: boolean;
}

export interface Formula {
  readonly a: string;
  readonly b: string;
  readonly c: string;
  readonly d: string;
  readonly result: string;
}

export interface Step {
  readonly grid: Grid;
  readonly message: string;
  readonly highlights: Highlights | null;
  readonly formula?: Formula;
}

export interface Scenario {
  readonly id: ScenarioId;
  readonly title: string;
  readonly equation: string;
  readonly variable?: string;
  readonly steps: readonly Step[];
}

export const SCENARIOS: Record<ScenarioId, Scenario> = {
  standard: {
    id: 'standard',
    title: '1. Zeros on the Right',
    equation: 's³ + s² + 2s + 8 = 0',
    steps: [
      {
        grid: [
          ['1', '2', '0'],
          ['1', '8', '0'],
          ['', '', ''],
          ['', '', ''],
        ],
        message:
          'Initial setup: we alternate coefficients into the first two rows. The extra spots get padded with 0s — those are the "zeros on the right".',
        highlights: null,
      },
      {
        grid: [
          ['1', '2', '0'],
          ['1', '8', '0'],
          ['', '', ''],
          ['', '', ''],
        ],
        message:
          'First element of the s¹ row. Cross-multiply the two columns directly above and to the right of the target.',
        highlights: {
          pivot: [1, 0],
          topPivot: [0, 0],
          rightTop: [0, 1],
          rightBot: [1, 1],
          target: [2, 0],
        },
        formula: { a: '1', b: '2', c: '1', d: '8', result: '-6' },
      },
      {
        grid: [
          ['1', '2', '0'],
          ['1', '8', '0'],
          ['-6', '', ''],
          ['', '', ''],
        ],
        message:
          'Second element of the s¹ row. This is where the zeros on the right come into play.',
        highlights: {
          pivot: [1, 0],
          topPivot: [0, 0],
          rightTop: [0, 2],
          rightBot: [1, 2],
          target: [2, 1],
        },
        formula: { a: '1', b: '0', c: '1', d: '0', result: '0' },
      },
      {
        grid: [
          ['1', '2', '0'],
          ['1', '8', '0'],
          ['-6', '0', '0'],
          ['', '', ''],
        ],
        message:
          'Because we cross-multiplied with a column of zeros, the result is zero. You can stop calculating once you run out of numbers above.',
        highlights: null,
      },
      {
        grid: [
          ['1', '2', '0'],
          ['1', '8', '0'],
          ['-6', '0', '0'],
          ['', '', ''],
        ],
        message: 'Finally we calculate the single element in the s⁰ row.',
        highlights: {
          pivot: [2, 0],
          topPivot: [1, 0],
          rightTop: [1, 1],
          rightBot: [2, 1],
          target: [3, 0],
        },
        formula: { a: '1', b: '8', c: '-6', d: '0', result: '8' },
      },
      {
        grid: [
          ['1', '2', '0'],
          ['1', '8', '0'],
          ['-6', '0', '0'],
          ['8', '0', '0'],
        ],
        message:
          'Done. First column (1, 1, -6, 8) has 2 sign changes → 2 RHP poles → unstable.',
        highlights: { columnOne: true },
      },
    ],
  },
  epsilon: {
    id: 'epsilon',
    title: '2. Zero in Col 1 (ε)',
    equation: 's⁴ + s³ + 2s² + 2s + 3 = 0',
    steps: [
      {
        grid: [
          ['1', '2', '3'],
          ['1', '2', '0'],
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ],
        message:
          'Initial setup for a 4th-order polynomial. Let\'s start calculating the s² row.',
        highlights: null,
      },
      {
        grid: [
          ['1', '2', '3'],
          ['1', '2', '0'],
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ],
        message: 'First element of the s² row.',
        highlights: {
          pivot: [1, 0],
          topPivot: [0, 0],
          rightTop: [0, 1],
          rightBot: [1, 1],
          target: [2, 0],
        },
        formula: { a: '1', b: '2', c: '1', d: '2', result: '0' },
      },
      {
        grid: [
          ['1', '2', '3'],
          ['1', '2', '0'],
          ['0', '', ''],
          ['', '', ''],
          ['', '', ''],
        ],
        message:
          'Zero in the first column! The next row would divide by this → undefined.',
        highlights: { target: [2, 0], error: true },
      },
      {
        grid: [
          ['1', '2', '3'],
          ['1', '2', '0'],
          ['ε', '', ''],
          ['', '', ''],
          ['', '', ''],
        ],
        message:
          'Fix: replace the zero with ε (tiny positive number) and continue normally.',
        highlights: { target: [2, 0], success: true },
      },
      {
        grid: [
          ['1', '2', '3'],
          ['1', '2', '0'],
          ['ε', '', ''],
          ['', '', ''],
          ['', '', ''],
        ],
        message: 'Second element of the s² row.',
        highlights: {
          pivot: [1, 0],
          topPivot: [0, 0],
          rightTop: [0, 2],
          rightBot: [1, 2],
          target: [2, 1],
        },
        formula: { a: '1', b: '3', c: '1', d: '0', result: '3' },
      },
      {
        grid: [
          ['1', '2', '3'],
          ['1', '2', '0'],
          ['ε', '3', '0'],
          ['', '', ''],
          ['', '', ''],
        ],
        message: 'Calculate s¹ row treating ε like any other number.',
        highlights: {
          pivot: [2, 0],
          topPivot: [1, 0],
          rightTop: [1, 1],
          rightBot: [2, 1],
          target: [3, 0],
        },
        formula: { a: '1', b: '2', c: 'ε', d: '3', result: '(2ε-3)/ε' },
      },
      {
        grid: [
          ['1', '2', '3'],
          ['1', '2', '0'],
          ['ε', '3', '0'],
          ['(2ε-3)/ε', '0', '0'],
          ['', '', ''],
        ],
        message:
          'Now the s⁰ row. The (2ε-3)/ε term cancels itself out when you compute it.',
        highlights: {
          pivot: [3, 0],
          topPivot: [2, 0],
          rightTop: [2, 1],
          rightBot: [3, 1],
          target: [4, 0],
        },
        formula: { a: 'ε', b: '3', c: '(2ε-3)/ε', d: '0', result: '3' },
      },
      {
        grid: [
          ['1', '2', '3'],
          ['1', '2', '0'],
          ['ε', '3', '0'],
          ['(2ε-3)/ε', '0', '0'],
          ['3', '0', '0'],
        ],
        message:
          'Evaluate as ε → 0⁺: (2·0 − 3)/0⁺ = −∞. Signs are (+, +, +, −, +) → two sign changes → unstable.',
        highlights: { columnOne: true },
      },
    ],
  },
  auxiliary: {
    id: 'auxiliary',
    title: '3. Row of Zeros',
    equation: 's³ + 2s² + 4s + 8 = 0',
    steps: [
      {
        grid: [
          ['1', '4', '0'],
          ['2', '8', '0'],
          ['', '', ''],
          ['', '', ''],
        ],
        message: 'Initial setup. Calculate the s¹ row.',
        highlights: null,
      },
      {
        grid: [
          ['1', '4', '0'],
          ['2', '8', '0'],
          ['', '', ''],
          ['', '', ''],
        ],
        message: 'First element of s¹.',
        highlights: {
          pivot: [1, 0],
          topPivot: [0, 0],
          rightTop: [0, 1],
          rightBot: [1, 1],
          target: [2, 0],
        },
        formula: { a: '1', b: '4', c: '2', d: '8', result: '0' },
      },
      {
        grid: [
          ['1', '4', '0'],
          ['2', '8', '0'],
          ['0', '', ''],
          ['', '', ''],
        ],
        message: 'Second element of s¹ — using the zeros on the right.',
        highlights: {
          pivot: [1, 0],
          topPivot: [0, 0],
          rightTop: [0, 2],
          rightBot: [1, 2],
          target: [2, 1],
        },
        formula: { a: '1', b: '0', c: '2', d: '0', result: '0' },
      },
      {
        grid: [
          ['1', '4', '0'],
          ['2', '8', '0'],
          ['0', '0', '0'],
          ['', '', ''],
        ],
        message:
          'Entire row of zeros — signals roots symmetric about the origin (often a pair on the jω axis).',
        highlights: { targetRow: 2, error: true },
      },
      {
        grid: [
          ['1', '4', '0'],
          ['2', '8', '0'],
          ['0', '0', '0'],
          ['', '', ''],
        ],
        message:
          'Fix: look at the row ABOVE the zeros (s²). Build auxiliary A(s) = 2s² + 8. Differentiate: dA/ds = 4s + 0.',
        highlights: { targetRow: 1, success: true },
      },
      {
        grid: [
          ['1', '4', '0'],
          ['2', '8', '0'],
          ['4', '0', '0'],
          ['', '', ''],
        ],
        message:
          'Replace the zero row with the derivative coefficients (4 and 0).',
        highlights: { targetRow: 2, success: true },
      },
      {
        grid: [
          ['1', '4', '0'],
          ['2', '8', '0'],
          ['4', '0', '0'],
          ['', '', ''],
        ],
        message: 'Continue the Routh array normally to find s⁰.',
        highlights: {
          pivot: [2, 0],
          topPivot: [1, 0],
          rightTop: [1, 1],
          rightBot: [2, 1],
          target: [3, 0],
        },
        formula: { a: '2', b: '8', c: '4', d: '0', result: '8' },
      },
      {
        grid: [
          ['1', '4', '0'],
          ['2', '8', '0'],
          ['4', '0', '0'],
          ['8', '0', '0'],
        ],
        message:
          'First column (1, 2, 4, 8) — no sign changes. Combined with the row-of-zeros fact → marginally stable.',
        highlights: { columnOne: true },
      },
    ],
  },
  higherOrder: {
    id: 'higherOrder',
    title: '4. 3rd Column+',
    equation: 's⁶ + 2s⁵ + 3s⁴ + 4s³ + 5s² + 6s + 7 = 0',
    steps: [
      {
        grid: [
          ['1', '3', '5', '7'],
          ['2', '4', '6', '0'],
          ['', '', '', ''],
          ['', '', '', ''],
          ['', '', '', ''],
          ['', '', '', ''],
          ['', '', '', ''],
        ],
        message:
          '6th-order polynomial → 4 columns. See how calculating columns 1, 2, and 3 of the s⁴ row works.',
        highlights: null,
      },
      {
        grid: [
          ['1', '3', '5', '7'],
          ['2', '4', '6', '0'],
          ['', '', '', ''],
          ['', '', '', ''],
          ['', '', '', ''],
          ['', '', '', ''],
          ['', '', '', ''],
        ],
        message:
          'Col 1: the "left" column is ALWAYS the first column of the array. The "right" column is the one directly above the target.',
        highlights: {
          pivot: [1, 0],
          topPivot: [0, 0],
          rightTop: [0, 1],
          rightBot: [1, 1],
          target: [2, 0],
        },
        formula: { a: '1', b: '3', c: '2', d: '4', result: '1' },
      },
      {
        grid: [
          ['1', '3', '5', '7'],
          ['2', '4', '6', '0'],
          ['1', '', '', ''],
          ['', '', '', ''],
          ['', '', '', ''],
          ['', '', '', ''],
          ['', '', '', ''],
        ],
        message:
          'Col 2: the left pivot column stays at column 1. The right column slides over one.',
        highlights: {
          pivot: [1, 0],
          topPivot: [0, 0],
          rightTop: [0, 2],
          rightBot: [1, 2],
          target: [2, 1],
        },
        formula: { a: '1', b: '5', c: '2', d: '6', result: '2' },
      },
      {
        grid: [
          ['1', '3', '5', '7'],
          ['2', '4', '6', '0'],
          ['1', '2', '', ''],
          ['', '', '', ''],
          ['', '', '', ''],
          ['', '', '', ''],
          ['', '', '', ''],
        ],
        message:
          'Col 3: left pivot column still stays at column 1. Right column slides again.',
        highlights: {
          pivot: [1, 0],
          topPivot: [0, 0],
          rightTop: [0, 3],
          rightBot: [1, 3],
          target: [2, 2],
        },
        formula: { a: '1', b: '7', c: '2', d: '0', result: '7' },
      },
      {
        grid: [
          ['1', '3', '5', '7'],
          ['2', '4', '6', '0'],
          ['1', '2', '7', '0'],
          ['', '', '', ''],
          ['', '', '', ''],
          ['', '', '', ''],
          ['', '', '', ''],
        ],
        message:
          'The pattern: leftmost column of the two rows above is ALWAYS the anchor. Pair it with the column directly above the target.',
        highlights: { pivot: [1, 0], topPivot: [0, 0] },
      },
    ],
  },
  unknownGain: {
    id: 'unknownGain',
    title: '5. Finding Gain K',
    equation: 's³ + 3s² + 2s + K = 0',
    steps: [
      {
        grid: [
          ['1', '2', '0'],
          ['3', 'K', '0'],
          ['', '', ''],
          ['', '', ''],
        ],
        message:
          'Most common exam question. Unknown controller gain K. Set up the array normally.',
        highlights: null,
      },
      {
        grid: [
          ['1', '2', '0'],
          ['3', 'K', '0'],
          ['', '', ''],
          ['', '', ''],
        ],
        message: 'Calculate the s¹ row exactly like numbers.',
        highlights: {
          pivot: [1, 0],
          topPivot: [0, 0],
          rightTop: [0, 1],
          rightBot: [1, 1],
          target: [2, 0],
        },
        formula: { a: '1', b: 'K', c: '3', d: '2', result: '(6-K)/3' },
      },
      {
        grid: [
          ['1', '2', '0'],
          ['3', 'K', '0'],
          ['(6-K)/3', '0', '0'],
          ['', '', ''],
        ],
        message: 'Drop K down to the s⁰ row — same cancellation trick.',
        highlights: {
          pivot: [2, 0],
          topPivot: [1, 0],
          rightTop: [1, 1],
          rightBot: [2, 1],
          target: [3, 0],
        },
        formula: { a: '3', b: 'K', c: '(6-K)/3', d: '0', result: 'K' },
      },
      {
        grid: [
          ['1', '2', '0'],
          ['3', 'K', '0'],
          ['(6-K)/3', '0', '0'],
          ['K', '0', '0'],
        ],
        message:
          'For stability every first-column entry must be > 0. 1 and 3 are already positive → two inequalities to solve.',
        highlights: { columnOne: true },
      },
      {
        grid: [
          ['1', '2', '0'],
          ['3', 'K', '0'],
          ['(6-K)/3', '0', '0'],
          ['K', '0', '0'],
        ],
        message: 'Inequality 1: (6-K)/3 > 0 → 6-K > 0 → K < 6.',
        highlights: { targetRow: 2, success: true },
      },
      {
        grid: [
          ['1', '2', '0'],
          ['3', 'K', '0'],
          ['(6-K)/3', '0', '0'],
          ['K', '0', '0'],
        ],
        message: 'Inequality 2: the bottom term gives K > 0.',
        highlights: { targetRow: 3, success: true },
      },
      {
        grid: [
          ['1', '2', '0'],
          ['3', 'K', '0'],
          ['(6-K)/3', '0', '0'],
          ['K', '0', '0'],
        ],
        message:
          'Combine → stable for 0 < K < 6. Outside this range, signs change and the system goes unstable.',
        highlights: { columnOne: true },
      },
    ],
  },
  relativeStability: {
    id: 'relativeStability',
    title: '6. Relative Stability',
    equation: 's³ + 6s² + 12s + 10 = 0',
    variable: 'z',
    steps: [
      {
        grid: [
          ['?', '?', '?'],
          ['?', '?', '?'],
          ['', '', ''],
          ['', '', ''],
        ],
        message:
          'Question: "Are all poles to the left of s = −1?" Standard Routh only checks left of 0 — shift the axis.',
        highlights: null,
      },
      {
        grid: [
          ['?', '?', '?'],
          ['?', '?', '?'],
          ['', '', ''],
          ['', '', ''],
        ],
        message:
          'Trick: substitute s = z − 1. If all "z" poles are left of 0, all original "s" poles are left of −1.',
        highlights: null,
      },
      {
        grid: [
          ['1', '3', '0'],
          ['3', '3', '0'],
          ['', '', ''],
          ['', '', ''],
        ],
        message:
          'Expanding (z-1)³ + 6(z-1)² + 12(z-1) + 10 = 0 → z³ + 3z² + 3z + 3 = 0.',
        highlights: null,
      },
      {
        grid: [
          ['1', '3', '0'],
          ['3', '3', '0'],
          ['', '', ''],
          ['', '', ''],
        ],
        message: 'Cross-multiply to find the z¹ row.',
        highlights: {
          pivot: [1, 0],
          topPivot: [0, 0],
          rightTop: [0, 1],
          rightBot: [1, 1],
          target: [2, 0],
        },
        formula: { a: '1', b: '3', c: '3', d: '3', result: '2' },
      },
      {
        grid: [
          ['1', '3', '0'],
          ['3', '3', '0'],
          ['2', '0', '0'],
          ['', '', ''],
        ],
        message: 'Final constant drops to the z⁰ row.',
        highlights: {
          pivot: [2, 0],
          topPivot: [1, 0],
          rightTop: [1, 1],
          rightBot: [2, 1],
          target: [3, 0],
        },
        formula: { a: '3', b: '0', c: '2', d: '3', result: '3' },
      },
      {
        grid: [
          ['1', '3', '0'],
          ['3', '3', '0'],
          ['2', '0', '0'],
          ['3', '0', '0'],
        ],
        message:
          'First column (1, 3, 2, 3) — no sign changes. All original "s" poles lie strictly left of s = −1.',
        highlights: { columnOne: true },
      },
    ],
  },
};
