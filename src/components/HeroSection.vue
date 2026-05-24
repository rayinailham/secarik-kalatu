<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { gsap } from 'gsap'

// Hero — full-bleed hero.jpg with signature wordmark + lede centered.
// Animated in via a single GSAP timeline once web fonts have settled.

const root = ref(null)
let ctx = null
let onReady = null

onMounted(() => {
  if (!root.value) return

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  ctx = gsap.context((self) => {
    const imgEl = self.selector('.hero__media img')[0]
    const img = self.selector('.hero__media img')
    const sig = self.selector('.hero__signature')
    const lede = self.selector('.hero__lede')
    const cta = self.selector('.hero__cta')
    const meta = self.selector('.hero__meta')

    // Initial state — kept in JS so SSR/static paint never flashes the final pose.
    gsap.set(img, { autoAlpha: 0, scale: 1.12 })
    gsap.set(sig, { autoAlpha: 0, y: 22, filter: 'blur(8px)' })
    gsap.set(lede, { autoAlpha: 0, y: 14 })
    gsap.set(cta, { autoAlpha: 0, y: 10 })
    gsap.set(meta, { autoAlpha: 0, y: -6 })

    if (reduced) {
      gsap.set([img, sig, lede, cta, meta], { autoAlpha: 1, y: 0, scale: 1, filter: 'none' })
      return
    }

    // Image fades in independently as soon as it's decoded — never gated on fonts.
    const revealImage = () => {
      gsap.to(img, { autoAlpha: 1, duration: 1.0, ease: 'power2.out' })
      gsap.to(img, { scale: 1.0, duration: 14, ease: 'none' })
    }

    if (imgEl?.complete && imgEl.naturalWidth > 0) {
      revealImage()
    } else if (imgEl) {
      imgEl.addEventListener('load', revealImage, { once: true })
      imgEl.addEventListener('error', revealImage, { once: true })
    }

    // Text animates in on its own track once fonts are ready.
    const startText = () => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      tl.to(sig, { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 1.2 }, 0)
        .to(lede, { autoAlpha: 1, y: 0, duration: 0.9 }, 0.5)
        .to(cta, { autoAlpha: 1, y: 0, duration: 0.9 }, 0.7)
        .to(meta, { autoAlpha: 1, y: 0, duration: 0.9 }, 0.75)
    }

    if (document.fonts && document.fonts.ready) {
      onReady = () => startText()
      document.fonts.ready.then(onReady).catch(startText)
      setTimeout(startText, 1500)
    } else {
      startText()
    }
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
    class="hero"
    aria-label="Secarik Kalatu — re-purpose leftover fabrics into something more"
  >
    <div class="hero__media">
      <img
        src="/hero-2.jpg"
        alt="Secarik Kalatu — leftover fabrics turned into book sleeves and bookmarks"
        loading="eager"
        decoding="async"
      />
      <div class="hero__veil" aria-hidden="true"></div>
    </div>

    <div class="hero__top">
      <p class="hero__signature serif">secarik<span class="hero__signature-dot">.</span>kalatu</p>
      <div class="hero__meta mono" aria-hidden="true">
        <span>BANDUNG · IDN</span>
        <span class="hero__dot">·</span>
        <span>SLOW-MADE</span>
      </div>
    </div>

    <div class="hero__caption">
      <p class="hero__lede mono">
        re-purpose leftover fabrics into something more.
      </p>
      <a
        class="hero__cta mono"
        href="https://www.tokopedia.com/kalatustudio"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>Lihat di Tokopedia</span>
        <span class="hero__cta-arrow" aria-hidden="true">&#10230;</span>
      </a>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  width: 100%;
  height: 100dvh;
  min-height: 620px;
  background: #0c0c0c;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.hero__media {
  position: absolute;
  inset: 0;
  z-index: 0;
}
.hero__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 75%;
  filter: brightness(0.78) contrast(1.05) saturate(0.85);
  transform-origin: center;
  will-change: transform, opacity;
}

.hero__veil {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.35) 0%,
    rgba(0, 0, 0, 0.25) 40%,
    rgba(0, 0, 0, 0.78) 100%
  );
  pointer-events: none;
}

.hero__top {
  position: absolute;
  z-index: 2;
  top: clamp(24px, 4.5vh, 56px);
  left: 0;
  right: 0;
  width: 100%;
  text-align: center;
  padding: 0 var(--gutter);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  color: #f6f3ec;
}

.hero__caption {
  position: relative;
  z-index: 2;
  width: 100%;
  text-align: center;
  padding: 0 var(--gutter) clamp(40px, 7vh, 88px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  color: #f6f3ec;
}

.hero__signature {
  font-family: var(--serif);
  font-style: italic;
  font-weight: 500;
  font-size: clamp(34px, 4.6vw, 58px);
  line-height: 1;
  letter-spacing: -0.005em;
  color: #f6f3ec;
  margin: 0;
  will-change: transform, opacity, filter;
}

.hero__lede {
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.06em;
  color: rgba(246, 243, 236, 0.78);
  margin: 0;
  max-width: none;
  line-height: 1.6;
  white-space: nowrap;
  will-change: transform, opacity;
}

.hero__cta {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  font-family: var(--mono);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(246, 243, 236, 0.78);
  text-decoration: none;
  margin-top: 6px;
  -webkit-tap-highlight-color: transparent;
  will-change: transform, opacity;
}
.hero__cta:focus-visible {
  outline: 1px solid rgba(246, 243, 236, 0.7);
  outline-offset: 6px;
}
.hero__cta-arrow {
  display: inline-block;
  font-size: 15px;
  line-height: 1;
  transform: translate(-5px, -0.5px);
  transition: transform 500ms var(--ease);
}
.hero__cta:hover .hero__cta-arrow,
.hero__cta:focus-visible .hero__cta-arrow {
  transform: translate(-2px, -0.5px);
}

.hero__meta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 10px;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: rgba(246, 243, 236, 0.92);
  will-change: transform, opacity;
}
.hero__dot {
  opacity: 0.5;
}

@media (max-width: 640px) {
  .hero__signature {
    font-size: 38px;
  }
  .hero__lede {
    font-size: 11px;
    max-width: 32ch;
    white-space: normal;
    text-wrap: balance;
    line-height: 1.65;
  }
  .hero__meta {
    font-size: 9.5px;
    letter-spacing: 0.2em;
  }
}
</style>
