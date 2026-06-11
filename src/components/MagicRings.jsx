import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = `
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime, uAttenuation, uLineThickness;
uniform float uBaseRadius, uRadiusStep, uScaleRate;
uniform float uOpacity, uNoiseAmount, uRotation, uRingGap;
uniform float uFadeIn, uFadeOut;
uniform float uMouseInfluence, uHoverAmount, uHoverScale, uParallax, uBurst;
uniform vec2 uResolution, uMouse;
uniform vec3 uColor, uColorTwo, uColorThree;
uniform int uRingCount;

const float HP = 1.5707963;
const float CYCLE = 3.45;

float fade(float t) {
  return t < uFadeIn ? smoothstep(0.0, uFadeIn, t) : 1.0 - smoothstep(uFadeOut, CYCLE - 0.2, t);
}

float ring(vec2 p, float ri, float cut, float t0, float px) {
  float t = mod(uTime + t0, CYCLE);
  float r = ri + t / CYCLE * uScaleRate;
  float d = abs(length(p) - r);
  float a = atan(abs(p.y), abs(p.x)) / HP;
  float th = max(1.0 - a, 0.5) * px * uLineThickness;
  float h = (1.0 - smoothstep(th, th * 1.5, d)) + 1.0;
  d += abs(cut * a) * r; // Correction pour éviter les artefacts si cut est négatif
  return h * exp(-uAttenuation * d) * fade(t);
}

void main() {
  float px = 1.0 / min(uResolution.x, uResolution.y);
  vec2 p = (gl_FragCoord.xy - 0.5 * uResolution.xy) * px;
  float cr = cos(uRotation), sr = sin(uRotation);
  p = mat2(cr, -sr, sr, cr) * p;
  p -= uMouse * uMouseInfluence;
  float sc = mix(1.0, uHoverScale, uHoverAmount) + uBurst * 0.3;
  p /= sc;
  vec3 c = vec3(0.0);
  float alpha = 0.0;
  float rcf = max(float(uRingCount) - 1.0, 1.0);
  for (int i = 0; i < 10; i++) {
    if (i >= uRingCount) break;
    float fi = float(i);
    vec2 pr = p - fi * uParallax * uMouse;
    
    // Mix entre 3 couleurs
    float t = fi / rcf;
    vec3 rc = t < 0.5 
      ? mix(uColor, uColorTwo, t * 2.0) 
      : mix(uColorTwo, uColorThree, (t - 0.5) * 2.0);
      
    float r = ring(pr, uBaseRadius + fi * uRadiusStep, pow(uRingGap, fi), i == 0 ? 0.0 : 2.95 * fi, px);
    c += rc * r;
    alpha = max(alpha, r);
  }
  c *= 1.0 + uBurst * 2.0;
  float n = fract(sin(dot(gl_FragCoord.xy + uTime * 100.0, vec2(12.9898, 78.233))) * 43758.5453);
  c += (n - 0.5) * uNoiseAmount;
  gl_FragColor = vec4(c, alpha * uOpacity);
}
`;

export default function MagicRings({
  color = '#005effff',
  colorTwo = '#90f163ff',
  colorThree = '#ff0000ff',
  speed = 1,
  ringCount = 6,
  attenuation = 10,
  lineThickness = 2,
  baseRadius = 0.35,
  radiusStep = 0.1,
  scaleRate = 0.1,
  opacity = 1,
  blur = 0,
  noiseAmount = 0.1,
  rotation = 0,
  ringGap = 1.5,
  fadeIn = 0.7,
  fadeOut = 0.5,
  followMouse = false,
  mouseInfluence = 0.2,
  hoverScale = 1.2,
  parallax = 0.05,
  clickBurst = false,
}) {
  const mountRef = useRef(null);
  const mouseRef = useRef([0, 0]);
  const smoothMouseRef = useRef([0, 0]);
  const hoverAmountRef = useRef(0);
  const isHoveredRef = useRef(false);
  const burstRef = useRef(0);
  const lastTimeRef = useRef(0);
  const accumulatedTimeRef = useRef(0);
  const propsRef = useRef({ speed, clickBurst });

  const uniformsRef = useRef({
    uTime:          { value: 0 },
    uAttenuation:   { value: 10 },
    uResolution:    { value: new THREE.Vector2() },
    uColor:         { value: new THREE.Color() },
    uColorTwo:      { value: new THREE.Color() },
    uColorThree:    { value: new THREE.Color() },
    uLineThickness: { value: 2 },
    uBaseRadius:    { value: 0.35 },
    uRadiusStep:    { value: 0.1 },
    uScaleRate:     { value: 0.1 },
    uRingCount:     { value: 6 },
    uOpacity:       { value: 1 },
    uNoiseAmount:   { value: 0.1 },
    uRotation:      { value: 0 },
    uRingGap:       { value: 1.5 },
    uFadeIn:        { value: 0.7 },
    uFadeOut:       { value: 0.5 },
    uMouse:         { value: new THREE.Vector2() },
    uMouseInfluence:{ value: 0.2 },
    uHoverAmount:   { value: 0 },
    uHoverScale:    { value: 1.2 },
    uParallax:      { value: 0.05 },
    uBurst:         { value: 0 },
  });

  // Nettoyer le format des couleurs (enlever l'alpha si présent pour Three.js)
  const cleanColor = (c) => {
    if (typeof c === 'string' && c.startsWith('#') && c.length === 9) {
      return c.substring(0, 7);
    }
    return c;
  };

  // Mettre à jour les uniforms et refs quand les props changent
  useEffect(() => {
    propsRef.current = { speed, clickBurst };
    const u = uniformsRef.current;
    u.uAttenuation.value = attenuation;
    u.uColor.value.set(cleanColor(color));
    u.uColorTwo.value.set(cleanColor(colorTwo));
    u.uColorThree.value.set(cleanColor(colorThree));
    u.uLineThickness.value = lineThickness;
    u.uBaseRadius.value = baseRadius;
    u.uRadiusStep.value = radiusStep;
    u.uScaleRate.value = scaleRate;
    u.uRingCount.value = ringCount;
    u.uOpacity.value = opacity;
    u.uNoiseAmount.value = noiseAmount;
    u.uRotation.value = (rotation * Math.PI) / 180;
    u.uRingGap.value = ringGap;
    u.uFadeIn.value = fadeIn;
    u.uFadeOut.value = fadeOut;
    u.uMouseInfluence.value = followMouse ? mouseInfluence : 0;
    u.uHoverScale.value = hoverScale;
    u.uParallax.value = parallax;
  }, [
    color, colorTwo, colorThree, attenuation, lineThickness, baseRadius, radiusStep,
    scaleRate, ringCount, opacity, noiseAmount, rotation, ringGap,
    fadeIn, fadeOut, followMouse, mouseInfluence, hoverScale, parallax,
    speed, clickBurst
  ]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      return;
    }

    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0.1, 10);
    camera.position.z = 1;

    const uniforms = uniformsRef.current;
    const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms, transparent: true });
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
    scene.add(quad);

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      const dpr = Math.min(window.devicePixelRatio, 2);
      renderer.setSize(w, h);
      renderer.setPixelRatio(dpr);
      uniforms.uResolution.value.set(w * dpr, h * dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    const onMouseMove = (e) => {
      const rect = mount.getBoundingClientRect();
      mouseRef.current[0] = (e.clientX - rect.left) / rect.width - 0.5;
      mouseRef.current[1] = -((e.clientY - rect.top) / rect.height - 0.5);
    };
    const onMouseEnter = () => { isHoveredRef.current = true; };
    const onMouseLeave = () => {
      isHoveredRef.current = false;
      mouseRef.current[0] = 0;
      mouseRef.current[1] = 0;
    };
    const onClick = () => { burstRef.current = 1; };

    mount.addEventListener('mousemove', onMouseMove);
    mount.addEventListener('mouseenter', onMouseEnter);
    mount.addEventListener('mouseleave', onMouseLeave);
    mount.addEventListener('click', onClick);

    let frameId;
    lastTimeRef.current = performance.now();
    
    const animate = (t) => {
      frameId = requestAnimationFrame(animate);

      const delta = (t - lastTimeRef.current) * 0.001;
      lastTimeRef.current = t;

      smoothMouseRef.current[0] += (mouseRef.current[0] - smoothMouseRef.current[0]) * 0.08;
      smoothMouseRef.current[1] += (mouseRef.current[1] - smoothMouseRef.current[1]) * 0.08;
      hoverAmountRef.current += ((isHoveredRef.current ? 1 : 0) - hoverAmountRef.current) * 0.08;
      burstRef.current *= 0.95;
      if (burstRef.current < 0.001) burstRef.current = 0;

      const p = propsRef.current;
      accumulatedTimeRef.current += delta * p.speed;
      uniforms.uTime.value = accumulatedTimeRef.current;
      
      uniforms.uMouse.value.set(smoothMouseRef.current[0], smoothMouseRef.current[1]);
      uniforms.uHoverAmount.value = hoverAmountRef.current;
      uniforms.uBurst.value = p.clickBurst ? burstRef.current : 0;

      renderer.render(scene, camera);
    };
    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      ro.disconnect();
      mount.removeEventListener('mousemove', onMouseMove);
      mount.removeEventListener('mouseenter', onMouseEnter);
      mount.removeEventListener('mouseleave', onMouseLeave);
      mount.removeEventListener('click', onClick);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: '100%',
        height: '100%',
        filter: blur > 0 ? `blur(${blur}px)` : undefined,
      }}
    />
  );
}
