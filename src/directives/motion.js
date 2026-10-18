// NextCart-style reveals, driven by CSS (see main.css):
//   v-words  splits a heading into words that blur in one after another
//   v-fade   fades an element up
// Both start when the element scrolls into view. With reduced motion, main.css shows everything straight away.
const seen =
  typeof IntersectionObserver === 'undefined'
    ? null
    : new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue
            entry.target.classList.add('in')
            seen.unobserve(entry.target)
          }
        },
        { threshold: 0.2, rootMargin: '0px 0px -8% 0px' },
      )

function watch(el) {
  if (seen) seen.observe(el)
  else el.classList.add('in')
}

export const words = {
  mounted(el) {
    const text = el.textContent.trim()
    el.setAttribute('aria-label', text)
    el.classList.add('words')
    el.textContent = ''
    text.split(/\s+/).forEach((w, i) => {
      const span = document.createElement('span')
      span.className = 'word'
      span.setAttribute('aria-hidden', 'true')
      span.style.setProperty('--i', i)
      span.textContent = w
      el.append(span, ' ')
    })
    watch(el)
  },
  unmounted: (el) => seen?.unobserve(el),
}

export const fade = {
  mounted(el, binding) {
    el.classList.add('fade')
    if (binding.value) el.style.setProperty('--d', `${binding.value}ms`)
    watch(el)
  },
  unmounted: (el) => seen?.unobserve(el),
}
