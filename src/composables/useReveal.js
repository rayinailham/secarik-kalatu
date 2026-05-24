import { onMounted, onBeforeUnmount } from 'vue'

/**
 * Reveal-on-scroll. Adds `is-in` to elements with `[data-reveal]`.
 * Uses IntersectionObserver, never the scroll event. Honors reduced-motion.
 */
export function useReveal() {
  let io = null

  onMounted(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const targets = document.querySelectorAll('[data-reveal]')

    if (reduced) {
      targets.forEach((el) => el.classList.add('is-in'))
      return
    }

    io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            io.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 },
    )

    targets.forEach((el) => io.observe(el))
  })

  onBeforeUnmount(() => {
    io?.disconnect()
    io = null
  })
}
