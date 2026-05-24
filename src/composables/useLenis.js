import { onMounted, onBeforeUnmount, shallowRef } from 'vue'
import Lenis from 'lenis'

/**
 * Lenis smooth scroll composable.
 * Mounts a single Lenis instance for the page lifetime.
 * Returns the lenis ref so child components can scrollTo if needed,
 * and the live instance ref so siblings (e.g. custom scrollbar) can subscribe.
 */
export function useLenis(options = {}) {
  const lenisRef = shallowRef(null)
  let rafId = 0

  const raf = (time) => {
    lenisRef.value?.raf(time)
    rafId = requestAnimationFrame(raf)
  }

  onMounted(() => {
    lenisRef.value = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      lerp: 0.1,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      ...options,
    })
    rafId = requestAnimationFrame(raf)
  })

  onBeforeUnmount(() => {
    cancelAnimationFrame(rafId)
    lenisRef.value?.destroy()
    lenisRef.value = null
  })

  return {
    lenis: lenisRef,
    scrollTo(target, opts) {
      lenisRef.value?.scrollTo(target, opts)
    },
  }
}
