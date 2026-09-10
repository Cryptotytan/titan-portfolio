import * as THREE from "three";

export function createPlanetMaterial(kind: number, glow: string, lite = false) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uKind: { value: kind },
      uLite: { value: lite ? 1 : 0 },
      uLight: { value: new THREE.Vector3(0.7, 0.42, 0.78).normalize() },
      uGlow: { value: new THREE.Color(glow) },
    },
    vertexShader: `
      varying vec3 vN;
      void main() {
        vN = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      precision highp float;
      varying vec3 vN;
      uniform vec3 uGlow;
      uniform float uKind;
      void main() {
        float ndl = max(dot(normalize(vN), normalize(vec3(0.7, 0.4, 0.8))), 0.0);
        vec3 col = mix(uGlow * 0.22, uGlow, ndl);
        if (uKind < 0.5) col = mix(vec3(0.72, 0.18, 0.02), vec3(1.0, 0.92, 0.55), ndl);
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
}
