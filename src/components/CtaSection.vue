<script setup>
import { ref } from 'vue'
import { cta } from '@/data/content.js'
import { gsap, useMotion } from '@/lib/motion.js'

const root = ref(null)
const email = ref('')
const sent = ref(false)

// TODO: not connected to a backend or mailing list yet. This only shows the confirmation state.
function subscribe() {
  sent.value = true
  email.value = ''
  gsap.from('.cta__thanks', { scale: 0.7, opacity: 0, duration: 0.6, ease: 'back.out(2)', delay: 0.02 })
}

useMotion(root, () => {
  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' },
    scrollTrigger: { trigger: root.value, start: 'top 72%', once: true },
  })
  tl.from('.cta__card', { y: 80, opacity: 0, scale: 0.94, duration: 1 })
    .from('.cta__title', { y: 30, opacity: 0, duration: 0.8 }, '-=0.5')
    .from('.cta__text', { y: 20, opacity: 0, duration: 0.6 }, '-=0.5')
    .from('.cta__form', { y: 24, opacity: 0, scale: 0.92, duration: 0.7 }, '-=0.4')

  // Soft orbs circle around the card
  gsap.utils.toArray('.orb', root.value).forEach((orb, i) => {
    gsap.to(orb, {
      x: gsap.utils.random(-40, 40),
      y: gsap.utils.random(-30, 30),
      duration: gsap.utils.random(4, 7),
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: -i * 1.5,
    })
  })
})
</script>

<template>
  <section id="contact" ref="root" class="cta">
    <div class="container">
      <div class="cta__card">
        <span class="orb orb--a" aria-hidden="true" />
        <span class="orb orb--b" aria-hidden="true" />
        <h2 class="cta__title">{{ cta.title }}</h2>
        <p class="cta__text">{{ cta.text }}</p>

        <form v-if="!sent" class="cta__form" @submit.prevent="subscribe">
          <label class="sr-only" for="cta-email">{{ cta.placeholder }}</label>
          <input id="cta-email" v-model.trim="email" type="email" required :placeholder="cta.placeholder" autocomplete="email" />
          <button type="submit" class="btn btn--primary">{{ cta.button }}</button>
        </form>
        <p v-else class="cta__thanks" role="status">Thanks! You are on the list.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta {
  padding-block: var(--section-y);
}
.cta__card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding: clamp(36px, 6vw, 80px) var(--gutter);
  overflow: hidden;
  text-align: center;
  border-radius: var(--radius-xl);
  background:
    radial-gradient(60% 80% at 0% 0%, #eeedff 0%, transparent 70%),
    radial-gradient(60% 80% at 100% 100%, #fff1f5 0%, transparent 70%), #fff;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  pointer-events: none;
}
.orb--a {
  top: -60px;
  left: 8%;
  width: 180px;
  height: 180px;
  background: #635bff;
  opacity: 0.22;
}
.orb--b {
  right: 6%;
  bottom: -70px;
  width: 200px;
  height: 200px;
  background: #ffb81c;
  opacity: 0.25;
}
.cta__card > :not(.orb) {
  position: relative;
}
.cta__title {
  max-width: 20ch;
  font-size: calc(var(--fs-h2) * 1.12);
  font-weight: 800;
}
.cta__text {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--primary);
}
.cta__form {
  display: flex;
  gap: 10px;
  width: min(100%, 520px);
  margin-top: 16px;
  padding: 6px;
  border-radius: 999px;
  background: #fff;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}
.cta__form input {
  flex: 1;
  min-width: 0;
  padding: 0 20px;
  border: 0;
  background: none;
  font: inherit;
  color: var(--text);
}
.cta__form input:focus {
  outline: none;
}
.cta__form:focus-within {
  border-color: var(--primary);
  box-shadow: 0 0 0 4px #635bff26;
}
.cta__thanks {
  margin-top: 16px;
  padding: 14px 24px;
  border-radius: 999px;
  background: #dcf7e8;
  font-weight: 700;
  color: #14753f;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

@media (max-width: 480px) {
  .cta__form {
    flex-direction: column;
    border-radius: var(--radius-lg);
    padding: 10px;
  }
  .cta__form input {
    min-height: 48px;
  }
}
</style>
