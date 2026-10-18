<script setup>
import { ref } from 'vue'
import { gsap, useMotion } from '@/lib/motion.js'

// A fixed, page-wide background: soft colour blobs that drift, a dot grid and small floating shapes.
// Everything is pointer-events: none and sits behind the content. With reduced motion it is just still.
const root = ref(null)

const SHAPES = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  kind: ['ring', 'dot', 'plus', 'square'][i % 4],
  left: `${(i * 37 + 8) % 96}%`,
  top: `${(i * 53 + 6) % 92}%`,
  size: 10 + ((i * 7) % 5) * 5,
  tone: ['#635bff', '#f0206b', '#ffb81c', '#22d3ee', '#1aa657'][i % 5],
}))

useMotion(root, ({ hover }) => {
  const el = root.value

  // Blobs drift on their own slow loops
  gsap.utils.toArray('.blob', el).forEach((blob, i) => {
    gsap.to(blob, {
      x: gsap.utils.random(-90, 90),
      y: gsap.utils.random(-70, 70),
      scale: gsap.utils.random(0.9, 1.2),
      duration: gsap.utils.random(9, 14),
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: -i * 2,
    })
  })

  // Small shapes float and turn
  gsap.utils.toArray('.shape', el).forEach((s) => {
    gsap.to(s, {
      y: gsap.utils.random(-28, 28),
      x: gsap.utils.random(-18, 18),
      rotation: gsap.utils.random(-120, 120),
      duration: gsap.utils.random(5, 9),
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: gsap.utils.random(-6, 0),
    })
  })

  // Layers shift slightly with the pointer (mouse devices only)
  if (!hover) return
  const layers = [
    { sel: '.layer--back', amount: 14 },
    { sel: '.layer--front', amount: 34 },
  ].map(({ sel, amount }) => ({
    amount,
    x: gsap.quickTo(sel, 'x', { duration: 1.2, ease: 'power3.out' }),
    y: gsap.quickTo(sel, 'y', { duration: 1.2, ease: 'power3.out' }),
  }))
  const move = (e) => {
    const nx = e.clientX / window.innerWidth - 0.5
    const ny = e.clientY / window.innerHeight - 0.5
    layers.forEach((l) => {
      l.x(nx * l.amount)
      l.y(ny * l.amount)
    })
  }
  window.addEventListener('pointermove', move, { passive: true })
  return () => window.removeEventListener('pointermove', move)
})
</script>

<template>
  <div ref="root" class="bg" aria-hidden="true">
    <div class="layer layer--back">
      <div class="grid" />
      <div class="blob blob--a" />
      <div class="blob blob--b" />
      <div class="blob blob--c" />
    </div>
    <div class="layer layer--front">
      <span
        v-for="s in SHAPES"
        :key="s.id"
        class="shape"
        :class="`shape--${s.kind}`"
        :style="{ left: s.left, top: s.top, width: `${s.size}px`, height: `${s.size}px`, '--c': s.tone }"
      />
    </div>
  </div>
</template>

<style scoped>
.bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}
.layer {
  position: absolute;
  inset: -40px;
}
.grid {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(#635bff22 1.4px, transparent 1.4px);
  background-size: 34px 34px;
  mask-image: radial-gradient(80% 70% at 50% 30%, #000 0%, transparent 100%);
  -webkit-mask-image: radial-gradient(80% 70% at 50% 30%, #000 0%, transparent 100%);
}
.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
}
.blob--a {
  top: -8%;
  right: -6%;
  width: 46vw;
  height: 46vw;
  max-width: 620px;
  max-height: 620px;
  background: #8b5cf6;
  opacity: 0.2;
}
.blob--b {
  bottom: 4%;
  left: -8%;
  width: 40vw;
  height: 40vw;
  max-width: 520px;
  max-height: 520px;
  background: #ffb81c;
  opacity: 0.16;
}
.blob--c {
  top: 38%;
  left: 38%;
  width: 30vw;
  height: 30vw;
  max-width: 400px;
  max-height: 400px;
  background: #f0206b;
  opacity: 0.1;
}
.shape {
  position: absolute;
  opacity: 0.5;
}
.shape--ring {
  border: 2px solid var(--c);
  border-radius: 50%;
}
.shape--dot {
  border-radius: 50%;
  background: var(--c);
  opacity: 0.35;
}
.shape--square {
  border: 2px solid var(--c);
  border-radius: 4px;
}
.shape--plus::before,
.shape--plus::after {
  content: '';
  position: absolute;
  inset: 50% 0 auto 0;
  height: 2px;
  background: var(--c);
  border-radius: 2px;
}
.shape--plus::after {
  transform: rotate(90deg);
}
</style>
