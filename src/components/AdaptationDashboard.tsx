/**
 * Sample per-client adaptation dashboard. client:visible — only hydrates when
 * the data section scrolls into view (per spec hydration plan).
 * Pure inline SVG; no charting library. Mock data for a sample client.
 */

const WEEKS = [1, 2, 3, 4, 5, 6, 7, 8];

// Mock client trends across the 8-week program.
const restingHR = [62, 61, 61, 60, 59, 59, 58, 58];
const hrv = [54, 55, 57, 58, 61, 63, 64, 65];
const tempC = [12, 11, 10, 9, 8, 7, 6, 5];
const recovery = [5, 5, 6, 6, 7, 8, 8, 8];

function linePath(values: number[], w: number, h: number, pad = 6) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const stepX = (w - pad * 2) / (values.length - 1);
  return values
    .map((v, i) => {
      const x = pad + i * stepX;
      const y = pad + (h - pad * 2) * (1 - (v - min) / span);
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

function Sparkline({ values, up }: { values: number[]; up: boolean }) {
  return (
    <svg
      viewBox="0 0 100 28"
      className="h-7 w-full"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d={linePath(values, 100, 28, 2)}
        fill="none"
        stroke={up ? "var(--color-accent)" : "var(--color-text)"}
        strokeWidth={1.5}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function StatCard({
  label,
  value,
  unit,
  delta,
  values,
  up,
}: {
  label: string;
  value: string;
  unit: string;
  delta: string;
  values: number[];
  up: boolean;
}) {
  return (
    <div className="border-t border-line pt-5">
      <p className="metric-label">{label}</p>
      <p className="mt-4 flex items-baseline gap-1.5">
        <span className="font-display text-5xl tabular-nums">{value}</span>
        <span className="metric-unit text-sm text-ink-faint">{unit}</span>
      </p>
      <p className="annot mt-1.5">{delta}</p>
      <div className="mt-5">
        <Sparkline values={values} up={up} />
      </div>
    </div>
  );
}

function TrendChart({
  title,
  values,
  unit,
  domain,
}: {
  title: string;
  values: number[];
  unit: string;
  domain: string;
}) {
  const W = 320;
  const H = 140;
  const min = Math.min(...values);
  const max = Math.max(...values);
  return (
    <figure className="border-t border-line pt-5">
      <figcaption className="mb-1 flex items-baseline justify-between">
        <span className="metric-label">{title}</span>
        <span className="text-xs text-text-muted">{domain}</span>
      </figcaption>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mt-3 w-full"
        role="img"
        aria-label={`${title}: from ${values[0]} to ${values[values.length - 1]} ${unit} across eight weeks`}
      >
        {/* hairline gridlines */}
        {[0.25, 0.5, 0.75].map((g) => (
          <line
            key={g}
            x1={6}
            x2={W - 6}
            y1={6 + (H - 12) * g}
            y2={6 + (H - 12) * g}
            stroke="var(--color-border)"
            strokeWidth={1}
          />
        ))}
        <path
          d={linePath(values, W, H, 8)}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
        />
        {values.map((v, i) => {
          const stepX = (W - 16) / (values.length - 1);
          const span = max - min || 1;
          const x = 8 + i * stepX;
          const y = 8 + (H - 16) * (1 - (v - min) / span);
          return <circle key={i} cx={x} cy={y} r={2.5} fill="var(--color-text)" />;
        })}
      </svg>
      <div className="mt-2 flex justify-between text-[0.65rem] text-text-muted">
        <span>Wk 1</span>
        <span>Wk 8</span>
      </div>
    </figure>
  );
}

export default function AdaptationDashboard() {
  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-border pb-4">
        <p className="font-display text-xl font-semibold">Sample client</p>
        <p className="metric-label">Week 6 of 8 · supervised program</p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Resting heart rate"
          value="58"
          unit="bpm"
          delta="↓ 4 bpm since week 1"
          values={restingHR}
          up={false}
        />
        <StatCard
          label="HRV"
          value="65"
          unit="ms"
          delta="↑ 11 ms since week 1"
          values={hrv}
          up
        />
        <StatCard
          label="Perceived recovery"
          value="8"
          unit="/ 10"
          delta="↑ 3 since week 1"
          values={recovery}
          up
        />
        <StatCard
          label="Adherence"
          value="94"
          unit="%"
          delta="17 of 18 sessions"
          values={[80, 85, 88, 90, 92, 93, 94, 94]}
          up
        />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <TrendChart title="Resting heart rate" values={restingHR} unit="bpm" domain="62 → 58 bpm" />
        <TrendChart title="Heart-rate variability" values={hrv} unit="ms" domain="54 → 65 ms" />
        <TrendChart title="Immersion temperature" values={tempC} unit="°C" domain="12 → 5 °C" />
      </div>

      <p className="mt-6 max-w-prose text-sm text-text-muted">
        Illustrative data for a sample client. Your own dashboard tracks the same
        metrics — your trend line, not a testimonial.
      </p>
    </div>
  );
}
