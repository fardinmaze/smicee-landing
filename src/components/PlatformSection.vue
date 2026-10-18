<script setup>
import { ref } from 'vue'
import { platform } from '@/data/content.js'
import { gsap, useMotion } from '@/lib/motion.js'
import AnimatedIcon from './AnimatedIcon.vue'

// One line icon per block (24x24)
const ICONS = [
  ['M4 5h7v7H4z', 'M13 5h7v4h-7z', 'M13 11h7v8h-7z', 'M4 14h7v5H4z'],
  ['M3 6h18v12H3z', 'M3 10h18', 'M7 14h4'],
  ['M8 11a3 3 0 100-6 3 3 0 000 6z', 'M16 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5z', 'M2 19c0-3 2.7-5 6-5s6 2 6 5', 'M14 19c0-2.2 1.5-3.8 4-4 2 .2 4 1.5 4 4'],
  ['M12 3v12', 'M12 15l-4-4', 'M12 15l4-4', 'M4 17v3h16v-3'],
  ['M5 20V10', 'M12 20V4', 'M19 20v-7'],
]

const root = ref(null)

useMotion(root, ({ hover }) => {
  gsap.from('.head > *', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.12,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.head', start: 'top 85%', once: true },
  })

  // Tiles fly in from alternating directions and settle
  gsap.from('.tile', {
    y: 70,
    x: (i) => (i % 2 ? 40 : -40),
    rotation: (i) => (i % 2 ? 3 : -3),
    scale: 0.92,
    opacity: 0,
    duration: 0.9,
    stagger: 0.12,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.bento', start: 'top 82%', once: true },
  })

  // The lead tile's title drifts slightly against the scroll
  gsap.to('.tile--lead .tile__title', {
    y: -22,
    ease: 'none',
    scrollTrigger: { trigger: '.bento', start: 'top bottom', end: 'bottom top', scrub: 0.8 },
  })

  if (!hover) return
  // Tiles tilt toward the pointer
  const cleanups = gsap.utils.toArray('.tile', root.value).map((tile) => {
    const rx = gsap.quickTo(tile, 'rotationX', { duration: 0.5, ease: 'power3.out' })
    const ry = gsap.quickTo(tile, 'rotationY', { duration: 0.5, ease: 'power3.out' })
    const move = (e) => {
      const r = tile.getBoundingClientRect()
      ry(((e.clientX - r.left) / r.width - 0.5) * 8)
      rx(((e.clientY - r.top) / r.height - 0.5) * -8)
    }
    const leave = () => {
      rx(0)
      ry(0)
    }
    tile.addEventListener('pointermove', move)
    tile.addEventListener('pointerleave', leave)
    return () => {
      tile.removeEventListener('pointermove', move)
      tile.removeEventListener('pointerleave', leave)
    }
  })
  return () => cleanups.forEach((c) => c())
})
</script>

<template>
  <section id="platform" ref="root" class="section">
    <div class="container">
      <div class="head">
        <p class="eyebrow">{{ platform.eyebrow }}</p>
        <h2 class="section-title">{{ platform.title }}</h2>
      </div>

      <div class="bento">
        <article v-for="(b, i) in platform.blocks" :key="b.title" class="tile" :class="[`tile--${b.tone}`, { 'tile--lead': b.lead }]">
          <span class="tile__icon">
            <AnimatedIcon :d="ICONS[i]" :size="26" :delay="i * 0.1" />
          </span>
          <h3 class="tile__title">{{ b.title }}</h3>
          <p v-if="b.text" class="tile__text">{{ b.text }}</p>
          <a v-if="b.cta" href="#features" class="btn btn--light btn--sm tile__cta">{{ b.cta }}</a>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.head {
  max-width: 720px;
}
.bento {
  margin-top: 48px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
  perspective: 1200px;
}
.tile {
  grid-column: span 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  padding: 28px;
  border-radius: var(--radius-lg);
  background: #fff;
  border: 1px solid var(--border);
  transform-style: preserve-3d;
  transition: box-shadow 0.3s var(--ease-out);
}
.tile:hover {
  box-shadow: var(--shadow-lg);
}
.tile:hover :deep(.aicon) {
  transform: scale(1.18) rotate(-6deg);
}
.tile--lead {
  grid-column: span 4;
  justify-content: space-between;
  min-height: 260px;
  border: 0;
  color: #fff;
  background:
    radial-gradient(70% 90% at 100% 0%, #f0206b88 0%, transparent 60%), var(--gradient-primary);
}
.tile--lead .tile__title {
  max-width: 14ch;
  font-size: clamp(1.75rem, 3.4vw, 2.5rem);
  font-weight: 800;
  color: #fff;
}
.tile--lead .tile__icon {
  background: rgb(255 255 255 / 0.2);
  color: #fff;
}
.tile__icon {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border-radius: 16px;
  margin-bottom: 8px;
}
.tile--amber .tile__icon {
  background: #fff4d6;
  color: #b97d00;
}
.tile--cyan .tile__icon {
  background: #dffaff;
  color: #0e8aa3;
}
.tile--magenta .tile__icon {
  background: #ffe3ec;
  color: var(--magenta);
}
.tile--green .tile__icon {
  background: #dcf7e8;
  color: var(--green);
}
.tile__title {
  font-size: 1.375rem;
  font-weight: 800;
}
.tile__text {
  color: var(--text-muted);
}
.tile__cta {
  margin-top: 4px;
}

@media (max-width: 900px) {
  .bento {
    grid-template-columns: repeat(2, 1fr);
  }
  .tile {
    grid-column: span 1;
  }
  .tile--lead {
    grid-column: 1 / -1;
  }
}
@media (max-width: 560px) {
  .bento {
    grid-template-columns: 1fr;
  }
}
</style>
