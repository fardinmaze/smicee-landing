<script setup>
import { ref } from 'vue'
import { automation } from '@/data/content.js'
import { gsap, useMotion } from '@/lib/motion.js'
import AnimatedIcon from './AnimatedIcon.vue'

const root = ref(null)

useMotion(root, () => {
  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' },
    scrollTrigger: { trigger: root.value, start: 'top 78%', once: true },
  })
  tl.from('.band', { y: 70, opacity: 0, scale: 0.95, duration: 1 })
    .from('.band__copy > *', { y: 24, opacity: 0, duration: 0.7, stagger: 0.12 }, '-=0.5')
    .from('.band__cta', { scale: 0.6, opacity: 0, duration: 0.6, ease: 'back.out(2)' }, '-=0.4')

  // Pulse rings behind the shield, and a slow sheen across the band
  gsap.fromTo(
    '.ring',
    { scale: 0.8, opacity: 0.6 },
    { scale: 1.9, opacity: 0, duration: 2.4, ease: 'power1.out', repeat: -1, stagger: 0.8 },
  )
  gsap.to('.band__sheen', { xPercent: 420, duration: 3.2, ease: 'power1.inOut', repeat: -1, repeatDelay: 2.4 })
})
</script>

<template>
  <section ref="root" class="section">
    <div class="container">
      <div class="band">
        <span class="band__sheen" aria-hidden="true" />
        <span class="band__icon">
          <i class="ring" aria-hidden="true" />
          <i class="ring" aria-hidden="true" />
          <AnimatedIcon
            :d="['M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z', 'M9 12l2 2 4-4']"
            :size="34"
          />
        </span>
        <div class="band__copy">
          <p class="eyebrow band__eyebrow">{{ automation.eyebrow }}</p>
          <h2 class="band__title">{{ automation.title }}</h2>
        </div>
        <a href="#contact" class="btn btn--light band__cta">{{ automation.cta }}</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.band {
  position: relative;
  display: flex;
  align-items: center;
  gap: clamp(20px, 4vw, 40px);
  padding: clamp(28px, 5vw, 56px);
  overflow: hidden;
  border-radius: var(--radius-xl);
  color: #fff;
  background:
    radial-gradient(60% 120% at 100% 0%, #f0206b99 0%, transparent 60%),
    radial-gradient(50% 100% at 0% 100%, #ffb81c55 0%, transparent 60%), var(--gradient-primary);
}
.band__sheen {
  position: absolute;
  top: 0;
  bottom: 0;
  left: -30%;
  width: 18%;
  background: linear-gradient(100deg, transparent, rgb(255 255 255 / 0.22), transparent);
  transform: skewX(-18deg);
  pointer-events: none;
}
.band__icon {
  position: relative;
  display: grid;
  place-items: center;
  flex: none;
  width: 72px;
  height: 72px;
  border-radius: 22px;
  background: rgb(255 255 255 / 0.2);
}
.ring {
  position: absolute;
  inset: 0;
  border-radius: 22px;
  border: 2px solid rgb(255 255 255 / 0.7);
  opacity: 0;
}
.band__copy {
  flex: 1;
}
.band__eyebrow {
  color: #fff;
  opacity: 0.85;
}
.band__title {
  margin-top: 8px;
  max-width: 24ch;
  font-size: clamp(1.5rem, 3.2vw, 2.375rem);
  font-weight: 800;
  color: #fff;
}
.band__cta {
  flex: none;
}

@media (max-width: 760px) {
  .band {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
