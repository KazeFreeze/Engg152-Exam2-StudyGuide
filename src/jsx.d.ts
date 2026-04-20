import type { ReactElement } from 'react';

declare global {
  // Project-local alias so components can declare return type `JSXEl`
  // without using the deprecated global `JSX.Element` or pulling `React.JSX`
  // into every file. Equivalent to `React.JSX.Element` / `ReactElement`.
  type JSXEl = ReactElement;
}

export {};
