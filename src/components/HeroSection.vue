<script setup>
import { ref } from 'vue'
import { hero } from '@/data/content.js'
import { gsap, useMotion } from '@/lib/motion.js'

const root = ref(null)

useMotion(root, () => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  tl.from('.hero__eyebrow', { y: 16, opacity: 0, duration: 0.6 })
    .from('.hero__title .w', { opacity: 0, filter: 'blur(10px)', yPercent: 35, rotation: 2, duration: 0.9, stagger: 0.14 }, '-=0.3')
    .from('.hero__tagline', { y: 24, opacity: 0, duration: 0.7 }, '-=0.45')
    .from('.hero__text', { y: 24, opacity: 0, duration: 0.7 }, '-=0.5')
    .from('.hero__actions .btn', { y: 24, opacity: 0, duration: 0.6, stagger: 0.1 }, '-=0.45')
    .from('.hero__visual', { y: 70, opacity: 0, scale: 0.92, duration: 1.2 }, 0.25)
    .from('.chip', { scale: 0, opacity: 0, duration: 0.7, stagger: 0.18, ease: 'back.out(2.2)' }, '-=0.5')

  // Scroll parallax: the dashboard, chips and copy move at different speeds
  const scrub = { trigger: root.value, start: 'top top', end: 'bottom top', scrub: 0.6 }
  gsap.to('.hero__frame', { y: -50, ease: 'none', scrollTrigger: scrub })
  gsap.to('.chip--a', { y: -90, ease: 'none', scrollTrigger: scrub })
  gsap.to('.chip--b', { y: -30, ease: 'none', scrollTrigger: scrub })

})
</script>

<template>
  <section id="home" ref="root" class="hero">
    <div class="container hero__inner">
      <div class="hero__copy">
        <p class="eyebrow hero__eyebrow"><i class="pulse-dot" aria-hidden="true" />{{ hero.eyebrow }}</p>
        <h1 class="hero__title">
          <span class="line"><span class="w">Manage</span></span>
          <span class="line"><span class="w text-gradient">Everything</span></span>
        </h1>
        <p class="hero__tagline">{{ hero.tagline }}</p>
        <p class="hero__text">{{ hero.text }}</p>
        <div class="hero__actions">
          <a :href="hero.primary.href" class="btn btn--primary">{{ hero.primary.label }}</a>
          <a :href="hero.secondary.href" class="btn btn--ghost">{{ hero.secondary.label }}</a>
        </div>
      </div>

      <div class="hero__visual">
        <div class="hero__frame">
          <div class="hero__dots" aria-hidden="true"><i /><i /><i /></div>
          <img src="/images/Dashboard.jpg" alt="SMICEE dashboard: projects, clients, tasks, revenue and sales overview" width="1280" height="749" />
        </div>
        <div class="chip chip--a" aria-hidden="true"><b>+12.5%</b> Earning</div>
        <div class="chip chip--b" aria-hidden="true"><b>176</b> Tasks</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  padding-top: calc(var(--nav-h) + clamp(32px, 6vw, 72px));
  padding-bottom: var(--section-y);
}
.hero__inner {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
  align-items: center;
  gap: clamp(32px, 5vw, 72px);
}
.hero__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 7px 16px;
  border-radius: 999px;
  background: var(--primary-soft);
}
.hero__title {
  margin-top: 20px;
  font-size: var(--fs-hero);
  font-weight: 800;
  letter-spacing: -0.035em;
}
/* each word sits in a clipped line so it can rise into view */
.hero__title .line {
  display: block;
  overflow: hidden;
  padding-bottom: 0.08em;
}
.hero__title .w {
  display: inline-block;
}
.hero__tagline {
  margin-top: 20px;
  font-family: var(--font-display);
  font-size: clamp(1.125rem, 1rem + 0.6vw, 1.5rem);
  font-weight: 700;
  color: var(--navy);
}
.hero__text {
  margin-top: 10px;
  max-width: 34ch;
  font-size: var(--fs-lead);
  color: var(--text-muted);
}
.hero__actions {
  margin-top: 32px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.hero__visual {
  position: relative;
  perspective: 1400px;
}
.hero__frame {
  overflow: hidden;
  border-radius: var(--radius-lg);
  background: #fff;
  border: 1px solid var(--border);
  box-shadow: var(--shadow-lg);
  transform-style: preserve-3d;
}
.hero__dots {
  display: flex;
  gap: 6px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
  background: #fafbff;
}
.hero__dots i {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--border);
}
.hero__dots i:nth-child(1) {
  background: #ff6a6a;
}
.hero__dots i:nth-child(2) {
  background: var(--amber);
}
.hero__dots i:nth-child(3) {
  background: #34d399;
}
.chip {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 999px;
  background: #fff;
  box-shadow: var(--shadow-lg);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-muted);
}
.chip b {
  font-family: var(--font-display);
  font-size: 1rem;
  color: var(--navy);
}
.chip--a {
  top: -18px;
  left: -14px;
}
.chip--a b {
  color: var(--green);
}
.chip--b {
  right: -10px;
  bottom: 28px;
}

@media (max-width: 900px) {
  .hero__inner {
    grid-template-columns: 1fr;
  }
  .chip--a {
    left: 8px;
  }
  .chip--b {
    right: 8px;
  }
}
</style>
