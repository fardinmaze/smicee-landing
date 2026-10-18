<script setup>
import { ref } from 'vue'
import { gsap, useMotion } from '@/lib/motion.js'

// A thin gradient bar at the very top that fills as you scroll down the page (like NextCart's route bar)
const bar = ref(null)

useMotion(bar, () => {
  gsap.to(bar.value, {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: { trigger: document.documentElement, start: 0, end: 'max', scrub: 0.2 },
  })
})
</script>

<template>
  <div ref="bar" class="progress" aria-hidden="true" />
</template>

<style scoped>
.progress {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 80;
  height: 3px;
  background: var(--gradient-brand);
  transform: scaleX(0);
  transform-origin: left;
  pointer-events: none;
}
</style>
