<script setup>
import { ref } from 'vue'
import { gsap, ScrollTrigger, useMotion } from '@/lib/motion.js'

// A line icon that draws itself when it scrolls into view, then floats gently.
// `d` is one path string or an array of them (24x24 viewBox).
const props = defineProps({
  d: { type: [String, Array], required: true },
  size: { type: Number, default: 26 },
  stroke: { type: Number, default: 1.8 },
  delay: { type: Number, default: 0 },
})

const svg = ref(null)
const paths = Array.isArray(props.d) ? props.d : [props.d]

useMotion(svg, () => {
  const lines = svg.value.querySelectorAll('path')
  gsap.set(lines, { strokeDasharray: 1, strokeDashoffset: 1 })

  let idle
  const trigger = ScrollTrigger.create({
    trigger: svg.value,
    start: 'top 92%',
    once: true,
    onEnter: () => {
      gsap.to(lines, {
        strokeDashoffset: 0,
        duration: 1.1,
        delay: props.delay,
        ease: 'power2.out',
        stagger: 0.14,
        onComplete: () => {
          idle = gsap.to(svg.value, {
            y: -3,
            rotation: 4,
            duration: gsap.utils.random(2, 3.2),
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
          })
        },
      })
    },
  })

  return () => {
    trigger.kill()
    idle?.kill()
  }
})
</script>

<template>
  <span class="aicon">
    <svg ref="svg" :width="size" :height="size" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        v-for="p in paths"
        :key="p"
        :d="p"
        pathLength="1"
        stroke="currentColor"
        :stroke-width="stroke"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </span>
</template>

<style scoped>
.aicon {
  display: inline-grid;
  place-items: center;
  transition: transform 0.35s var(--ease-out);
}
/* Parents add the hover pop: .card:hover :deep(.aicon) { transform: scale(1.15) rotate(-6deg) } */
</style>
