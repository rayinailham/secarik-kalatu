<script setup>
import { ref } from 'vue'

const year = new Date().getFullYear()
const email = ref('')

const onSubscribe = (e) => {
  e.preventDefault()
  if (!email.value) return
  // no backend yet; open mailto so the intent still completes.
  const to = 'halo@kalatustudio.com'
  const subject = encodeURIComponent('Ikut perjalanan Secarik Kalatu')
  const body = encodeURIComponent(
    `Halo, saya ${email.value} mau ikut cerita Secarik Kalatu.`
  )
  window.location.href = `mailto:${to}?subject=${subject}&body=${body}`
}

const groups = [
  {
    heading: 'Belanja',
    items: [
      { label: 'Tokopedia', href: 'https://www.tokopedia.com/kalatustudio' },
      { label: 'Shopee', href: 'https://shopee.co.id/secarik.kalatu' },
    ],
  },
  {
    heading: 'Cerita',
    items: [
      { label: 'TikTok', href: 'https://www.tiktok.com/@secarik.kalatu' },
      { label: 'Instagram', href: 'https://www.instagram.com/secarik.kalatu/' },
    ],
  },
  {
    heading: 'Studio',
    items: [
      { label: 'Kalatu Studio' },
      { label: 'Bandung, Indonesia' },
      { label: 'Slow-made & upcycled' },
    ],
  },
]
</script>

<template>
  <footer class="footer" aria-label="Site footer">
    <hr class="rule" />

    <div class="footer__layout">
      <div class="footer__inner">
        <div class="shell footer__shell">
          <div class="footer__grid">
            <!-- Left: subscribe + socials -->
            <div class="footer__lead">
              <p class="eyebrow">Ikuti perjalanan kami</p>
              <p class="footer__lede mono">
                Berlangganan untuk cerita di balik tiap helai kain &mdash;
                rilisan terbatas, catatan studio, dan diskon pertama untuk
                pesanan kamu.
              </p>

              <form class="subscribe" @submit="onSubscribe" novalidate>
                <label class="visually-hidden" for="footer-email">Alamat email</label>
                <input
                  id="footer-email"
                  v-model="email"
                  class="subscribe__input mono"
                  type="email"
                  inputmode="email"
                  autocomplete="email"
                  placeholder="Alamat email"
                  required
                />
                <button
                  class="subscribe__btn"
                  type="submit"
                  aria-label="Kirim alamat email"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                    <path
                      d="M4 12h15M13 6l6 6-6 6"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.4"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </form>

              <ul class="socials" role="list">
                <li>
                  <a
                    class="socials__a"
                    href="https://www.instagram.com/secarik.kalatu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" fill="none" stroke="currentColor" stroke-width="1.3"/>
                      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.3"/>
                      <circle cx="17.2" cy="6.8" r="1" fill="currentColor"/>
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    class="socials__a"
                    href="https://www.tiktok.com/@secarik.kalatu"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                      <path
                        d="M14 3v9.6a3.4 3.4 0 1 1-3.4-3.4"
                        fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"
                      />
                      <path
                        d="M14 3c.5 2.4 2.4 4.2 4.8 4.5"
                        fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>

            <!-- Middle: link columns -->
            <nav class="footer__nav" aria-label="Tautan footer">
              <div
                v-for="g in groups"
                :key="g.heading"
                class="footer__col"
              >
                <p class="eyebrow">{{ g.heading }}</p>
                <ul class="footer__list">
                  <li v-for="(it, i) in g.items" :key="i">
                    <a
                      v-if="it.href"
                      class="link mono"
                      :href="it.href"
                      target="_blank"
                      rel="noopener noreferrer"
                    >{{ it.label }}</a>
                    <span v-else class="mono">{{ it.label }}</span>
                  </li>
                </ul>
              </div>
            </nav>
          </div>

          <p class="footer__copy mono">
            &copy; {{ year }} Secarik Kalatu &mdash; sub-brand Kalatu Studio. All rights reserved.
          </p>
        </div>
      </div>

      <!-- Right: full-bleed editorial image -->
      <div class="footer__feature" aria-hidden="true">
        <img
          src="/footer-feature.webp"
          alt=""
          loading="lazy"
          decoding="async"
          width="1200"
          height="1500"
        />
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--bg-soft);
  color: var(--ink);
}

.footer__layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 0.5fr);
  align-items: stretch;
  min-height: clamp(420px, 60vh, 640px);
}

/* ---------- left content side ---------- */
.footer__inner {
  display: flex;
  align-items: stretch;
  padding-top: clamp(56px, 9vh, 112px);
  padding-bottom: clamp(28px, 4vh, 48px);
}
.footer__shell {
  width: 100%;
  max-width: 980px;
  margin: 0;
  padding-inline: var(--gutter);
  display: flex;
  flex-direction: column;
}

.footer__grid {
  display: grid;
  grid-template-columns: minmax(280px, 1.05fr) minmax(0, 1.4fr);
  gap: clamp(36px, 5vw, 80px);
  align-items: start;
  flex: 1;
}

/* ---------- subscribe block ---------- */
.footer__lead {
  display: grid;
  gap: 18px;
  max-width: 42ch;
}
.footer__lede {
  font-size: 12px;
  line-height: 1.75;
  color: var(--ink-soft);
  margin: 0;
}

.subscribe {
  position: relative;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--ink);
  padding-bottom: 6px;
  margin-top: 4px;
}
.subscribe__input {
  flex: 1;
  appearance: none;
  background: transparent;
  border: 0;
  outline: 0;
  padding: 8px 0;
  font-size: 12.5px;
  letter-spacing: 0.04em;
  color: var(--ink);
}
.subscribe__input::placeholder {
  color: var(--ink-muted);
  font-style: italic;
}
.subscribe__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  color: var(--ink);
  transition: transform 360ms var(--ease), color 220ms var(--ease);
}
.subscribe__btn:hover { transform: translateX(4px); }

/* ---------- socials ---------- */
.socials {
  list-style: none;
  margin: 14px 0 0;
  padding: 0;
  display: flex;
  gap: 14px;
}
.socials__a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1px solid var(--line);
  border-radius: 50%;
  color: var(--ink);
  background: transparent;
  transition:
    background 280ms var(--ease),
    color 280ms var(--ease),
    border-color 280ms var(--ease);
}
.socials__a:hover {
  background: var(--ink);
  color: var(--bg);
  border-color: var(--ink);
}

/* ---------- nav columns ---------- */
.footer__nav {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(20px, 3vw, 56px);
}
.footer__col {
  display: grid;
  gap: 14px;
  align-content: start;
}
.footer__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 10px;
}
.footer__list .mono,
.link {
  font-size: 12px;
  letter-spacing: 0.03em;
  color: var(--ink);
}
.link {
  position: relative;
  display: inline-block;
  padding-bottom: 2px;
  transition: color 220ms var(--ease);
}
.link::after {
  content: '';
  position: absolute;
  left: 0;
  right: 100%;
  bottom: 0;
  height: 1px;
  background: var(--ink);
  transition: right 360ms var(--ease);
}
.link:hover::after { right: 0; }

/* ---------- copy ---------- */
.footer__copy {
  margin: clamp(56px, 8vh, 96px) 0 0;
  font-size: 11px;
  letter-spacing: 0.04em;
  color: var(--ink-muted);
}

/* ---------- right feature image ---------- */
.footer__feature {
  position: relative;
  overflow: hidden;
  background: var(--ink);
}
.footer__feature img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.95) contrast(1.02);
}

.visually-hidden {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
  border: 0;
}

/* ---------- responsive ---------- */
@media (max-width: 1100px) {
  .footer__layout {
    grid-template-columns: minmax(0, 1fr) minmax(0, 0.4fr);
    min-height: clamp(380px, 56vh, 560px);
  }
  .footer__grid {
    grid-template-columns: 1fr;
    gap: clamp(36px, 5vh, 56px);
  }
  .footer__nav {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 820px) {
  .footer__layout {
    grid-template-columns: 1fr;
    min-height: 0;
  }
  .footer__feature {
    order: -1;
    aspect-ratio: 16 / 10;
  }
  .footer__inner {
    padding-top: clamp(40px, 7vh, 72px);
  }
  .footer__shell {
    max-width: none;
  }
  .footer__lead { max-width: 56ch; }
}

@media (max-width: 560px) {
  .footer__nav {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 28px 24px;
  }
  .footer__feature { aspect-ratio: 4 / 3; }
  .footer__copy { font-size: 10.5px; }
}

@media (max-width: 380px) {
  .footer__nav {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .subscribe__btn,
  .socials__a,
  .link::after,
  .footer__feature img {
    transition: none;
  }
  .subscribe__btn:hover { transform: none; }
}
</style>



