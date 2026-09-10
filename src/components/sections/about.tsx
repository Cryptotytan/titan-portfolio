import { SKILL_GROUPS, TOOLS } from "@/lib/site-data";
import { Reveal } from "@/components/reveal";

export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-20 sm:py-28">
      <div className="shell-page">
        <Reveal className="max-w-3xl">
          <p className="font-sans text-caption uppercase tracking-kicker text-accent">06 · Origin</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-fg sm:text-5xl">Operator in public.</h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
            <p>Titan has led and built communities for protocol, gaming, and DAO teams; sourced and shipped partnerships across NFT and token projects; and published on-chain dashboards that Dune recognized inside Katana and Plume. Parallel to that, Titan writes and produces AI-generated video for campaigns and story.</p>
            <p>The through-line is translation — taking something technical or half-formed and making it something a community can live inside.</p>
          </div>
          <dl className="mt-8 border-t border-border pt-6">
            <div>
              <dt className="font-sans text-micro uppercase tracking-wider text-subtle">Languages</dt>
              <dd className="mt-1 text-sm text-fg">English<br /><span className="text-muted">Professional</span></dd>
            </div>
          </dl>
        </Reveal>
        <Reveal className="mt-16">
          <h3 className="font-display text-2xl font-semibold tracking-tight text-fg">Instruments</h3>
          <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {SKILL_GROUPS.map((group) => (
              <div key={group.title}>
                <p className="font-sans text-micro uppercase tracking-wider text-accent">{group.title}</p>
                <ul className="mt-3 space-y-2">{group.items.map((item) => (<li key={item} className="text-sm text-muted">{item}</li>))}</ul>
              </div>
            ))}
          </div>
          <p className="mt-10 text-xs uppercase tracking-widest text-subtle">Tools</p>
          <p className="mt-2 text-sm text-muted">{TOOLS.join(" · ")}</p>
        </Reveal>
      </div>
    </section>
  );
}
