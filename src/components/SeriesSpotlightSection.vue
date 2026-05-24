<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const root = ref(null)
let ctx = null

// Featured drop — Porta Iris Series (26-05). Curated 1–5.
const base = '/26-05 - Porta Iris Series'
const shots = [
  { src: `${base}/1.webp`, alt: 'Lorem ipsum dolor sit amet' },
  { src: `${base}/2.webp`, alt: 'Consectetur adipiscing elit' },
  { src: `${base}/3.webp`, alt: 'Sed do eiusmod tempor' },
  { src: `${base}/4.webp`, alt: 'Incididunt ut labore et dolore' },
  { src: `${base}/5.webp`, alt: 'Ut enim ad minim veniam' },
]

onMounted(() => {
  if (!root.value) return
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  ctx = gsap.context((self) => {
    const headBits = self.selector('.spotlight__head [data-anim]')
    const items = self.selector('.spotlight__item')

    if (reduced) {
      gsap.set([...headBits, ...items], { autoAlpha: 1, y: 0 })
      return
    }

    gsap.set(headBits, { autoAlpha: 0, y: 18 })
    gsap.set(items, { autoAlpha: 0, y: 30 })

    if (headBits.length) {
      gsap.to(headBits, {
        autoAlpha: 1,
        y: 0,
        duration: 1.2,
        ease: 'power2.out',
        stagger: 0.16,
        scrollTrigger: {
          trigger: '.spotlight__head',
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      })
    }

    gsap.to(items, {
      autoAlpha: 1,
      y: 0,
      duration: 1.6,
      ease: 'power2.out',
      stagger: 0.14,
      scrollTrigger: {
        trigger: '.spotlight__gallery',
        start: 'top 88%',
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
  <section ref="root" class="spotlight" aria-label="Drop terbaru Porta Iris">
    <div class="shell spotlight__shell">
      <header class="spotlight__head">
        <p class="eyebrow" data-anim>03 &mdash; Drop terbaru</p>
        <div class="spotlight__title-wrap">
          <h2 class="spotlight__title serif" data-anim>
            Porta Iris Series
          </h2>
          <p class="spotlight__date mono" data-anim>26 &middot; 05</p>
        </div>
        <p class="spotlight__sub mono" data-anim>
          Drop kain bertema iris &mdash; perpaduan ungu kebiruan, lavender, dan
          violet pucat. Edisi terbatas, tiap pouch hanya dibuat sekali.
        </p>
      </header>

      <ul class="spotlight__gallery" role="list">
        <li
          v-for="(s, i) in shots"
          :key="s.src"
          class="spotlight__item"
          :class="`spotlight__item--${i + 1}`"
        >
          <figure class="spotlight__media">
            <img
              :src="s.src"
              :alt="s.alt"
              :loading="i === 0 ? 'eager' : 'lazy'"
              :fetchpriority="i === 0 ? 'high' : 'low'"
              decoding="async"
            />
          </figure>
        </li>
      </ul>

      <footer class="spotlight__foot">
        <a
          class="spotlight__cta mono"
          href="https://tk.tokopedia.com/ZSxaEYQCf/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>Lihat Porta di Tokopedia</span>
          <span class="spotlight__cta-arrow" aria-hidden="true">&#10230;</span>
        </a>
      </footer>
    </div>
  </section>
</template>

<style scoped>
.spotlight {
  padding-top: clamp(72px, 11vh, 128px);
  padding-bottom: clamp(72px, 11vh, 128px);
  background: var(--bg-soft);
  overflow-x: clip;
}

.spotlight__shell {
  max-width: 1560px;
  display: grid;
  gap: clamp(48px, 8vh, 96px);
}

.spotlight__head {
  display: grid;
  gap: 18px;
  max-width: none;
}
.spotlight__title-wrap {
  display: flex;
  align-items: baseline;
  gap: 18px;
  flex-wrap: wrap;
}
.spotlight__title {
  font-family: var(--serif);
  font-style: italic;
  font-weight: 400;
  font-size: clamp(30px, 3.6vw, 48px);
  line-height: 1.05;
  letter-spacing: -0.015em;
  color: var(--ink);
  margin: 0;
}
.spotlight__date {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--ink-muted);
}
.spotlight__sub {
  font-family: var(--mono);
  font-size: 12px;
  line-height: 1.7;
  color: var(--ink-soft);
  margin: 0;
  max-width: none;
}

/* asymmetric editorial gallery: 5 images, mosaic layout */
.spotlight__gallery {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: clamp(16px, 2vw, 28px);
}
.spotlight__item {
  margin: 0;
  content-visibility: auto;
  contain-intrinsic-size: 600px;
}
.spotlight__item--1 { grid-column: span 7; }
.spotlight__item--2 { grid-column: span 5; align-self: end; padding-bottom: 56px; }
.spotlight__item--3 { grid-column: span 4; padding-top: 32px; }
.spotlight__item--4 { grid-column: span 4; }
.spotlight__item--5 { grid-column: span 4; padding-top: 56px; }

.spotlight__media {
  margin: 0;
  width: 100%;
  background: var(--bg);
  overflow: hidden;
  border: 1px solid var(--line);
}
.spotlight__item--1 .spotlight__media { aspect-ratio: 4 / 3; }
.spotlight__item--2 .spotlight__media { aspect-ratio: 3 / 4; }
.spotlight__item--3 .spotlight__media { aspect-ratio: 1 / 1; }
.spotlight__item--4 .spotlight__media { aspect-ratio: 3 / 4; }
.spotlight__item--5 .spotlight__media { aspect-ratio: 4 / 3; }
.spotlight__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1.4s var(--ease);
}
.spotlight__item:hover .spotlight__media img {
  transform: scale(1.02);
}

.spotlight__foot {
  display: flex;
  justify-content: flex-start;
}
.spotlight__cta {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  font-family: var(--mono);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink);
  text-decoration: none;
  padding-bottom: 6px;
  border-bottom: 1px solid var(--ink);
}
.spotlight__cta-arrow {
  display: inline-block;
  font-size: 15px;
  line-height: 1;
  transition: transform 500ms var(--ease);
}
.spotlight__cta:hover .spotlight__cta-arrow {
  transform: translateX(4px);
}

@media (max-width: 880px) {
  .spotlight__gallery {
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }
  .spotlight__item--1,
  .spotlight__item--2,
  .spotlight__item--3,
  .spotlight__item--4 {
    grid-column: span 1;
    padding: 0;
  }
  .spotlight__item--1 .spotlight__media,
  .spotlight__item--2 .spotlight__media,
  .spotlight__item--3 .spotlight__media,
  .spotlight__item--4 .spotlight__media {
    aspect-ratio: 3 / 4;
  }
}
</style>
