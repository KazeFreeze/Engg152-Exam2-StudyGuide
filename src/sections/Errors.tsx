import { Card } from '../components/Card';
import { Collapsible } from '../components/Collapsible';
import { Math } from '../components/Math';

export function Errors(): JSXEl {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-slate-50">
          🎯 Steady-State Error
        </h1>
        <p className="mt-2 text-slate-300">
          How far off is the output from the input after a long time? This is
          Nise Chapter 7. For the exam the critical sections are §7.2–7.3
          (unity feedback + system type) and <strong>§7.5</strong>{' '}
          (disturbances — the lab 3 shape).
        </p>
      </header>

      <Card title="The one tool: Final Value Theorem" tone="info">
        <Math display tex="e(\infty) = \lim_{s \to 0} s\,E(s)" />
        <p className="text-sm text-slate-400">
          Valid only when <Math tex="sE(s)" /> has all poles in the LHP (i.e.,
          the closed-loop is stable). <strong>Check stability first.</strong>
        </p>
      </Card>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-100">
          Unity feedback — the error formula
        </h2>
        <Card>
          <p>
            For unity negative feedback with forward path <Math tex="G(s)" />:
          </p>
          <Math display tex="E(s) = \dfrac{1}{1 + G(s)}\,R(s)" />
          <Math display tex="e(\infty) = \lim_{s \to 0} \dfrac{s R(s)}{1 + G(s)}" />
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-100">
          Static error constants + system type
        </h2>
        <Card>
          <p>
            System <strong>type</strong> = number of pure integrators (poles at{' '}
            <Math tex="s=0" />) in the forward path{' '}
            <Math tex="G(s)" />.
          </p>
          <div className="mt-3 overflow-x-auto">
            <table className="min-w-full text-sm border border-slate-700">
              <thead className="bg-slate-800 text-slate-200">
                <tr>
                  <th className="px-3 py-2 text-left">Constant</th>
                  <th className="px-3 py-2 text-left">Definition</th>
                  <th className="px-3 py-2 text-left">For input</th>
                </tr>
              </thead>
              <tbody className="[&>tr]:border-t [&>tr]:border-slate-700">
                <tr>
                  <td className="px-3 py-2">
                    <Math tex="K_p" /> (position)
                  </td>
                  <td className="px-3 py-2">
                    <Math tex="\lim_{s \to 0} G(s)" />
                  </td>
                  <td className="px-3 py-2">Step</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">
                    <Math tex="K_v" /> (velocity)
                  </td>
                  <td className="px-3 py-2">
                    <Math tex="\lim_{s \to 0} s\,G(s)" />
                  </td>
                  <td className="px-3 py-2">Ramp</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">
                    <Math tex="K_a" /> (accel)
                  </td>
                  <td className="px-3 py-2">
                    <Math tex="\lim_{s \to 0} s^2 G(s)" />
                  </td>
                  <td className="px-3 py-2">Parabola</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        <Card tone="success" title="Table 7.2 — error by input and type">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-slate-300">
                <tr>
                  <th className="px-3 py-2 text-left">Input</th>
                  <th className="px-3 py-2 text-left">Type 0</th>
                  <th className="px-3 py-2 text-left">Type 1</th>
                  <th className="px-3 py-2 text-left">Type 2</th>
                </tr>
              </thead>
              <tbody className="[&>tr]:border-t [&>tr]:border-slate-800">
                <tr>
                  <td className="px-3 py-2">Step <Math tex="1/s" /></td>
                  <td className="px-3 py-2"><Math tex="\dfrac{1}{1+K_p}" /></td>
                  <td className="px-3 py-2 text-emerald-300">0</td>
                  <td className="px-3 py-2 text-emerald-300">0</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Ramp <Math tex="1/s^2" /></td>
                  <td className="px-3 py-2 text-rose-300">∞</td>
                  <td className="px-3 py-2"><Math tex="1/K_v" /></td>
                  <td className="px-3 py-2 text-emerald-300">0</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Parabola <Math tex="1/s^3" /></td>
                  <td className="px-3 py-2 text-rose-300">∞</td>
                  <td className="px-3 py-2 text-rose-300">∞</td>
                  <td className="px-3 py-2"><Math tex="1/K_a" /></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-slate-400 mt-2">
            Rule of thumb: to track a ramp with finite error you need ≥ 1
            integrator; to track a parabola with finite error you need ≥ 2.
          </p>
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-100">
          §7.5 — disturbances (the lab 3 setup)
        </h2>
        <Card tone="warn">
          <p>
            Disturbance <Math tex="D(s)" /> injected <em>between</em>{' '}
            controller <Math tex="G_1" /> and plant <Math tex="G_2" />:
          </p>
          <Math
            display
            tex="E(s) = \dfrac{1}{1 + G_1 G_2}\,R(s) \;-\; \dfrac{G_2}{1 + G_1 G_2}\,D(s)"
          />
          <p className="mt-2">
            Apply FVT → the total steady-state error splits by superposition:
          </p>
          <Math display tex="e(\infty) = e_R(\infty) \;-\; e_D(\infty)" />
          <p className="text-sm text-slate-400 mt-2">
            The reference-input part is computed exactly like §7.2–7.3. The
            disturbance part needs its own formula ↓.
          </p>
        </Card>

        <Card tone="info" title="Step disturbance closed form">
          <Math
            display
            tex="e_D(\infty) = -\,\dfrac{1}{\frac{1}{\lim_{s \to 0} G_2(s)} + \lim_{s \to 0} G_1(s)}"
          />
          <p className="text-sm text-slate-300 mt-2">
            Practical shortcut: if <Math tex="G_2" /> has a pole at the origin,
            then <Math tex="\lim G_2 = \infty" /> and{' '}
            <Math tex="1/\lim G_2 = 0" />, so the formula collapses to:
          </p>
          <Math display tex="e_D(\infty) = -\,\dfrac{1}{\lim_{s \to 0} G_1(s)}" />
          <p className="text-sm text-slate-400 mt-2">
            Design insight from Nise: reduce disturbance error by increasing
            <Math tex="\;G_1" /> DC gain or decreasing <Math tex="\;G_2" /> DC
            gain.
          </p>
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-100">
          Worked: exactly the lab 3 / exam problem
        </h2>
        <Card>
          <p className="text-sm text-slate-300">Given</p>
          <Math display tex="G_1(s) = \dfrac{K_1(s+2)}{s+3}, \qquad G_2(s) = \dfrac{K_2}{s(s+4)}" />
          <p className="text-sm text-slate-300 mt-2">Specs</p>
          <ul className="list-disc pl-5 text-sm text-slate-300">
            <li>
              Step-disturbance error <Math tex="e_D(\infty) = -0.000012" />
            </li>
            <li>
              Unit-ramp reference error <Math tex="e_R(\infty) = 0.003" />
            </li>
          </ul>
        </Card>

        <Collapsible label="Step 1 — Determine system type of G1·G2" defaultOpen>
          <Math
            display
            tex="G_1(s)G_2(s) = \dfrac{K_1 K_2 (s+2)}{s(s+3)(s+4)}"
          />
          <p>
            One pole at the origin → <strong>Type 1</strong>. Finite error for
            a ramp, governed by <Math tex="K_v" />.
          </p>
        </Collapsible>

        <Collapsible label="Step 2 — Ramp-error condition fixes K₁K₂">
          <Math
            display
            tex="K_v = \lim_{s \to 0} s\,G_1 G_2 = \lim_{s \to 0} \dfrac{K_1 K_2 (s+2)}{(s+3)(s+4)} = \dfrac{2 K_1 K_2}{12} = \dfrac{K_1 K_2}{6}"
          />
          <Math
            display
            tex="e_R(\infty) = \dfrac{1}{K_v} = \dfrac{6}{K_1 K_2} = 0.003 \;\Rightarrow\; K_1 K_2 = 2000"
          />
        </Collapsible>

        <Collapsible label="Step 3 — Disturbance-error condition fixes K₁">
          <p>
            <Math tex="\lim_{s \to 0} G_2(s) = K_2/(0\cdot 4) = \infty" /> →{' '}
            <Math tex="1/\lim G_2 = 0" />.
          </p>
          <p>
            <Math tex="\lim_{s \to 0} G_1(s) = 2K_1/3" />.
          </p>
          <Math
            display
            tex="e_D(\infty) = -\dfrac{1}{0 + \tfrac{2K_1}{3}} = -\dfrac{3}{2K_1} = -0.000012"
          />
          <Math display tex="\Rightarrow K_1 = 125{,}000" />
        </Collapsible>

        <Collapsible label="Step 4 — Solve for K₂ and verify">
          <Math
            display
            tex="K_2 = \dfrac{2000}{K_1} = \dfrac{2000}{125{,}000} = 0.016"
          />
          <p className="text-sm text-slate-300">Verification:</p>
          <ul className="list-disc pl-5 text-sm text-slate-300">
            <li>
              <Math tex="K_v = (125{,}000)(0.016)/6 \approx 333.33" /> →{' '}
              <Math tex="e_R = 1/333.33 = 0.003" /> ✓
            </li>
            <li>
              <Math tex="e_D = -3/(2\cdot 125{,}000) = -0.000012" /> ✓
            </li>
          </ul>
          <div className="mt-3 p-3 bg-emerald-950/60 border border-emerald-700 rounded">
            <Math display tex="\boxed{K_1 = 125{,}000, \qquad K_2 = 0.016}" />
          </div>
        </Collapsible>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-100">
          Exam checklist — error problems
        </h2>
        <Card tone="success">
          <ol className="list-decimal pl-5 space-y-1">
            <li>Verify the closed-loop is stable (FVT requirement).</li>
            <li>Identify system type (count poles of <Math tex="G" /> or <Math tex="G_1 G_2" /> at the origin).</li>
            <li>
              Look at the input: step → <Math tex="K_p" />, ramp → <Math tex="K_v" />, parabola → <Math tex="K_a" />.
            </li>
            <li>Compute the relevant limit.</li>
            <li>
              If there's a <strong>disturbance</strong>, compute{' '}
              <Math tex="e_D(\infty)" /> separately and subtract.
            </li>
            <li>
              For design problems (solve for K): each spec gives one equation.
              Two specs → two unknowns → solve the system.
            </li>
          </ol>
        </Card>
      </section>
    </div>
  );
}
