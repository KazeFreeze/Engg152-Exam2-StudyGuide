import { useMemo } from 'react';
import katex from 'katex';

interface MathProps {
  readonly tex: string;
  readonly display?: boolean;
}

export function Math({ tex, display = false }: MathProps): JSXEl {
  const html = useMemo(
    () =>
      katex.renderToString(tex, {
        displayMode: display,
        throwOnError: false,
        strict: 'ignore',
        output: 'html',
      }),
    [tex, display],
  );

  return (
    <span
      className={display ? 'block my-2' : 'inline'}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
