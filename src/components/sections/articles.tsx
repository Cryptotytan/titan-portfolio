import { ArrowUpRight } from "lucide-react";
import { ARTICLES } from "@/lib/site-data";
import { Reveal } from "@/components/reveal";

export function Articles() {
  return (
    <section id="writing" className="scroll-mt-24 py-20 sm:py-28">
      <div className="shell-page">
        <Reveal className="max-w-2xl">
          <p className="font-sans text-caption uppercase tracking-kicker text-accent">03 · Dispatches</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-fg sm:text-5xl">Articles</h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">Long-form on X — DeFi onboarding, infrastructure, and the people the stack was supposed to serve.</p>
        </Reveal>
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ARTICLES.map((item) => (
            <a key={item.id} href={item.href} target="_blank" rel="noreferrer" className="group flex h-full flex-col overflow-hidden rounded-2xl bg-surface/80 shadow-border transition-[box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-glow">
              <div className="relative aspect-[16/10] overflow-hidden bg-elevated">
                <img src={item.image} alt="" className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]" />
                <span className="absolute inset-0 bg-gradient-to-t from-bg/55 to-transparent" />
              </div>
              <div className="flex items-start justify-between gap-3 p-5">
                <div>
                  <p className="font-sans text-micro uppercase tracking-wider text-accent">Article</p>
                  <h3 className="mt-1 font-display text-lg font-semibold tracking-tight text-fg">{item.title}</h3>
                </div>
                <ArrowUpRight className="mt-1 size-4 shrink-0 text-muted transition-[color,transform] duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
