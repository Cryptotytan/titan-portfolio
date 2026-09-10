import { ArrowUpRight } from "lucide-react";
import { SITE } from "@/lib/site-data";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";

const CHANNELS = [
  { label: "X / Twitter", href: SITE.links.x, handle: "@crypto_tytn" },
  { label: "LinkedIn", href: SITE.links.linkedin, handle: "stephenig" },
  { label: "GitHub", href: SITE.links.github, handle: "Cryptotytan" },
  { label: "Dune", href: SITE.links.dune, handle: "cryptotitan" },
  { label: "Telegram", href: SITE.links.telegram, handle: "@cryptotytnn" },
  { label: "TikTok", href: SITE.links.tiktok, handle: "@promptedbytitan" },
] as const;

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 py-20 sm:py-28">
      <div className="shell-page">
        <Reveal>
          <p className="font-sans text-caption uppercase tracking-kicker text-accent">07 · Alignment</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight text-fg sm:text-5xl">Building a community, a dashboard, or a campaign?</h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">Open to community leadership, partnership work, on-chain analytics, and AI video production. The fastest path is X or LinkedIn.</p>
        </Reveal>
        <Reveal delay={80} className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg"><a href={SITE.links.x} target="_blank" rel="noreferrer">Message Titan on X<ArrowUpRight className="size-4" /></a></Button>
          <Button asChild variant="ghost" size="lg"><a href={SITE.links.linkedin} target="_blank" rel="noreferrer">LinkedIn<ArrowUpRight className="size-4" /></a></Button>
        </Reveal>
        <Reveal delay={140}>
          <ul className="mt-12 divide-y divide-border overflow-hidden rounded-2xl bg-surface/80 shadow-border">
            {CHANNELS.map((channel) => (
              <li key={channel.label}>
                <a href={channel.href} target="_blank" rel="noreferrer" className="flex min-h-14 items-center justify-between gap-4 px-5 py-3 text-sm transition-[background-color] duration-200 hover:bg-elevated sm:px-6">
                  <span className="text-muted">{channel.label}</span>
                  <span className="flex items-center gap-2 font-sans text-xs tracking-wide text-fg sm:text-sm">{channel.handle}<ArrowUpRight className="size-3.5 text-subtle" /></span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
