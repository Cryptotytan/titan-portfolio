import { useRef, useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import { VIDEOS } from "@/lib/site-data";
import { Reveal } from "@/components/reveal";

function VideoCard({ item }: { item: (typeof VIDEOS)[number] }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [on, setOn] = useState(false);
  const start = () => {
    const el = videoRef.current;
    setOn(true);
    if (!el) return;
    el.muted = true;
    el.playsInline = true;
    void el.play().catch(() => {});
  };
  const end = () => {
    const el = videoRef.current;
    setOn(false);
    if (!el) return;
    el.pause();
    el.currentTime = 0;
  };
  return (
    <a href={item.href} target="_blank" rel="noreferrer" className="group flex h-full flex-col overflow-hidden rounded-2xl bg-surface/80 shadow-border transition-[box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-glow" onMouseEnter={start} onMouseLeave={end}>
      <div className="relative aspect-video overflow-hidden bg-elevated">
        <img src={item.image} alt="" className="size-full object-cover" style={{ opacity: on ? 0 : 1 }} />
        <video ref={videoRef} src={item.clip} muted loop playsInline preload="metadata" poster={item.image} className="pointer-events-none absolute inset-0 size-full object-cover" style={{ opacity: on ? 1 : 0 }} />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/50 to-transparent" />
        <span className="pointer-events-none absolute left-1/2 top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-fg/90 text-accent-fg shadow-glow" style={{ opacity: on ? 0 : 1 }}>
          <Play className="size-5 fill-current" />
        </span>
      </div>
      <div className="flex items-center justify-between gap-3 p-5">
        <h3 className="font-display text-lg font-semibold tracking-tight text-fg">{item.title}</h3>
        <ArrowUpRight className="size-4 shrink-0 text-muted transition-[color,transform] duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg" />
      </div>
    </a>
  );
}

export function Videos() {
  return (
    <section id="videos" className="scroll-mt-24 py-20 sm:py-28">
      <div className="shell-page">
        <Reveal className="max-w-2xl">
          <p className="font-sans text-caption uppercase tracking-kicker text-accent">02 · Reels</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-fg sm:text-5xl">AI Videos</h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">Short films, campaign pieces, and contest entries — written, directed, and produced by Titan.</p>
        </Reveal>
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {VIDEOS.map((item) => (
            <VideoCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
