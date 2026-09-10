import { useEffect, useRef } from "react";
import * as THREE from "three";
import { createPlanetMaterial } from "@/lib/planet-shader";

export function LivingGlobe({
  kind, glow, rings, star, fly,
}: {
  kind: number; glow: string; rings?: boolean; star?: boolean; fly?: boolean;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const flyRef = useRef(fly);
  flyRef.current = fly;

  useEffect(() => {
    const node = hostRef.current;
    if (!node) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    const baseZ = star ? 5.6 : rings ? 7.8 : 5.0;
    const camera = new THREE.PerspectiveCamera(star ? 34 : rings ? 40 : 32, 1, 0.1, 40);
    camera.position.z = baseZ;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = star ? 1.35 : 1.12;
    node.appendChild(renderer.domElement);
    const group = new THREE.Group();
    scene.add(group);
    const material = createPlanetMaterial(kind, glow, false);
    const sphere = new THREE.SphereGeometry(1, 96, 72);
    group.add(new THREE.Mesh(sphere, material));
    const glowColor = new THREE.Color(glow);
    group.add(new THREE.Mesh(
      new THREE.SphereGeometry(star ? 1.1 : 1.045, 48, 32),
      new THREE.MeshBasicMaterial({ color: glowColor, transparent: true, opacity: star ? 0.32 : 0.16, side: THREE.BackSide, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }),
    ));
    if (star) group.add(new THREE.PointLight(glowColor, 18, 14, 2));
    if (rings) {
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(1.28, 1.88, 128),
        new THREE.MeshBasicMaterial({ color: 0xe8d6b0, side: THREE.DoubleSide, transparent: true, opacity: 0.85, depthWrite: false }),
      );
      ring.rotation.x = Math.PI / 2.08;
      group.add(ring);
    }
    const spin = { x: rings ? -0.28 : -0.12, y: 0.5, vy: reduce ? 0 : star ? 0.0024 : 0.0036, dragging: false, px: 0, py: 0, z: baseZ };
    const onDown = (event: PointerEvent) => { node.setPointerCapture(event.pointerId); spin.dragging = true; spin.px = event.clientX; spin.py = event.clientY; };
    const onMove = (event: PointerEvent) => {
      if (!spin.dragging) return;
      const dx = event.clientX - spin.px; const dy = event.clientY - spin.py;
      spin.px = event.clientX; spin.py = event.clientY;
      spin.y += dx * 0.008; spin.x = Math.max(-0.8, Math.min(0.8, spin.x + dy * 0.006)); spin.vy = dx * 0.00028;
    };
    const onUp = () => { spin.dragging = false; };
    node.addEventListener("pointerdown", onDown);
    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerup", onUp);
    node.addEventListener("pointercancel", onUp);
    const fit = () => {
      const width = node.clientWidth || 320; const height = node.clientHeight || 320;
      camera.aspect = width / height; camera.updateProjectionMatrix(); renderer.setSize(width, height, true);
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(node);
    let raf = 0;
    const tick = () => {
      material.uniforms.uTime.value = performance.now() / 1000;
      spin.z += ((flyRef.current ? baseZ * 0.42 : baseZ) - spin.z) * 0.06;
      camera.position.z = spin.z;
      if (!spin.dragging && !reduce) {
        spin.y += spin.vy;
        spin.vy += ((star ? 0.0024 : 0.0036) - spin.vy) * 0.04;
        spin.x += ((rings ? -0.28 : -0.12) - spin.x) * 0.03;
      }
      group.rotation.x = spin.x; group.rotation.y = spin.y;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf); observer.disconnect();
      node.removeEventListener("pointerdown", onDown);
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerup", onUp);
      node.removeEventListener("pointercancel", onUp);
      renderer.dispose(); sphere.dispose(); material.dispose(); renderer.domElement.remove();
    };
  }, [glow, kind, rings, star]);

  return <div ref={hostRef} className="globe-stage relative mx-auto aspect-square w-full max-w-lg cursor-grab touch-none select-none active:cursor-grabbing" />;
}
