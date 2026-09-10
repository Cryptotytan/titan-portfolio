import { ArrowDown } from "lucide-react";
import { SITE } from "@/lib/site-data";
import { Button } from "@/components/ui/button";
import { Orrery } from "@/components/orrery";

export function Hero() {
  return (
    <section
      id="top"
      className="hero relative isolate flex min-h-dvh flex-col justify-center overflow-x-hidden"
    >
      <img
        src="/images/cosmos-field.jpg"
        alt=""
        className="pointer-events-none absolute inset-0 size-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-bg/20 via-bg/55 to-bg" />
      <div className="shell-page relative grid items-center gap-8 pb-16 pt-28 lg:grid-cols-[0.82fr_1.18fr] lg:gap-6 lg:pb-16 lg:pt-20">
        <div>
          <h1 className="hero-line mt-4 font-display text-hero font-semibold uppercase leading-[0.9] tracking-display text-fg">
            {SITE.name}
          </h1>
          <p className="hero-line mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">
            {SITE.role}
          </p>
          <div className="hero-line mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <a href="#work">
                Enter the system
                <ArrowDown className="size-4" />
              </a>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <a href="#contact">Align with Titan</a>
            </Button>
          </div>
        </div>
        <div className="relative hidden min-w-0 md:block">
          <Orrery />
          <p className="mt-3 text-center font-sans text-micro uppercase tracking-kicker text-subtle">
            Tap a planet to inspect
          </p>
        </div>
      </div>
    </section>
  );
}
