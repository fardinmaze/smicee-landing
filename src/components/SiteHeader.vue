<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { nav } from '@/data/content.js'
import { gsap, useMotion } from '@/lib/motion.js'

const root = ref(null)
const scrolled = ref(false)
const menuOpen = ref(false)
const openDropdown = ref(null) // label of the open desktop dropdown

const onScroll = () => (scrolled.value = window.scrollY > 8)
const closeAll = () => {
  menuOpen.value = false
  openDropdown.value = null
}
const onKey = (e) => e.key === 'Escape' && closeAll()

useMotion(root, () => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  tl.from('.header__bar', { y: -90, opacity: 0, duration: 0.9 })
    .from('.header__nav .header__item', { y: -14, opacity: 0, duration: 0.5, stagger: 0.07 }, '-=0.4')
    .from('.header__cta', { scale: 0.7, opacity: 0, duration: 0.5, ease: 'back.out(2)' }, '-=0.3')
})

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKey)
})
</script>

<template>
  <header ref="root" class="header" :class="{ 'header--solid': scrolled || menuOpen }">
    <div class="container header__bar">
      <a href="#home" class="header__logo" aria-label="SMICEE home" @click="closeAll">
        <img src="/images/SmiceeLogoB2.png" alt="SMICEE" width="150" height="40" />
      </a>

      <nav class="header__nav" :class="{ 'is-open': menuOpen }" aria-label="Main">
        <ul>
          <li
            v-for="item in nav.links"
            :key="item.label"
            class="header__item"
            @mouseenter="item.children && (openDropdown = item.label)"
            @mouseleave="openDropdown = null"
          >
            <a v-if="!item.children" :href="item.href" class="header__link" @click="closeAll">{{ item.label }}</a>
            <template v-else>
              <button
                type="button"
                class="header__link"
                :aria-expanded="openDropdown === item.label"
                @click="openDropdown = openDropdown === item.label ? null : item.label"
              >
                {{ item.label }}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
                </svg>
              </button>
              <ul v-show="openDropdown === item.label" class="header__drop">
                <li v-for="c in item.children" :key="c.label">
                  <a
                    :href="c.href"
                    :target="c.href.startsWith('http') ? '_blank' : null"
                    :rel="c.href.startsWith('http') ? 'noopener' : null"
                    @click="closeAll"
                  >
                    {{ c.label }}
                  </a>
                </li>
              </ul>
            </template>
          </li>
        </ul>
        <a :href="nav.cta.href" class="btn btn--primary btn--sm header__cta-mobile" @click="closeAll">
          {{ nav.cta.label }}
        </a>
      </nav>

      <a :href="nav.cta.href" class="btn btn--primary btn--sm header__cta">{{ nav.cta.label }}</a>

      <button
        type="button"
        class="header__burger"
        :aria-expanded="menuOpen"
        aria-label="Toggle menu"
        @click="menuOpen = !menuOpen"
      >
        <span /><span /><span />
      </button>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 50;
  transition:
    background-color 0.3s var(--ease-out),
    box-shadow 0.3s var(--ease-out),
    backdrop-filter 0.3s;
}
.header--solid {
  background: rgb(255 255 255 / 0.88);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow: 0 1px 0 var(--border);
}
.header__bar {
  display: flex;
  align-items: center;
  gap: 24px;
  height: var(--nav-h);
}
.header__logo img {
  width: auto;
  height: 38px;
}
.header__nav {
  margin-left: auto;
}
.header__nav > ul {
  display: flex;
  gap: 4px;
}
.header__item {
  position: relative;
}
.header__link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  border-radius: 999px;
  font-family: var(--font-display);
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--navy);
  transition:
    background-color 0.2s,
    color 0.2s;
}
.header__link:hover {
  background: var(--primary-soft);
  color: var(--primary);
}
.header__drop {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  min-width: 270px;
  padding: 8px;
  border-radius: var(--radius);
  background: #fff;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border);
}
.header__drop a {
  display: block;
  padding: 10px 14px;
  border-radius: 10px;
  font-size: 0.9375rem;
  font-weight: 500;
}
.header__drop a:hover {
  background: var(--primary-soft);
  color: var(--primary);
}
.header__cta-mobile {
  display: none;
}
.header__burger {
  display: none;
  width: 44px;
  height: 44px;
  margin-left: auto;
  border-radius: 12px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
}
.header__burger span {
  width: 20px;
  height: 2px;
  border-radius: 2px;
  background: var(--navy);
}

@media (max-width: 960px) {
  .header__cta {
    display: none;
  }
  .header__burger {
    display: flex;
  }
  .header__nav {
    position: absolute;
    top: var(--nav-h);
    left: 0;
    right: 0;
    display: none;
    max-height: calc(100dvh - var(--nav-h));
    overflow-y: auto;
    padding: 12px var(--gutter) 24px;
    background: #fff;
    border-bottom: 1px solid var(--border);
  }
  .header__nav.is-open {
    display: block;
  }
  .header__nav > ul {
    flex-direction: column;
  }
  .header__link {
    width: 100%;
    justify-content: space-between;
    padding: 14px 12px;
  }
  .header__drop {
    position: static;
    min-width: 0;
    margin: 0 0 8px 8px;
    box-shadow: none;
    border: 0;
    border-left: 2px solid var(--primary-soft);
    border-radius: 0;
  }
  .header__cta-mobile {
    display: inline-flex;
    width: 100%;
    margin-top: 12px;
  }
}
</style>
