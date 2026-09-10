import { SITE } from "@/lib/site-data";
import { TitanMark } from "@/components/titan-mark";

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-border py-8">
      <div className="shell-page flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5 text-muted">
          <TitanMark className="size-5 text-accent" />
          <p className="font-display text-base font-semibold uppercase tracking-display text-fg">
            {SITE.brand}
          </p>
        </div>
        <p className="text-xs text-subtle">Community · Data · Story — in orbit</p>
      </div>
    </footer>
  );
}
