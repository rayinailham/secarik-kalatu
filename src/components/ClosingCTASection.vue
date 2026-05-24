<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const root = ref(null)
let ctx = null

const links = [
  {
    id: 'tokopedia',
    label: 'Belanja di Tokopedia',
    note: '@kalatustudio',
    href: 'https://www.tokopedia.com/kalatustudio',
  },
  {
    id: 'shopee',
    label: 'Belanja di Shopee',
    note: '@secarik.kalatu',
    href: 'https://shopee.co.id/secarik.kalatu',
  },
  {
    id: 'tiktok',
    label: 'Tonton di TikTok',
    note: '@secarik.kalatu',
    href: 'https://www.tiktok.com/@secarik.kalatu',
  },
  {
    id: 'instagram',
    label: 'Lihat di Instagram',
    note: '@secarik.kalatu',
    href: 'https://www.instagram.com/secarik.kalatu/',
  },
]

onMounted(() => {
  if (!root.value) return
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  ctx = gsap.context((self) => {
    const headBits = self.selector('.closing__head [data-anim]')
    const items = self.selector('.closing__link')

    if (reduced) {
      gsap.set([...headBits, ...items], { autoAlpha: 1, y: 0 })
      return
    }

    gsap.set(headBits, { autoAlpha: 0, y: 20 })
    gsap.set(items, { autoAlpha: 0, y: 18 })

    if (headBits.length) {
      gsap.to(headBits, {
        autoAlpha: 1,
        y: 0,
        duration: 1.2,
        ease: 'power2.out',
        stagger: 0.16,
        scrollTrigger: {
          trigger: '.closing__head',
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      })
    }

    gsap.to(items, {
      autoAlpha: 1,
      y: 0,
      duration: 1.1,
      ease: 'power2.out',
      stagger: 0.12,
      scrollTrigger: {
        trigger: '.closing__list',
        start: 'top 90%',
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
  <section ref="root" class="closing" aria-label="Pilih secarik untukmu">
    <div class="shell closing__shell">
      <header class="closing__head">
        <p class="eyebrow" data-anim>04 &mdash; Penutup</p>
        <h2 class="closing__title serif" data-anim>
          Pilih secarik untukmu.
        </h2>
        <p class="closing__sub mono" data-anim>
          Atau buat hadiah untuk teman yang suka membaca. Tiap pesanan bantu
          satu helai kain hidup lebih lama.
        </p>
      </header>

      <ul class="closing__list" role="list">
        <li
          v-for="l in links"
          :key="l.id"
          class="closing__link"
        >
          <a
            class="closing__a"
            :href="l.href"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="closing__label serif">{{ l.label }}</span>
            <span class="closing__note mono">{{ l.note }}</span>
            <span class="closing__arrow" aria-hidden="true">&#10230;</span>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.closing {
  padding-top: clamp(80px, 12vh, 144px);
  padding-bottom: clamp(80px, 12vh, 144px);
  background: var(--bg-soft);
  overflow-x: clip;
}

.closing__shell {
  max-width: 1560px;
  display: grid;
  gap: clamp(48px, 8vh, 96px);
}

.closing__head {
  display: grid;
  gap: 18px;
  max-width: none;
}
.closing__title {
  font-family: var(--serif);
  font-style: italic;
  font-weight: 400;
  font-size: clamp(36px, 5vw, 64px);
  line-height: 1;
  letter-spacing: -0.02em;
  color: var(--ink);
  margin: 0;
}
.closing__sub {
  font-family: var(--mono);
  font-size: 12px;
  line-height: 1.7;
  color: var(--ink-soft);
  margin: 0;
  max-width: none;
}

.closing__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0;
  border-top: 1px solid var(--line);
}
.closing__link {
  border-bottom: 1px solid var(--line);
}
.closing__a {
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  gap: clamp(20px, 4vw, 56px);
  padding: clamp(24px, 4vh, 40px) 0;
  text-decoration: none;
  color: var(--ink);
  transition:
    padding-left 600ms var(--ease),
    color 300ms var(--ease);
}
.closing__a:hover,
.closing__a:focus-visible {
  padding-left: clamp(8px, 1.5vw, 20px);
  outline: none;
}
.closing__a:focus-visible {
  background: var(--bg-soft);
}

.closing__label {
  font-family: var(--serif);
  font-style: italic;
  font-weight: 400;
  font-size: clamp(22px, 2.6vw, 34px);
  line-height: 1.1;
  color: var(--ink);
}
.closing__note {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ink-muted);
  white-space: nowrap;
}
.closing__arrow {
  font-size: 22px;
  line-height: 1;
  color: var(--ink-muted);
  transform: translateX(0);
  transition:
    transform 500ms var(--ease),
    color 300ms var(--ease);
}
.closing__a:hover .closing__arrow,
.closing__a:focus-visible .closing__arrow {
  transform: translateX(8px);
  color: var(--ink);
}

@media (max-width: 720px) {
  .closing__a {
    grid-template-columns: 1fr auto;
    grid-template-rows: auto auto;
    row-gap: 6px;
  }
  .closing__note {
    grid-column: 1;
    grid-row: 2;
  }
  .closing__arrow {
    grid-column: 2;
    grid-row: 1 / span 2;
    align-self: center;
  }
}
</style>
