<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const root = ref(null)
let ctx = null

const products = [
  {
    id: 'pusta',
    name: 'Pusta Book Sleeves',
    image: '/pusta-book-sleeve.webp',
    story:
      'Sarung buku katun dengan slot di dalam dan di luar untuk pena, pembatas, atau apa pun yang ingin kamu simpan secara dekat. Untuk melindungi buku-buku dari serangan kotor dan lecek ketika harus melalui perjalanan panjang menemani hari-hari Kalapeeps semua.',
    href: 'https://tk.tokopedia.com/ZSxaKownM/',
  },
  {
    id: 'porta',
    name: 'Porta Book Pouch',
    image: '/porta-book-pouch.webp',
    story:
      'Kantung buku dengan string & washer (tali dan kancing) sebagai pengencang. Terinspirasi amplop lawas—Manila & Airmail Envelope—yang dibuka tanpa lem agar isi tetap utuh, dan agar amplop tak hanya sekali pakai, melainkan bisa digunakan kembali.',
    href: 'https://tk.tokopedia.com/ZSxaEYQCf/',
  },
  {
    id: 'embroidery',
    name: 'Embroidery Bookmark',
    image: '/embroidery-bookmark.webp',
    story:
      'Pembatas buku dari kain sisa produksi yang ditambah aplikasi hand embroidery (sulam tangan) dan tassel. Dibuat sepenuh hati sebagai identitas keberpihakan kita semua pada gaya hidup berkelanjutan—memperpanjang usia kain, mengurangi limbah di sekitar.',
    href: 'https://tk.tokopedia.com/ZSxaEJ6GK/',
  },
  {
    id: 'bookmark',
    name: 'Bookmark Upcycled Fabric',
    image: '/bookmark-upcycled-fabric.webp',
    story:
      'Pembatas buku dari kain sisa produksi yang ditambahkan tassel. Dibuat sepenuh hati sebagai identitas keberpihakan kita semua pada gaya hidup berkelanjutan—memperpanjang usia kain, mengurangi limbah di sekitar.',
    href: 'https://tk.tokopedia.com/ZSxaEREUJ/',
  },
]

onMounted(() => {
  if (!root.value) return
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  ctx = gsap.context((self) => {
    const headBits = self.selector('.products__head [data-anim]')
    const cards = self.selector('.card')
    const divider = self.selector('.products__divider')[0]

    if (reduced) {
      gsap.set([...headBits, ...cards], { autoAlpha: 1, x: 0 })
      if (divider) gsap.set(divider, { autoAlpha: 1, scaleY: 1 })
      return
    }

    // Lock initial pose immediately so CSS opacity:0 hand-off is seamless.
    gsap.set(headBits, { autoAlpha: 0, x: -60 })
    gsap.set(cards, { autoAlpha: 0, x: -90 })

    // Header: slide in from the left, gently staggered.
    if (headBits.length) {
      gsap.to(headBits, {
        autoAlpha: 1,
        x: 0,
        duration: 1.6,
        ease: 'power2.out',
        stagger: 0.18,
        scrollTrigger: {
          trigger: '.products__head',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    }

    // Cards: each drifts in slowly from the left as it enters view.
    cards.forEach((card) => {
      gsap.to(card, {
        autoAlpha: 1,
        x: 0,
        duration: 1.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      })
    })

    // Divider: draw down from top as grid enters view.
    if (divider) {
      gsap.to(divider, {
        autoAlpha: 1,
        scaleY: 1,
        duration: 1.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.products__grid-wrap',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    }
  }, root.value)
})

onBeforeUnmount(() => {
  ctx?.revert()
  ctx = null
})
</script>

<template>
  <section ref="root" class="products" aria-label="Empat secarik untuk bukumu">
    <div class="shell products__shell">
      <header class="products__head">
        <p class="eyebrow" data-anim>01 — Koleksi</p>
      </header>

      <div class="products__grid-wrap">
        <span class="products__divider" aria-hidden="true"></span>
        <ul class="products__grid" role="list">
          <li
            v-for="(p, i) in products"
            :key="p.id"
            class="card"
            :style="{ '--i': i }"
          >
            <figure class="card__media">
              <img
                :src="p.image"
                :alt="p.name"
                loading="lazy"
                decoding="async"
              />
            </figure>

            <a
              class="card__link"
              :href="p.href"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="`Lihat ${p.name} di Tokopedia`"
            >
              <div class="card__body">
                <h3 class="card__name serif">{{ p.name }}</h3>
                <p class="card__story mono">{{ p.story }}</p>
                <p class="card__cta mono" aria-hidden="true">
                  <span>Lihat di Tokopedia</span>
                  <span class="card__cta-arrow">&#10230;</span>
                </p>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.products {
  padding-top: clamp(48px, 7vh, 88px);
  padding-bottom: clamp(64px, 10vh, 120px);
  background: var(--bg-soft);
  /* prevent x: -140 initial pose from making horizontal scrollbar appear */
  overflow-x: clip;
}

.products__head {
  display: grid;
  gap: 14px;
  max-width: 720px;
  margin-bottom: clamp(48px, 8vh, 96px);
}
.eyebrow {
  margin: 0;
}
.products__title {
  font-family: var(--serif);
  font-style: italic;
  font-weight: 400;
  font-size: clamp(28px, 3.4vw, 44px);
  line-height: 1.05;
  letter-spacing: -0.015em;
  color: var(--ink);
  margin: 0;
}
.products__sub {
  font-family: var(--mono);
  font-size: 12px;
  line-height: 1.7;
  color: var(--ink-soft);
  margin: 0;
  max-width: 52ch;
}

.products__shell {
  max-width: 1560px;
}

/* asymmetric two-column grid; falls to 1 col on small screens */
.products__grid-wrap {
  position: relative;
}
@media (min-width: 880px) {
  .products__grid-wrap {
    padding-bottom: 148px;
  }
}
.products__divider {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1px;
  height: 100px;
  background: var(--line);
  transform: translate(-50%, -50%) scaleY(0);
  transform-origin: top center;
  pointer-events: none;
  opacity: 0;
}
.products__grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: clamp(40px, 6vw, 88px) clamp(110px, 14vw, 230px);
  align-items: start;
}

.card {
  display: grid;
  gap: 22px;
  /* opacity hidden initially so no flash before GSAP picks up.
     GSAP will reset autoAlpha (opacity + visibility) on play. */
  opacity: 0;
}

.card__link {
  display: grid;
  gap: 22px;
  color: inherit;
  text-decoration: none;
  outline: none;
  -webkit-tap-highlight-color: transparent;
}
.card__link:focus-visible {
  outline: 1px solid var(--ink);
  outline-offset: 6px;
}

.card__media {
  margin: 0;
  width: 100%;
  aspect-ratio: 4 / 5;
  background: var(--bg-soft);
  overflow: hidden;
  border: 1px solid var(--line);
}
.card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card__body {
  display: grid;
  gap: 8px;
  padding-top: 4px;
}

.card__index {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.26em;
  color: var(--ink-muted);
  margin: 0;
}
.card__name {
  font-family: var(--serif);
  font-style: italic;
  font-weight: 400;
  font-size: 18px;
  line-height: 1.2;
  letter-spacing: -0.005em;
  color: var(--ink);
  margin: 0;
}
.card__story {
  font-family: var(--mono);
  font-size: 11.5px;
  line-height: 1.7;
  color: var(--ink-soft);
  margin: 0;
}

.card__cta {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  font-family: var(--mono);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink-muted);
  margin: 12px 0 0;
}
.card__cta-arrow {
  display: inline-block;
  font-size: 15px;
  line-height: 1;
  transform: translate(-5px, -0.5px);
  transition: transform 500ms var(--ease);
}
.card__link:hover .card__cta-arrow,
.card__link:focus-visible .card__cta-arrow {
  transform: translate(-2px, -0.5px);
}

/* editorial cadence on desktop — use position offset so right column
   visual offset doesn't push the next row's grid track down. */
@media (min-width: 880px) {
  .card:nth-child(2),
  .card:nth-child(4) {
    position: relative;
    top: 148px;
  }
}

@media (max-width: 720px) {
  .products__shell {
    padding-inline: clamp(40px, 10vw, 64px);
  }
  .products__grid {
    grid-template-columns: 1fr;
    gap: 56px;
  }
  .card__media {
    aspect-ratio: 4 / 5;
  }
}

@media (prefers-reduced-motion: reduce) {
  .card {
    opacity: 1;
  }
}
</style>
