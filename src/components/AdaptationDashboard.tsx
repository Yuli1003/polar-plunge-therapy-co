/**
 * Sample per-client adaptation dashboard. client:visible — hydrates on scroll.
 * Real-recording style: straight segments between actual weekly readings with
 * irregular jitter and a marked point per reading — a trend you read through the
 * noise, not a smoothed decorative wave. Thin and muted to stay in the calm set.
 */

// 16 readings across the 8-week program (≈2×/week). Irregular noise, clear trend.
const restingHR = [62, 63, 61, 60, 61, 59, 60, 58, 59, 57, 58, 57, 59, 57, 58, 58];
const hrv =       [54, 53, 55, 57, 56, 58, 57, 60, 59, 61, 60, 63, 62, 64, 63, 65];
const recovery =  [5, 5, 4, 6, 5, 6, 7, 6, 7, 7, 8, 7, 8, 8, 8, 8];
const adherence = [80, 84, 82, 87, 86, 90, 89, 91, 90, 92, 93, 92, 94, 93, 95, 94];

function points(values: number[], w: number, h: number, padX: number, padY: number) {
  const min = Math.min(...values), max = Math.max(...values), span = max - min || 1;
  const stepX = (w - padX * 2) / (values.length - 1);
  return values.map((v, i) => ({ x: padX + i * stepX, y: padY + (h - padY * 2) * (1 - (v - min) / span) }));
}
const line = (p: { x: number; y: number }[]) =>
  p.map((q, i) => `${i === 0 ? "M" : "L"}${q.x.toFixed(1)},${q.y.toFixed(1)}`).join(" ");

function Metric({ label, value, unit, delta, values, start, end }: {
  label: string; value: string; unit: string; delta: string; values: number[]; start: string; end: string;
}) {
  const W = 320, H = 96, padX = 4, padY = 12;
  const p = points(values, W, H, padX, padY);
  const last = p[p.length - 1];
  return (
    <div className="border-t border-line pt-6">
      <p className="metric-label">{label}</p>
      <p className="mt-4 flex items-baseline gap-1.5">
        <span className="font-display text-5xl tabular-nums">{value}</span>
        <span className="metric-unit text-sm text-ink-faint">{unit}</span>
      </p>
      <p className="annot mt-1.5">{delta}</p>
      <svg viewBox={`0 0 ${W} ${H}`} className="mt-6 w-full" preserveAspectRatio="none"
        role="img" aria-label={`${label}: ${start} at week one, ${end} at week eight`}>
        <path d={line(p)} fill="none" stroke="var(--color-mist)" strokeWidth={1} vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
        {p.map((q, i) => (
          <circle key={i} cx={q.x} cy={q.y} r={i === p.length - 1 ? 2.6 : 1.4}
            fill={i === p.length - 1 ? "var(--color-ink)" : "var(--color-mist)"} />
        ))}
      </svg>
      <div className="mt-3 flex justify-between">
        <span className="annot">Wk 1 · {start}</span>
        <span className="annot">Wk 8 · {end}</span>
      </div>
    </div>
  );
}

export default function AdaptationDashboard() {
  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line pb-4">
        <p className="font-display text-2xl">Sample client</p>
        <p className="metric-label">Week 6 of 8 · supervised program</p>
      </div>

      <div className="mt-10 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        <Metric label="Resting heart rate" value="58" unit="bpm" delta="↓ 4 bpm since week 1" values={restingHR} start="62" end="58" />
        <Metric label="Heart-rate variability" value="65" unit="ms" delta="↑ 11 ms since week 1" values={hrv} start="54" end="65" />
        <Metric label="Perceived recovery" value="8" unit="/ 10" delta="↑ 3 since week 1" values={recovery} start="5" end="8" />
        <Metric label="Adherence" value="94" unit="%" delta="17 of 18 sessions" values={adherence} start="80" end="94" />
      </div>

      <p className="mt-14 max-w-prose text-ink-soft">
        Illustrative data for a sample client — readings taken twice a week across the
        eight-week program. Your own dashboard tracks the same metrics: your trend
        line, not a testimonial.
      </p>
    </div>
  );
}
