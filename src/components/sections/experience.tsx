import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { ROLE_FILTERS, ROLES, type RoleKind } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/reveal";

export function Experience() {
  const [filter, setFilter] = useState<"all" | RoleKind>("all");
  const [openId, setOpenId] = useState<string>(ROLES[0]?.id ?? "");
  const visible = filter === "all" ? ROLES : ROLES.filter((role) => role.kind === filter);
  return (
    <section id="experience" className="scroll-mt-24 py-20 sm:py-28">
      <div className="shell-page">
        <Reveal className="max-w-2xl">
          <p className="font-sans text-caption uppercase tracking-kicker text-accent">05 · Orbits</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-fg sm:text-5xl">Roles across the stack</h2>
          <p className="mt-4 text-base leading-relaxed text-muted">Protocol, gaming, NFT, DAO, and analytics — Titan holding the room, the partners, and the numbers.</p>
        </Reveal>
        <div className="mt-8 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Filter experience">
          {ROLE_FILTERS.map((item) => {
            const selected = filter === item.id;
            return (
              <button key={item.id} type="button" role="tab" aria-selected={selected} onClick={() => setFilter(item.id)} className={cn("h-10 shrink-0 rounded-full px-4 text-sm", selected ? "bg-fg text-accent-fg" : "text-muted shadow-border hover:text-fg")}>
                {item.label}
              </button>
            );
          })}
        </div>
        <ol className="mt-8 divide-y divide-border overflow-hidden rounded-2xl bg-surface/80 shadow-border">
          {visible.map((role) => {
            const open = openId === role.id;
            return (
              <li key={role.id}>
                <button type="button" aria-expanded={open} onClick={() => setOpenId(open ? "" : role.id)} className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left sm:px-6">
                  <span>
                    <span className="block font-display text-lg font-semibold tracking-tight text-fg">{role.title}</span>
                    <span className="mt-1 block text-sm text-muted">{role.org}<span className="text-subtle"> · {role.context}</span></span>
                  </span>
                  <ChevronDown className={cn("mt-1 size-5 shrink-0 text-muted transition-transform", open && "rotate-180")} />
                </button>
                <div className={cn("grid transition-[grid-template-rows,opacity] duration-200", open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                  <div className="overflow-hidden">
                    <ul className="space-y-2 px-5 pb-6 sm:px-6">
                      {role.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-muted"><span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />{bullet}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
