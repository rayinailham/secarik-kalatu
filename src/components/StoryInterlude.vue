<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const root = ref(null)
let ctx = null

onMounted(() => {
  if (!root.value) return
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  ctx = gsap.context((self) => {
    const lines = self.selector('.interlude__line')

    if (reduced) {
      gsap.set(lines, { autoAlpha: 1, y: 0 })
      return
    }

    gsap.set(lines, { autoAlpha: 0, y: 14 })

    gsap.to(lines, {
      autoAlpha: 1,
      y: 0,
      duration: 1.1,
      ease: 'power2.out',
      stagger: 0.18,
      scrollTrigger: {
        trigger: root.value,
        start: 'top 78%',
        toggleActions: 'play none none none',
      },
    })
  }, root.value)
})

onBeforeUnmount(() => {
  ctx?.revert()
  ctx = null
})
</script>

<template>
  <section
    ref="root"
    class="interlude"
    aria-label="Mengapa Secarik Kalatu ada"
  >
    <div class="shell interlude__shell">
      <p class="interlude__copy mono">
        <span class="interlude__line">Berawal dari kain-kain sisa yang hampir terbuang</span>
        <span class="interlude__line">kami percaya setiap helai masih menyimpan cerita yang belum selesai.</span>
      </p>
    </div>
  </section>
</template>

<style scoped>
.interlude {
  background: var(--bg);
  padding: calc(clamp(56px, 9vh, 88px) + 50px) 0 calc(clamp(36px, 5vh, 56px) + 50px);
  overflow: hidden;
}

.interlude__shell {
  display: grid;
  justify-items: center;
  text-align: center;
  max-width: 1100px;
  padding-inline: var(--gutter);
  margin-inline: auto;
}

.interlude__copy {
  font-family: var(--mono);
  font-size: 12px;
  line-height: 1.6;
  letter-spacing: 0.06em;
  color: var(--ink);
  margin: 0;
  max-width: none;
  display: grid;
  gap: 4px;
}

.interlude__line {
  display: block;
  white-space: nowrap;
  will-change: transform, opacity;
}

.interlude__line:last-child {
  color: var(--ink-soft);
}

@media (max-width: 640px) {
  .interlude {
    padding: calc(clamp(40px, 7vh, 64px) + 24px) 0 calc(clamp(28px, 4vh, 40px) + 24px);
  }
  .interlude__shell {
    padding-inline: 16px;
  }
  .interlude__copy {
    font-size: 11px;
    letter-spacing: 0.02em;
    line-height: 1.7;
    gap: 10px;
    max-width: none;
    width: 100%;
    text-wrap: balance;
  }
  .interlude__line {
    white-space: normal;
  }
}
</style>
