<script setup>
import { ref } from 'vue'
import { leads } from '@/data/content.js'
import { gsap, useMotion } from '@/lib/motion.js'

const root = ref(null)

useMotion(root, () => {
  // Cards fade up one after another
  gsap.from('.card', {
    y: 48,
    opacity: 0,
    duration: 0.8,
    stagger: 0.14,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.grid', start: 'top 82%', once: true },
  })

  // Each screenshot slides inside its card as the page scrolls
  gsap.utils.toArray('.card__media img', root.value).forEach((img) => {
    gsap.fromTo(
      img,
      { scale: 1.08, yPercent: 4 },
      {
        scale: 1,
        yPercent: -4,
        ease: 'none',
        scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
      },
    )
  })

})
</script>

<template>
  <section ref="root" class="section leads">
    <div class="container">
      <div class="head">
        <p v-fade class="eyebrow">{{ leads.eyebrow }}</p>
        <h2 v-words class="section-title">{{ leads.title }}</h2>
      </div>

      <ul class="grid">
        <li v-for="item in leads.items" :key="item.title" class="card">
          <div class="card__media">
            <img :src="item.image" :alt="item.alt" />
          </div>
          <h3 class="card__title">{{ item.title }}</h3>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.leads {
  background: #fff;
  border-block: 1px solid var(--border);
}
.head {
  max-width: 720px;
}
.grid {
  margin-top: 48px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  perspective: 1200px;
}
.card {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 16px 16px 28px;
  border-radius: var(--radius-lg);
  background: var(--bg);
  border: 1px solid var(--border);
  transform-style: preserve-3d;
  transition: box-shadow 0.3s var(--ease-out);
}
.card:hover {
  box-shadow: var(--shadow-lg);
}
.card__media {
  display: grid;
  place-items: center;
  aspect-ratio: 4 / 3;
  padding: 16px;
  overflow: hidden;
  border-radius: var(--radius);
  background: #fff;
  border: 1px solid var(--border);
}
.card__media img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.card__title {
  padding-inline: 8px;
  font-size: 1.375rem;
  font-weight: 800;
}

@media (max-width: 860px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
