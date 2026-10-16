<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { gsap } from 'gsap'

// Intro — spinning ring of cards (technique: gionatannese.com intro: orbit ring,
// fast-spin ramp, staggered collapse to centre) handing off to a single image that
// grows small → big → full-bleed (technique: noartmusic.com hero loader).
// Hand-off: "intro-bleed" (hero copy starts) then "intro-done"; HeroSection listens to bleed.

const KEY = 'introPlayed'
const base = '/Past Catalog'
const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => `${base}/${n}.webp`)
const HERO = '/hero-2.webp' // last = top of the stack = the image that grows

// shortcut: skip on repeat visit in same tab (like noart) and on reduced-motion.
let skip = false
try {
  skip =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    !!sessionStorage.getItem(KEY)
} catch {}
const active = ref(!skip)
if (skip) {
  window.__introDone = window.__introBleed = true
}

const root = ref(null)
const counter = ref(null)
const bar = ref(null)
let ctx = null
let tick = null

const finish = () => {
  window.__introDone = true
  window.dispatchEvent(new Event('intro-done'))
  // one frame later so the hero underneath has painted the identical image
  requestAnimationFrame(() => {
    active.value = false
    document.documentElement.style.overflow = ''
    try {
      sessionStorage.setItem(KEY, '1')
    } catch {}
  })
}

onMounted(async () => {
  if (!active.value || !root.value) return
  document.documentElement.style.overflow = 'hidden'
  window.scrollTo(0, 0)

  const el = root.value
  const items = [...el.querySelectorAll('.intro__card')]
  const heroEl = items[items.length - 1]
  const heroImg = heroEl.querySelector('img')
  const veil = heroEl.querySelector('.intro__veil')
  const others = items.slice(0, -1)
  const ui = el.querySelectorAll('.intro__ui')

  // wait for decode (never longer than 5s) so cards don't pop in
  await Promise.race([
    Promise.all(
      [...el.querySelectorAll('img')].map((i) => i.decode().catch(() => {})),
    ),
    new Promise((r) => setTimeout(r, 5000)),
  ])

  const mobile = window.matchMedia('(max-width: 767px)').matches
  const W = 70 // card box, px (gionatan: logoSize 70)
  const H = 92
  const RADIUS = (mobile ? 0.75 : 1) * 240
  const CENTER_W = 120 // collapsed stack width (gionatan: centerScale 120)
  const N = items.length
  const st = items.map(() => ({ o: 0, s: 0.01, c: 0 }))
  const ring = { angle: 0, ramp: 0 }

  const place = (i) => {
    const a = ((-90 + (360 / N) * i) * Math.PI) / 180 + (ring.angle * Math.PI) / 180
    const c = st[i].c
    const x = Math.cos(a) * RADIUS * (1 - c)
    const y = Math.sin(a) * RADIUS * (1 - c)
    const s = st[i].s * (1 + (CENTER_W / W - 1) * c)
    items[i].style.opacity = st[i].o
    items[i].style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0) scale(${s})`
  }

  gsap.set(items, { width: W, height: H })

  // ring spins; ramp multiplies speed (gionatan: 0.5°/frame, ×7.3 at full ramp)
  let stacked = false
  tick = (_t, dt) => {
    ring.angle += 0.5 * (1 + 6.3 * ring.ramp) * (dt / 16.667)
    if (!stacked) for (let i = 0; i < N; i++) place(i)
  }
  gsap.ticker.add(tick)

  // percent counter + bar, power2.inOut like noart
  const pct = { v: 0 }
  gsap.to(pct, {
    v: 100,
    duration: 3.4,
    ease: 'power2.inOut',
    onUpdate: () => {
      const v = Math.round(pct.v)
      if (counter.value) counter.value.textContent = v + '%'
      if (bar.value) bar.value.style.width = v + '%'
    },
  })

  ctx = gsap.context(() => {
    const tl = gsap.timeline()

    // 1. cards appear around the ring, staggered
    st.forEach((s, i) => {
      tl.to(s, { o: 1, s: 1, duration: 1, ease: 'power2.out' }, i * 0.1)
    })
    tl.to(ui, { autoAlpha: 1, duration: 0.6 }, 0)

    // 2. spin up
    tl.to(ring, { ramp: 1, duration: 1, ease: 'power2.in' }, 1.3)

    // 3. collapse to centre, staggered; hero card ends on top
    st.forEach((s, i) => {
      tl.to(s, { c: 1, duration: 1.25, ease: 'power2.inOut' }, 2.1 + i * 0.05)
    })
    items.forEach((it, i) => (it.style.zIndex = i))

    // 4. noart handoff: top card grows centre-stack → 45vw×25vw → full bleed
    tl.add(() => {
      stacked = true
      heroEl.style.transform = ''
      gsap.set(heroEl, {
        width: CENTER_W,
        height: (CENTER_W * H) / W,
        xPercent: -50,
        yPercent: -50,
        opacity: 1,
      })
    })
    tl.to(heroEl, {
      width: mobile ? '65vw' : '45vw',
      height: mobile ? '65vw' : '25vw',
      duration: 0.8,
      ease: 'power4.inOut',
    }, '+=0.15')
    tl.addLabel('bleed', '+=0.2')
    tl.to(
      heroEl,
      { width: '100vw', height: '100dvh', duration: 0.8, ease: 'power4.inOut' },
      'bleed',
    )
    // hero copy rises together with the bleed (HeroSection listens)
    tl.add(() => {
      window.__introBleed = true
      window.dispatchEvent(new Event('intro-bleed'))
    }, 'bleed+=0.2')
    tl.to(others, { autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, '<')
    tl.to(ui, { autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, '<')
    // match the hero's treatment so the swap to <HeroSection> is invisible
    tl.fromTo(
      heroImg,
      { filter: 'brightness(1) contrast(1) saturate(1)' }, // explicit: GSAP tweens from "none" via 0
      { filter: 'brightness(0.78) contrast(1.05) saturate(0.85)', duration: 0.8, ease: 'power4.inOut' },
      '<',
    )
    tl.to(veil, { opacity: 1, duration: 0.8, ease: 'power4.inOut' }, '<')
    tl.add(finish)
  }, el)
})

onBeforeUnmount(() => {
  if (tick) gsap.ticker.remove(tick)
  ctx?.revert()
  document.documentElement.style.overflow = ''
})
</script>

<template>
  <div v-if="active" ref="root" class="intro" aria-hidden="true">
    <div v-for="src in cards" :key="src" class="intro__card">
      <img :src="src" alt="" decoding="async" />
    </div>
    <div class="intro__card intro__card--hero">
      <img :src="HERO" alt="" decoding="async" />
      <div class="intro__veil"></div>
    </div>

    <div class="intro__ui intro__meta mono">
      <span>SECARIK.KALATU</span>
    </div>
    <div class="intro__ui intro__count mono">
      <span ref="counter">0%</span>
      <span class="intro__track"><span ref="bar" class="intro__bar"></span></span>
    </div>
  </div>
</template>

<style scoped>
.intro {
  position: fixed;
  inset: 0;
  /* below hero copy (z 2) so the text can rise over the growing image */
  z-index: 1;
  background: var(--bg);
  overflow: hidden;
  color: var(--ink);
}
.intro__card {
  position: absolute;
  left: 50%;
  top: 50%;
  overflow: hidden;
  opacity: 0;
  will-change: transform, opacity;
  background: var(--bg-soft);
}
.intro__card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 75%;
  display: block;
}
.intro__veil {
  position: absolute;
  inset: 0;
  opacity: 0;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.35) 0%,
    rgba(0, 0, 0, 0.25) 40%,
    rgba(0, 0, 0, 0.78) 100%
  );
}
.intro__ui {
  position: absolute;
  z-index: 2000;
  opacity: 0;
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  mix-blend-mode: difference;
  color: #fff;
}
.intro__meta {
  top: clamp(20px, 4vh, 40px);
  left: var(--gutter);
}
.intro__count {
  left: var(--gutter);
  right: var(--gutter);
  bottom: clamp(20px, 4vh, 40px);
  display: flex;
  align-items: center;
  gap: 16px;
}
.intro__track {
  flex: 1;
  height: 1px;
  background: rgba(255, 255, 255, 0.3);
}
.intro__bar {
  display: block;
  height: 100%;
  width: 0;
  background: #fff;
}
</style>
