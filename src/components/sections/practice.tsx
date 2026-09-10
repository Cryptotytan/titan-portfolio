import { PRACTICES } from "@/lib/site-data";
import { Reveal } from "@/components/reveal";

export function Practice() {
  return (
    <section id="practice" className="scroll-mt-24 py-20 sm:py-28">
      <div className="shell-page">
        <Reveal className="max-w-2xl">
          <p className="font-sans text-caption uppercase tracking-kicker text-accent">04 · Elements</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-fg sm:text-5xl">Four ways the work shows up</h2>
          <p className="mt-4 text-base leading-relaxed text-muted">Systems first, then the people and the numbers that prove the system is working.</p>
        </Reveal>
        <div className="mt-12 grid gap-3 sm:grid-cols-2">
          {PRACTICES.map((item, i) => (
            <Reveal key={item.id} delay={i * 90}>
              <article className="flex h-full flex-col rounded-2xl bg-surface/80 p-6 shadow-border transition-[box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-glow sm:p-8">
                <p className="font-sans text-caption text-subtle">{item.index}</p>
                <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-fg">{item.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{item.body}</p>
                <ul className="mt-6 space-y-2 border-t border-border pt-5">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-fg/90">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
