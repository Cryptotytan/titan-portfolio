import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { SYSTEM_BODIES, type SystemBodyId } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { PlanetInspect } from "@/components/planet-inspect";

const ORBIT: Record<Exclude<SystemBodyId, "sun">, { r: number; s: number; speed: number; phase: number }> = {
  work: { r: 1.55, s: 0.18, speed: 0.52, phase: 0.5 },
  videos: { r: 2.15, s: 0.24, speed: 0.36, phase: 1.9 },
  practice: { r: 2.75, s: 0.26, speed: 0.26, phase: 3.3 },
  experience: { r: 3.4, s: 0.22, speed: 0.2, phase: 4.6 },
  about: { r: 4.15, s: 0.4, speed: 0.13, phase: 5.6 },
  contact: { r: 4.95, s: 0.34, speed: 0.09, phase: 0.35 },
};

const MAP: Record<SystemBodyId, string> = {
  sun: "/images/planets/maps/sun.jpg",
  work: "/images/planets/maps/mercury.jpg",
  videos: "/images/planets/maps/venus.jpg",
  practice: "/images/planets/maps/earth.jpg",
  experience: "/images/planets/maps/mars.jpg",
  about: "/images/planets/maps/jupiter.jpg",
  contact: "/images/planets/maps/saturn.jpg",
};

export function Orrery({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [activeId, setActiveId] = useState<SystemBodyId | null>(null);
  const [hot, setHot] = useState<SystemBodyId | null>(null);
  const active = SYSTEM_BODIES.find((body) => body.id === activeId) ?? null;

  useEffect(() => {
    const node = hostRef.current;
    if (!node) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 60);
    camera.position.set(0, 8.4, 18.6);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.45;
    node.appendChild(renderer.domElement);
    const root = new THREE.Group();
    scene.add(root);
    scene.add(new THREE.AmbientLight(0xb7c4d8, 0.62));
    scene.add(new THREE.HemisphereLight(0xffe6c4, 0x243044, 0.4));
    root.add(new THREE.PointLight(0xffe2a8, 90, 40, 1.15));
    const loader = new THREE.TextureLoader();
    const sphereHi = new THREE.SphereGeometry(1, 64, 48);
    const sphereLo = new THREE.SphereGeometry(1, 48, 32);
    const planets: { id: SystemBodyId; mesh: THREE.Mesh; r: number; speed: number; phase: number; base: number }[] = [];
    for (const body of SYSTEM_BODIES) {
      const scale = body.star ? 0.7 : ORBIT[body.id as Exclude<SystemBodyId, "sun">].s;
      const map = loader.load(MAP[body.id]);
      map.colorSpace = THREE.SRGBColorSpace;
      const mesh = new THREE.Mesh(
        body.star ? sphereHi : sphereLo,
        new THREE.MeshStandardMaterial({
          map, color: 0xffffff, roughness: body.star ? 0.42 : 0.72, metalness: 0.04,
          emissive: new THREE.Color(body.star ? "#ffb347" : "#ffffff"), emissiveMap: map,
          emissiveIntensity: body.star ? 1.35 : 0.28,
        }),
      );
      mesh.scale.setScalar(scale);
      root.add(mesh);
      if (body.rings) {
        const ring = new THREE.Mesh(
          new THREE.RingGeometry(1.28, 2.42, 96),
          new THREE.MeshBasicMaterial({ color: 0xe8d6b0, side: THREE.DoubleSide, transparent: true, opacity: 0.85, depthWrite: false }),
        );
        ring.rotation.x = Math.PI / 2.28;
        mesh.add(ring);
      }
      const orbit = body.star ? { r: 0, s: 0.7, speed: 0, phase: 0 } : ORBIT[body.id as Exclude<SystemBodyId, "sun">];
      planets.push({ id: body.id, mesh, r: orbit.r, speed: orbit.speed, phase: orbit.phase, base: body.star ? 0.7 : orbit.s });
    }
    const projected = new THREE.Vector3();
    let hovered: SystemBodyId | null = null;
    const pick = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const px = event.clientX - rect.left;
      const py = event.clientY - rect.top;
      let best: SystemBodyId | null = null;
      let bestScore = Infinity;
      for (const body of planets) {
        projected.copy(body.mesh.position).project(camera);
        const sx = (projected.x * 0.5 + 0.5) * rect.width;
        const sy = (-projected.y * 0.5 + 0.5) * rect.height;
        const dist = Math.hypot(px - sx, py - sy);
        if (dist < 28 && dist < bestScore) { bestScore = dist; best = body.id; }
      }
      return best;
    };
    const onMove = (event: PointerEvent) => {
      const id = pick(event);
      if (id !== hovered) { hovered = id; node.style.cursor = id ? "pointer" : "default"; setHot(id); }
    };
    const onPick = (event: PointerEvent) => { const id = pick(event); if (id) setActiveId(id); };
    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerdown", onPick);
    const fit = () => {
      const width = Math.max(1, node.clientWidth || 420);
      const height = Math.max(1, node.clientHeight || 420);
      camera.aspect = width / height; camera.updateProjectionMatrix(); renderer.setSize(width, height, true);
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(node);
    let raf = 0;
    const tick = () => {
      const t = performance.now() / 1000;
      const width = node.clientWidth || 420;
      const height = node.clientHeight || 420;
      for (const body of planets) {
        if (body.id === "sun") body.mesh.rotation.y += reduce ? 0 : 0.002;
        else {
          const angle = body.phase + (reduce ? 0 : t * body.speed);
          body.mesh.position.set(Math.cos(angle) * body.r, 0, Math.sin(angle) * body.r);
          body.mesh.rotation.y += reduce ? 0 : 0.01;
          body.mesh.scale.setScalar(body.base * (hovered === body.id ? 1.14 : 1));
        }
        const el = labelRefs.current[body.id];
        if (el) {
          projected.copy(body.mesh.position).project(camera);
          el.style.left = `${(projected.x * 0.5 + 0.5) * width}px`;
          el.style.top = `${(-projected.y * 0.5 + 0.5) * height}px`;
        }
      }
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf); observer.disconnect();
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerdown", onPick);
      renderer.dispose(); sphereHi.dispose(); sphereLo.dispose(); renderer.domElement.remove();
    };
  }, []);

  return (
    <>
      <div ref={hostRef} className={cn("orrery relative mx-auto aspect-square w-full overflow-visible", className)}>
        {SYSTEM_BODIES.map((body) => (
          <div key={body.id} ref={(el) => { labelRefs.current[body.id] = el; }} className={cn("planet-label", hot === body.id && "is-on")}>
            <p className="font-sans text-micro uppercase tracking-kicker text-accent">{body.planet}</p>
            <p className={cn("font-display text-sm font-semibold", body.star ? "text-accent" : "text-fg")}>
              {body.id === "sun" ? "Titan" : body.title}
            </p>
          </div>
        ))}
      </div>
      {active ? <PlanetInspect body={active} onClose={() => setActiveId(null)} /> : null}
    </>
  );
}
