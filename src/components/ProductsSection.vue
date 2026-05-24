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
    shortName: 'Pusta',
    image: '/pusta-book-sleeve.webp',
    story:
      'Sarung buku katun dengan slot di dalam dan di luar untuk pena, pembatas, atau apa pun yang ingin kamu simpan secara dekat. Untuk melindungi buku-buku dari serangan kotor dan lecek ketika harus melalui perjalanan panjang menemani hari-hari Kalapeeps semua.',
    links: {
      tokopedia: 'https://tk.tokopedia.com/ZSxmQVXBM/',
      shopee:
        'https://shopee.co.id/Pusta-Book-Sleeves-(Upcycled-Book-Cover-Pouch)-i.628026627.43111045159?extraParams=%7B%22display_model_id%22%3A415182502113%2C%22model_selection_logic%22%3A3%7D',
      tiktok: 'https://vt.tokopedia.com/t/ZS9Yqumu5mEYY-ewMEe/',
    },
  },
  {
    id: 'porta',
    name: 'Porta Book Pouch',
    shortName: 'Porta',
    image: '/porta-book-pouch.webp',
    story:
      'Kantung buku dengan string & washer (tali dan kancing) sebagai pengencang. Terinspirasi amplop lawas—Manila & Airmail Envelope—yang dibuka tanpa lem agar isi tetap utuh, dan agar amplop tak hanya sekali pakai, melainkan bisa digunakan kembali.',
    links: {
      tokopedia: 'https://tk.tokopedia.com/ZSxmQ7QNR/',
      shopee:
        'https://shopee.co.id/Porta-Book-Pouch-Book-Sleeves-(Upcycled-Fabric)-i.628026627.56809791060?extraParams=%7B%22display_model_id%22%3A350928843592%2C%22model_selection_logic%22%3A3%7D',
      tiktok: 'https://vt.tokopedia.com/t/ZS9YquPqR8nCE-YSsMZ/',
    },
  },
  {
    id: 'embroidery',
    name: 'Embroidery Bookmark',
    shortName: 'Embroidery',
    image: '/embroidery-bookmark.webp',
    story:
      'Pembatas buku dari kain sisa produksi yang ditambah aplikasi hand embroidery (sulam tangan) dan tassel. Dibuat sepenuh hati sebagai identitas keberpihakan kita semua pada gaya hidup berkelanjutan—memperpanjang usia kain, mengurangi limbah di sekitar.',
    links: {
      tokopedia: 'https://tk.tokopedia.com/ZSxmCB8SW/',
      shopee: '',
      tiktok: 'https://vt.tokopedia.com/t/ZS9YquC3KvVHb-RLJZG/',
    },
  },
  {
    id: 'bookmark',
    name: 'Bookmark Upcycled Fabric',
    shortName: 'Bookmark',
    image: '/bookmark-upcycled-fabric.webp',
    story:
      'Pembatas buku dari kain sisa produksi yang ditambahkan tassel. Dibuat sepenuh hati sebagai identitas keberpihakan kita semua pada gaya hidup berkelanjutan—memperpanjang usia kain, mengurangi limbah di sekitar.',
    links: {
      tokopedia: 'https://tk.tokopedia.com/ZSxmCSRbx/',
      shopee: '',
      tiktok: 'https://vt.tokopedia.com/t/ZS9YquHuXWthD-EroIX/',
    },
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
                :alt="`${p.name} — ${p.shortName} dari Secarik Kalatu, book accessories upcycled fabric`"
                width="800"
                height="1000"
                loading="lazy"
                decoding="async"
              />
            </figure>

            <div class="card__body">
              <h3 class="card__name serif">{{ p.name }}</h3>
              <p class="card__story mono">{{ p.story }}</p>
              <ul class="card__shops" role="list">
                <li>
                  <a
                    class="card__shop card__shop--tokopedia"
                    :href="p.links.tokopedia || '#'"
                    target="_blank"
                    rel="noopener noreferrer"
                    :aria-label="`Lihat ${p.shortName} di Tokopedia`"
                  >
                    <img
                      src="/svg/tokopedia-svgrepo-com.svg"
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                    />
                    <span class="card__shop-label">Lihat {{ p.shortName }} di Tokopedia</span>
                  </a>
                </li>
                <li>
                  <a
                    class="card__shop card__shop--shopee"
                    v-if="p.links.shopee"
                    :href="p.links.shopee"
                    target="_blank"
                    rel="noopener noreferrer"
                    :aria-label="`Lihat ${p.shortName} di Shopee`"
                  >
                    <img
                      src="/svg/shopee-svgrepo-com.svg"
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                    />
                    <span class="card__shop-label">Lihat {{ p.shortName }} di Shopee</span>
                  </a>
                  <span
                    v-else
                    class="card__shop card__shop--shopee card__shop--disabled"
                    role="link"
                    aria-disabled="true"
                    :aria-label="`${p.shortName} belum tersedia di Shopee`"
                  >
                    <img
                      src="/svg/shopee-svgrepo-com.svg"
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                    />
                    <span class="card__shop-label">Belum tersedia di Shopee</span>
                  </span>
                </li>
                <li>
                  <a
                    class="card__shop card__shop--tiktok"
                    :href="p.links.tiktok || '#'"
                    target="_blank"
                    rel="noopener noreferrer"
                    :aria-label="`Lihat ${p.shortName} di TikTok`"
                  >
                    <img
                      src="/svg/tiktok-svgrepo-outlined-com.svg"
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                    />
                    <span class="card__shop-label">Lihat {{ p.shortName }} di TikTok</span>
                  </a>
                </li>
              </ul>
            </div>
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

.card__shops {
  list-style: none;
  margin: 14px 0 0;
  padding: 0;
  display: inline-flex;
  align-items: center;
  gap: 18px;
}
.card__shop {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  color: var(--ink);
  text-decoration: none;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  opacity: 0.7;
  transition:
    opacity 280ms var(--ease),
    transform 280ms var(--ease);
}
.card__shop img {
  width: 22px;
  height: 22px;
  display: block;
  object-fit: contain;
}
.card__shop--tiktok img {
  transform: translateY(1px);
}
.card__shop:hover,
.card__shop:focus-visible {
  opacity: 1;
  transform: translateY(-1px);
}
.card__shop:focus-visible {
  outline: 1px solid var(--ink);
  outline-offset: 4px;
}
.card__shop--disabled {
  cursor: not-allowed;
  opacity: 0.28;
  filter: grayscale(1);
  position: relative;
}
.card__shop--disabled::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 4px;
  right: 4px;
  height: 1px;
  background: currentColor;
  transform: rotate(-18deg);
  pointer-events: none;
}
.card__shop--disabled:hover,
.card__shop--disabled:focus-visible {
  opacity: 0.42;
  transform: none;
}
.card__shop-label {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translate(-50%, 4px);
  white-space: nowrap;
  font-family: var(--mono);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--bg-soft);
  background: var(--ink);
  padding: 6px 10px;
  opacity: 0;
  pointer-events: none;
  transition:
    opacity 240ms var(--ease),
    transform 240ms var(--ease);
}
.card__shop:hover .card__shop-label,
.card__shop:focus-visible .card__shop-label {
  opacity: 1;
  transform: translate(-50%, 0);
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
