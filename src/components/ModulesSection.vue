<script setup>
import { ref } from 'vue'
import { modules } from '@/data/content.js'
import { gsap, ScrollTrigger, useMotion } from '@/lib/motion.js'
import AnimatedIcon from './AnimatedIcon.vue'

const TONES = ['#635bff', '#f0206b', '#ffb81c', '#1aa657', '#22d3ee', '#8b5cf6', '#ff6a3d']

// One icon per module, in the same order as the list
const ICONS = [
  ['M9 11a3 3 0 100-6 3 3 0 000 6z', 'M3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5', 'M17 8h4M19 6v4'], // HR
  ['M4 5h16v14H4z', 'M4 10h16', 'M9 10v9'], // projects / tasks
  ['M4 19l5-6 4 3 7-9', 'M15 7h5v5'], // sales
  ['M3 7h18v12H3z', 'M3 11h18', 'M16 15h2'], // finance
  ['M8 9a3 3 0 100-6 3 3 0 000 6z', 'M16 10a2.5 2.5 0 100-5', 'M2 20c0-3 2.7-5 6-5s6 2 6 5', 'M16 15c3 0 6 1.5 6 5'], // clients
  ['M12 15a3 3 0 100-6 3 3 0 000 6z', 'M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1'], // operations
  ['M3 8l9-5 9 5v8l-9 5-9-5z', 'M3 8l9 5 9-5', 'M12 13v8'], // vendors
]

const root = ref(null)
const track = ref(null)
const bar = ref(null)

useMotion(root, ({ desktop }) => {
  gsap.from('.head > *', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.12,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.head', start: 'top 85%', once: true },
  })

  if (!desktop) {
    // Phones and tablets: a normal grid whose cards pop in one after another
    gsap.from('.card', {
      y: 50,
      opacity: 0,
      scale: 0.94,
      duration: 0.7,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.grid', start: 'top 85%', once: true },
    })
    return
  }

  // Desktop: the section pins and the cards slide sideways as you scroll down
  root.value.classList.add('is-h')
  const cards = gsap.utils.toArray('.card', root.value)
  const distance = () => track.value.scrollWidth - track.value.parentElement.clientWidth

  const slide = gsap.to(track.value, {
    x: () => -distance(),
    ease: 'none',
    scrollTrigger: {
      trigger: root.value,
      start: 'top top+=72',
      end: () => `+=${distance() + 200}`,
      pin: true,
      scrub: 0.6,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  })

  gsap.to(bar.value, {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: { trigger: root.value, start: 'top top+=72', end: () => `+=${distance() + 200}`, scrub: true },
  })

  // Each card lifts and straightens as it crosses the middle of the screen
  cards.forEach((card, i) => {
    gsap.fromTo(
      card,
      { y: i % 2 ? 36 : -12, rotation: i % 2 ? 2.5 : -2.5, scale: 0.94 },
      {
        y: 0,
        rotation: 0,
        scale: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          containerAnimation: slide,
          start: 'left 90%',
          end: 'left 45%',
          scrub: true,
        },
      },
    )
  })

  return () => root.value?.classList.remove('is-h')
})
</script>

<template>
  <section id="features" ref="root" class="modules">
    <div class="container modules__inner">
      <div class="head">
        <p class="eyebrow">{{ modules.eyebrow }}</p>
        <h2 class="section-title">{{ modules.title }}</h2>
      </div>

      <div class="view">
        <ul ref="track" class="grid">
          <li v-for="(name, i) in modules.items" :key="name" class="card" :style="{ '--tone': TONES[i] }">
            <span class="card__icon"><AnimatedIcon :d="ICONS[i]" :size="30" :delay="i * 0.08" /></span>
            <span class="card__num">{{ String(i + 1).padStart(2, '0') }}</span>
            <h3 class="card__title">{{ name }}</h3>
          </li>
        </ul>
      </div>

      <div class="progress" aria-hidden="true"><span ref="bar" /></div>
    </div>
  </section>
</template>

<style scoped>
.modules {
  padding-block: clamp(64px, 9vw, 112px);
  background: #fff;
  border-block: 1px solid var(--border);
}
.head {
  max-width: 760px;
}
.view {
  margin-top: 48px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
}
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 220px;
  padding: 24px;
  overflow: hidden;
  border-radius: var(--radius-lg);
  background: var(--bg);
  border: 1px solid var(--border);
  transition:
    box-shadow 0.3s var(--ease-out),
    background-color 0.3s;
}
.card::before {
  content: '';
  position: absolute;
  inset: 0 0 auto 0;
  height: 5px;
  background: var(--tone);
}
.card:hover {
  background: #fff;
  box-shadow: var(--shadow-lg);
}
.card:hover :deep(.aicon) {
  transform: scale(1.18) rotate(-6deg);
}
.card__icon {
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  border-radius: 18px;
  color: var(--tone);
  background: color-mix(in srgb, var(--tone) 14%, #fff);
}
.card__num {
  margin-top: auto;
  font-family: var(--font-display);
  font-size: 0.875rem;
  font-weight: 800;
  color: var(--tone);
}
.card__title {
  font-size: 1.1875rem;
  font-weight: 800;
}
.progress {
  display: none;
}

/* Desktop with motion: one long row that slides sideways while the section is pinned */
.is-h .view {
  overflow: hidden;
  margin-inline: calc(var(--gutter) * -1);
  padding-inline: var(--gutter);
}
.is-h .grid {
  display: flex;
  width: max-content;
  gap: 20px;
  padding-block: 28px;
}
.is-h .card {
  flex: none;
  width: 300px;
  min-height: 260px;
}
.is-h .progress {
  display: block;
  height: 4px;
  margin-top: 8px;
  overflow: hidden;
  border-radius: 4px;
  background: var(--border);
}
.is-h .progress span {
  display: block;
  height: 100%;
  background: var(--gradient-brand);
  transform: scaleX(0);
  transform-origin: left;
}
</style>
