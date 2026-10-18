<script setup>
import { ref } from 'vue'
import { showcase } from '@/data/content.js'
import { gsap, useMotion } from '@/lib/motion.js'

const root = ref(null)

useMotion(root, () => {
  gsap.utils.toArray('.row', root.value).forEach((row, i) => {
    const flip = i % 2 === 1
    const copy = row.querySelector('.row__copy')
    const media = row.querySelector('.row__media')
    const img = row.querySelector('img')

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: { trigger: row, start: 'top 78%', once: true },
    })
    tl.from(copy.children, { x: flip ? 60 : -60, opacity: 0, duration: 0.9, stagger: 0.12 })
      .from(media, { x: flip ? -80 : 80, opacity: 0, scale: 0.92, duration: 1.1 }, 0.1)
      .from(img, { scale: 1.12, duration: 1.4 }, 0.1)

    // The picture moves a little inside its frame while scrolling past
    gsap.fromTo(
      img,
      { yPercent: -5 },
      {
        yPercent: 5,
        ease: 'none',
        scrollTrigger: { trigger: row, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
      },
    )
  })
})
</script>

<template>
  <section ref="root" class="section">
    <div class="container rows">
      <article v-for="(row, i) in showcase" :key="row.title" class="row" :class="{ 'row--flip': i % 2 }">
        <div class="row__copy">
          <p class="eyebrow">{{ row.eyebrow }}</p>
          <h2 class="row__title">{{ row.title }}</h2>
          <p class="row__text">{{ row.text }}</p>
          <a href="#contact" class="btn btn--primary row__cta">{{ row.cta }}</a>
        </div>
        <div class="row__media">
          <img :src="row.image" :alt="row.alt" />
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.rows {
  display: grid;
  gap: clamp(56px, 8vw, 104px);
}
.row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  align-items: center;
  gap: clamp(28px, 5vw, 72px);
}
.row--flip .row__copy {
  order: 2;
}
.row__title {
  margin-top: 12px;
  font-size: var(--fs-h2);
  font-weight: 800;
}
.row__text {
  margin-top: 16px;
  max-width: 44ch;
  font-size: var(--fs-lead);
  color: var(--text-muted);
}
.row__cta {
  margin-top: 28px;
}
.row__media {
  display: grid;
  place-items: center;
  padding: clamp(20px, 3vw, 40px);
  overflow: hidden;
  border-radius: var(--radius-xl);
  background:
    radial-gradient(80% 80% at 100% 0%, #eeedff 0%, transparent 70%),
    radial-gradient(70% 70% at 0% 100%, #fff1f5 0%, transparent 70%), #fff;
  border: 1px solid var(--border);
}
.row__media img {
  width: 100%;
  max-width: 520px;
  border-radius: var(--radius);
  box-shadow: var(--shadow-lg);
}

@media (max-width: 860px) {
  .row {
    grid-template-columns: 1fr;
  }
  .row--flip .row__copy {
    order: 0;
  }
}
</style>
