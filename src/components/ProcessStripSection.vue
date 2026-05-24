<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const root = ref(null)
let ctx = null

// Placeholders — will be replaced once client provides BTS photos/videos.
const steps = [
  {
    n: '01',
    title: 'Sisa kain',
    body:
      'Potongan kain dari konveksi & studio jahit lokal yang biasanya berakhir di tempat sampah, kami sortir dulu satu per satu.',
  },
  {
    n: '02',
    title: 'Dijahit tangan',
    body:
      'Setiap book sleeve, pouch, dan bookmark dijahit perlahan di Bandung — tanpa mesin produksi massal, tanpa terburu-buru.',
  },
  {
    n: '03',
    title: 'Sampai ke bukumu',
    body:
      'Dikemas hangat dan dikirim langsung dari studio. Satu paket berarti satu helai kain mendapat hidup keduanya.',
  },
]
</script>

<template>
  <section ref="root" class="process" aria-label="Proses pembuatan">
    <div class="shell process__shell">
      <header class="process__head">
        <p class="eyebrow" data-anim>02 &mdash; Proses</p>
        <h2 class="process__title serif" data-anim>
          Dari sisa, ke jahitan, ke bukumu.
        </h2>
      </header>

      <ol class="process__strip" role="list">
        <li
          v-for="s in steps"
          :key="s.n"
          class="step"
        >
          <div class="step__media" aria-hidden="true">
            <span class="step__placeholder mono">[ foto menyusul ]</span>
          </div>
          <div class="step__body">
            <p class="step__index mono">{{ s.n }}</p>
            <h3 class="step__title serif">{{ s.title }}</h3>
            <p class="step__copy mono">{{ s.body }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.process {
  padding-top: clamp(72px, 11vh, 128px);
  padding-bottom: clamp(72px, 11vh, 128px);
  background: var(--bg);
  overflow-x: clip;
}

.process__shell {
  max-width: 1560px;
  display: grid;
  gap: clamp(48px, 8vh, 96px);
}

.process__head {
  display: grid;
  gap: 18px;
  max-width: 720px;
}
.process__title {
  font-family: var(--serif);
  font-style: italic;
  font-weight: 400;
  font-size: clamp(30px, 3.6vw, 48px);
  line-height: 1.05;
  letter-spacing: -0.015em;
  color: var(--ink);
  margin: 0;
}
.process__sub {
  font-family: var(--mono);
  font-size: 12px;
  line-height: 1.7;
  color: var(--ink-soft);
  margin: 0;
  max-width: 52ch;
}

.process__strip {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(28px, 4vw, 56px);
}

.step {
  display: grid;
  gap: 20px;
}

.step__media {
  position: relative;
  aspect-ratio: 4 / 5;
  background: var(--bg-soft);
  border: 1px dashed var(--line);
  display: grid;
  place-items: center;
  overflow: hidden;
}
.step__placeholder {
  font-size: 10px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--ink-muted);
}

.step__body {
  display: grid;
  gap: 8px;
}
.step__index {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: var(--ink-muted);
  margin: 0;
}
.step__title {
  font-family: var(--serif);
  font-style: italic;
  font-weight: 400;
  font-size: clamp(18px, 1.8vw, 22px);
  line-height: 1.2;
  color: var(--ink);
  margin: 0;
}
.step__copy {
  font-family: var(--mono);
  font-size: 11.5px;
  line-height: 1.75;
  color: var(--ink-soft);
  margin: 0;
}

@media (max-width: 880px) {
  .process__strip {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .step__media {
    aspect-ratio: 4 / 3;
  }
}
</style>
