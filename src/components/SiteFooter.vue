<script setup>
import { ref } from 'vue'
import { footer } from '@/data/content.js'
import { gsap, useMotion } from '@/lib/motion.js'

const year = new Date().getFullYear()
const root = ref(null)

useMotion(root, () => {
  gsap.from('.footer__grid > *', {
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.12,
    ease: 'power3.out',
    scrollTrigger: { trigger: root.value, start: 'top 88%', once: true },
  })
})
</script>

<template>
  <footer ref="root" class="footer">
    <div class="container footer__grid">
      <div class="footer__brand">
        <img src="/images/SmiceeLogoW2.png" alt="SMICEE" width="150" height="40" />
        <p>{{ footer.tagline }}</p>
        <ul class="footer__social" aria-label="Social media">
          <li v-for="s in footer.social" :key="s">
            <a href="#" class="footer__chip">{{ s }}</a>
          </li>
        </ul>
      </div>

      <nav v-for="col in footer.columns" :key="col.title" class="footer__col" :aria-label="col.title">
        <h3>{{ col.title }}</h3>
        <ul>
          <li v-for="l in col.links" :key="l"><a href="#">{{ l }}</a></li>
        </ul>
      </nav>
    </div>

    <div class="container footer__bar">
      <p>© {{ year }} {{ footer.copyright }}</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding-top: clamp(56px, 8vw, 88px);
  background: var(--ink-950);
  color: #cbd5e1;
}
.footer__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) repeat(3, minmax(0, 1fr));
  gap: 40px;
}
.footer__brand img {
  width: auto;
  height: 38px;
}
.footer__brand p {
  margin-top: 20px;
  max-width: 36ch;
  color: #94a3b8;
}
.footer__social {
  margin-top: 24px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.footer__chip {
  display: inline-block;
  padding: 8px 16px;
  border-radius: 999px;
  border: 1px solid rgb(255 255 255 / 0.16);
  font-size: 0.875rem;
  font-weight: 600;
  transition:
    background-color 0.2s,
    border-color 0.2s;
}
.footer__chip:hover {
  background: var(--primary);
  border-color: var(--primary);
  color: #fff;
}
.footer__col h3 {
  font-size: 1rem;
  color: #fff;
}
.footer__col ul {
  margin-top: 16px;
  display: grid;
  gap: 10px;
}
.footer__col a {
  color: #94a3b8;
  transition: color 0.2s;
}
.footer__col a:hover {
  color: #fff;
}
.footer__bar {
  margin-top: 56px;
  padding-block: 24px;
  border-top: 1px solid rgb(255 255 255 / 0.1);
  font-size: 0.875rem;
  color: #64748b;
}

@media (max-width: 860px) {
  .footer__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  .footer__brand {
    grid-column: 1 / -1;
  }
}
@media (max-width: 520px) {
  .footer__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
