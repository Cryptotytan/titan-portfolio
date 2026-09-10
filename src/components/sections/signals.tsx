import { SIGNALS } from "@/lib/site-data";
import { Reveal } from "@/components/reveal";

const PRIMARY = SIGNALS.slice(0, 4);
const SECONDARY = SIGNALS.slice(4);

export function Signals() {
  return (
    <section aria-label="Highlights" className="relative pt-4 sm:pt-8">
      <div className="shell-page">
        <Reveal>
          <div className="overflow-hidden rounded-2xl bg-border">
            <div className="grid grid-cols-2 gap-px md:grid-cols-4">
              {PRIMARY.map((item) => (
                <div key={item.label} className="flex flex-col gap-2 bg-surface/80 px-5 py-7 sm:px-8">
                  <p className="font-display text-3xl font-semibold tracking-tight text-fg tabular-nums sm:text-4xl">
                    {item.value}
                  </p>
                  <p className="max-w-48 text-sm leading-snug text-muted">{item.label}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 gap-px border-t border-border sm:grid-cols-3">
              {SECONDARY.map((item) => (
                <div key={item.label} className="flex flex-col gap-2 bg-surface/80 px-5 py-7 sm:px-8">
                  <p className="font-display text-3xl font-semibold tracking-tight text-fg tabular-nums sm:text-4xl">
                    {item.value}
                  </p>
                  <p className="max-w-48 text-sm leading-snug text-muted">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
