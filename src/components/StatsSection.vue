<script setup>
import { ref } from 'vue'
import { stats } from '@/data/content.js'
import { gsap, useMotion } from '@/lib/motion.js'

const root = ref(null)
// With reduced motion the real numbers show straight away; otherwise they start at 0 and count up
const shown = ref(stats.items.map((s) => s.value))

useMotion(root, () => {
  shown.value = stats.items.map(() => 0)

  const tl = gsap.timeline({ scrollTrigger: { trigger: '.grid', start: 'top 80%', once: true } })
  tl.from('.stat', { y: 60, opacity: 0, scale: 0.92, duration: 0.8, stagger: 0.12, ease: 'back.out(1.5)' })
  stats.items.forEach((s, i) => {
    const counter = { v: 0 }
    tl.to(
      counter,
      {
        v: s.value,
        duration: 1.8,
        ease: 'power2.out',
        onUpdate: () => (shown.value[i] = Math.round(counter.v)),
      },
      0.2 + i * 0.12,
    )
  })

  // Icons breathe; the background glow drifts with the scroll
  gsap.to('.stat__icon', {
    y: -6,
    scale: 1.08,
    duration: 1.8,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
    stagger: { each: 0.3, from: 'start' },
  })
  gsap.to('.stats__glow', {
    y: 140,
    x: -80,
    ease: 'none',
    scrollTrigger: { trigger: root.value, start: 'top bottom', end: 'bottom top', scrub: 1 },
  })

  return () => {
    shown.value = stats.items.map((s) => s.value)
  }
})
</script>

<template>
  <section ref="root" class="stats">
    <div class="stats__glow" aria-hidden="true" />
    <div class="container stats__inner">
      <div class="head">
        <p v-fade class="eyebrow stats__eyebrow">{{ stats.eyebrow }}</p>
        <h2 v-words class="section-title stats__title">{{ stats.title }}</h2>
      </div>

      <ul class="grid">
        <li v-for="(s, i) in stats.items" :key="s.label" class="stat">
          <img :src="s.icon" alt="" width="44" height="44" class="stat__icon" />
          <p class="stat__value">{{ shown[i].toLocaleString('en-US') }}{{ s.suffix || '' }}</p>
          <p class="stat__label">{{ s.label }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.stats {
  position: relative;
  overflow: hidden;
  padding-block: var(--section-y);
  background: linear-gradient(160deg, var(--ink-900) 0%, var(--navy) 100%);
}
.stats__glow {
  position: absolute;
  top: -180px;
  right: -120px;
  width: 520px;
  height: 520px;
  border-radius: 50%;
  background: #635bff;
  filter: blur(110px);
  opacity: 0.35;
  pointer-events: none;
}
.stats__inner {
  position: relative;
}
.head {
  max-width: 760px;
}
.stats__eyebrow {
  color: #a5a0ff;
}
.stats__title {
  color: #fff;
}
.grid {
  margin-top: 56px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
}
.stat {
  padding: 28px 24px;
  border-radius: var(--radius-lg);
  background: rgb(255 255 255 / 0.06);
  border: 1px solid rgb(255 255 255 / 0.12);
}
.stat__icon {
  width: 44px;
  height: 44px;
  object-fit: contain;
  opacity: 0.85;
}
.stat__value {
  margin-top: 20px;
  font-family: var(--font-display);
  font-size: clamp(2.25rem, 4.4vw, 3.5rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  background: var(--gradient-brand);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-variant-numeric: tabular-nums;
}
.stat__label {
  margin-top: 4px;
  font-weight: 600;
  color: #cbd5e1;
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 480px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
