<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const root = ref(null)
let ctx = null

// Hand-picked from /public/Past Catalog. Mix orientation & subject:
// detail texture, in-context, full pouch, bookmark close-ups.
const base = '/Past Catalog'
const shots = [
  { src: `${base}/6.jpg`, alt: 'Lorem ipsum dolor sit amet', date: '08 · 31 · 25', span: 5 },
  { src: `${base}/2.jpg`, alt: 'Consectetur adipiscing elit', date: '02 · 06 · 26', span: 4 },
  { src: `${base}/3.jpg`, alt: 'Sed do eiusmod tempor', date: '02 · 06 · 26', span: 3 },
  { src: `${base}/4.jpg`, alt: 'Incididunt ut labore', date: '02 · 06 · 26', span: 4 },
  { src: `${base}/5.jpg`, alt: 'Ut enim ad minim veniam', date: '02 · 06 · 26', span: 5 },
  { src: `${base}/1.jpg`, alt: 'Quis nostrud exercitation', date: '02 · 06 · 26', span: 3 },
  { src: `${base}/7.jpg`, alt: 'Duis aute irure dolor', date: '02 · 06 · 26', span: 3 },
  { src: `${base}/8.jpg`, alt: 'Excepteur sint occaecat', date: '02 · 06 · 26', span: 5 },
  { src: `${base}/9.jpg`, alt: 'Cupidatat non proident', date: '02 · 06 · 26', span: 4 },
]

onMounted(() => {
  if (!root.value) return
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  ctx = gsap.context((self) => {
    const headBits = self.selector('.archive__head [data-anim]')
    const items = self.selector('.archive__item')

    if (reduced) {
      gsap.set([...headBits, ...items], { autoAlpha: 1, y: 0 })
      return
    }

    gsap.set(headBits, { autoAlpha: 0, y: 18 })
    gsap.set(items, { autoAlpha: 0, y: 32 })

    if (headBits.length) {
      gsap.to(headBits, {
        autoAlpha: 1,
        y: 0,
        duration: 1.2,
        ease: 'power2.out',
        stagger: 0.16,
        scrollTrigger: {
          trigger: '.archive__head',
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      })
    }

    items.forEach((el, i) => {
      gsap.to(el, {
        autoAlpha: 1,
        y: 0,
        duration: 1.4,
        ease: 'power2.out',
        delay: (i % 3) * 0.08,
        scrollTrigger: {
          trigger: el,
          start: 'top 92%',
          toggleActions: 'play none none none',
        },
      })
    })
  }, root.value)
})

onBeforeUnmount(() => {
  ctx?.revert()
  ctx = null
})
</script>

<template>
  <section ref="root" class="archive" aria-label="Arsip edisi yang sudah berpulang">
    <div class="shell archive__shell">
      <header class="archive__head">
        <p class="eyebrow" data-anim>04 &mdash; Arsip</p>
        <div class="archive__title-wrap">
          <h2 class="archive__title serif" data-anim>
            Edisi yang sudah pulang.
          </h2>
          <p class="archive__count mono" data-anim>{{ shots.length }} dari 59 keping</p>
        </div>
        <p class="archive__sub mono" data-anim>
          Tiap drop dijahit sekali. Begitu habis, ia tinggal jadi catatan &mdash; foto
          yang menemani kami mengingat motif, warna, dan tangan yang menyentuhnya.
        </p>
      </header>

      <ul class="archive__grid" role="list">
        <li
          v-for="(s, i) in shots"
          :key="s.src"
          class="archive__item"
          :class="`archive__item--span-${s.span}`"
          :style="{ '--i': i }"
        >
          <figure class="archive__media">
            <img
              :src="s.src"
              :alt="s.alt"
              loading="lazy"
              decoding="async"
            />
          </figure>
          <figcaption class="archive__caption mono">
            <span class="archive__date">{{ s.date }}</span>
            <span class="archive__dot" aria-hidden="true">&middot;</span>
            <span class="archive__alt">{{ s.alt }}</span>
          </figcaption>
        </li>
      </ul>

      <footer class="archive__foot">
        <p class="archive__note mono">
          Lihat behind-the-scene drop selanjutnya di TikTok &amp; Instagram &mdash;
          @secarik.kalatu.
        </p>
      </footer>
    </div>
  </section>
</template>

<style scoped>
.archive {
  padding-top: clamp(72px, 11vh, 128px);
  padding-bottom: clamp(72px, 11vh, 128px);
  background: var(--bg);
  overflow-x: clip;
}

.archive__shell {
  max-width: 1560px;
  display: grid;
  gap: clamp(48px, 8vh, 96px);
}

.archive__head {
  display: grid;
  gap: 18px;
  max-width: none;
}
.archive__title-wrap {
  display: flex;
  align-items: baseline;
  gap: 18px;
  flex-wrap: wrap;
}
.archive__title {
  font-family: var(--serif);
  font-style: italic;
  font-weight: 400;
  font-size: clamp(30px, 3.6vw, 48px);
  line-height: 1.05;
  letter-spacing: -0.015em;
  color: var(--ink);
  margin: 0;
}
.archive__count {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--ink-muted);
}
.archive__sub {
  font-family: var(--mono);
  font-size: 12px;
  line-height: 1.7;
  color: var(--ink-soft);
  margin: 0;
  max-width: 62ch;
}

/* asymmetric editorial mosaic — 12-col grid with varied spans */
.archive__grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: clamp(20px, 2.4vw, 36px);
}
.archive__item {
  margin: 0;
  display: grid;
  gap: 10px;
  align-self: start;
}
.archive__item--span-3 { grid-column: span 3; }
.archive__item--span-4 { grid-column: span 4; }
.archive__item--span-5 { grid-column: span 5; }

/* editorial vertical cadence — offset alternates so the eye drifts */
.archive__item:nth-child(2) { padding-top: 56px; }
.archive__item:nth-child(3) { padding-top: 24px; }
.archive__item:nth-child(5) { padding-top: 40px; }
.archive__item:nth-child(7) { padding-top: 32px; }
.archive__item:nth-child(9) { padding-top: 64px; }

.archive__media {
  margin: 0;
  width: 100%;
  background: var(--bg-soft);
  overflow: hidden;
  border: 1px solid var(--line);
}
.archive__item--span-3 .archive__media { aspect-ratio: 3 / 4; }
.archive__item--span-4 .archive__media { aspect-ratio: 4 / 5; }
.archive__item--span-5 .archive__media { aspect-ratio: 4 / 3; }

.archive__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1.4s var(--ease), filter 1.2s var(--ease);
  filter: saturate(0.94);
}
.archive__item:hover .archive__media img {
  transform: scale(1.025);
  filter: saturate(1);
}

.archive__caption {
  display: flex;
  align-items: baseline;
  gap: 8px;
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-muted);
  line-height: 1.4;
  flex-wrap: wrap;
}
.archive__date {
  color: var(--ink-soft);
  font-weight: 500;
  white-space: nowrap;
}
.archive__dot {
  color: var(--ink-muted);
  opacity: 0.6;
}
.archive__alt {
  font-style: italic;
  font-family: var(--serif);
  text-transform: none;
  letter-spacing: 0;
  font-size: 12px;
  color: var(--ink-muted);
}

.archive__foot {
  border-top: 1px solid var(--line);
  padding-top: 24px;
}
.archive__note {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.06em;
  color: var(--ink-muted);
  margin: 0;
  max-width: 60ch;
}

@media (max-width: 1080px) {
  .archive__item--span-3 { grid-column: span 6; }
  .archive__item--span-4 { grid-column: span 6; }
  .archive__item--span-5 { grid-column: span 12; }
  .archive__item:nth-child(n) { padding-top: 0; }
  .archive__item:nth-child(even) { padding-top: 28px; }
  .archive__item--span-5 .archive__media { aspect-ratio: 16 / 10; }
}

@media (max-width: 640px) {
  .archive__item--span-3,
  .archive__item--span-4,
  .archive__item--span-5 {
    grid-column: span 12;
  }
  .archive__item:nth-child(even) { padding-top: 0; }
  .archive__item--span-3 .archive__media,
  .archive__item--span-4 .archive__media,
  .archive__item--span-5 .archive__media {
    aspect-ratio: 4 / 5;
  }
  .archive__alt { display: none; }
}
</style>
