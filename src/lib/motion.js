import { onBeforeUnmount, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

/**
 * Run a component's GSAP animation, scoped to its root element.
 * `setup({ desktop, hover })` only runs when the visitor has not asked for reduced motion,
 * so with reduced motion the page simply shows its final state (nothing is hidden up front).
 * Whatever `setup` returns is called as cleanup, and every tween/trigger made inside is reverted on unmount.
 */
export function useMotion(root, setup) {
  let mm
  onMounted(() => {
    mm = gsap.matchMedia(root.value)
    mm.add(
      {
        motion: '(prefers-reduced-motion: no-preference)',
        desktop: '(min-width: 900px)',
        hover: '(hover: hover) and (pointer: fine)',
      },
      (ctx) => {
        const { motion, desktop, hover } = ctx.conditions
        if (!motion) return
        return setup({ desktop, hover, el: root.value })
      },
    )
  })
  onBeforeUnmount(() => mm?.revert())
}
