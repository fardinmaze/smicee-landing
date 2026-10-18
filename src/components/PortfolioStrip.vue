<script setup>
import { ref } from 'vue'
import { portfolio } from '@/data/content.js'
import { gsap, ScrollTrigger, useMotion } from '@/lib/motion.js'

const root = ref(null)
const track = ref(null)

// Two copies of the list so the marquee can loop without a gap. The copy is hidden from screen readers.
const copies = [0, 1]

useMotion(root, () => {
  root.value.classList.add('is-marquee')

  gsap.from('.strip__label', {
    y: 16,
    opacity: 0,
    duration: 0.7,
    ease: 'power3.out',
    scrollTrigger: { trigger: root.value, start: 'top 90%', once: true },
  })

  // Endless scroll; it speeds up a little while the page is being scrolled, and pauses on hover
  const loop = gsap.to(track.value, { xPercent: -50, duration: 36, ease: 'none', repeat: -1 })
  const boost = ScrollTrigger.create({
    trigger: document.documentElement,
    start: 0,
    end: 'max',
    onUpdate: (self) => {
      const v = Math.min(Math.abs(self.getVelocity()) / 800, 4)
      gsap.to(loop, { timeScale: 1 + v, duration: 0.3, overwrite: true })
      gsap.to(loop, { timeScale: 1, duration: 1.2, delay: 0.3, overwrite: false })
    },
  })
  const pause = () => gsap.to(loop, { timeScale: 0, duration: 0.5 })
  const resume = () => gsap.to(loop, { timeScale: 1, duration: 0.5 })
  root.value.addEventListener('mouseenter', pause)
  root.value.addEventListener('mouseleave', resume)

  return () => {
    boost.kill()
    root.value?.removeEventListener('mouseenter', pause)
    root.value?.removeEventListener('mouseleave', resume)
    root.value?.classList.remove('is-marquee')
  }
})
</script>

<template>
  <section id="portfolio" ref="root" class="strip" aria-label="Portfolio">
    <p class="strip__label">{{ portfolio.label }}</p>
    <div class="strip__view">
      <ul ref="track" class="strip__track">
        <template v-for="c in copies" :key="c">
          <li v-for="item in portfolio.items" :key="`${c}-${item.name}`" :class="{ 'is-copy': c === 1 }" :aria-hidden="c === 1 ? 'true' : null">
            <component
              :is="item.href ? 'a' : 'span'"
              class="pill"
              :href="item.href || null"
              :target="item.href ? '_blank' : null"
              :rel="item.href ? 'noopener' : null"
              :tabindex="c === 1 ? -1 : null"
            >
              {{ item.name }}
            </component>
          </li>
        </template>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.strip {
  position: relative;
  padding-block: 40px;
  border-block: 1px solid var(--border);
  background: #fff;
}
.strip__label {
  text-align: center;
  font-family: var(--font-display);
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-muted);
}
.strip__view {
  margin-top: 20px;
  padding-inline: var(--gutter);
}
.strip__track {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
}
/* the duplicate set only exists for the marquee */
.is-copy {
  display: none;
}
.is-marquee .strip__view {
  overflow: hidden;
  padding-inline: 0;
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
}
.is-marquee .strip__track {
  flex-wrap: nowrap;
  justify-content: flex-start;
  width: max-content;
  gap: 0;
}
.is-marquee .strip__track li {
  padding-right: 12px;
}
.is-marquee .is-copy {
  display: list-item;
}
.pill {
  display: inline-block;
  padding: 12px 24px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--bg);
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 700;
  white-space: nowrap;
  color: var(--navy);
  transition:
    transform 0.25s var(--ease-out),
    border-color 0.25s,
    color 0.25s,
    background-color 0.25s;
}
a.pill:hover {
  transform: translateY(-3px);
  border-color: var(--primary);
  background: var(--primary-soft);
  color: var(--primary);
}
</style>
