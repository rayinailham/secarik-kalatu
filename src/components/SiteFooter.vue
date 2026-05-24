<script setup>
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer" aria-label="Site footer">
    <div class="shell footer__shell">
      <hr class="rule" />

      <div class="footer__grid">
        <div class="footer__brand">
          <p class="footer__sig serif">secarik kalatu</p>
          <p class="footer__line mono">
            Book sleeves &amp; bookmark dari sisa kain. Slow-made di Bandung.
          </p>
        </div>

        <div class="footer__col">
          <p class="eyebrow">Belanja</p>
          <ul class="footer__list">
            <li>
              <a
                href="https://www.tokopedia.com/kalatustudio"
                target="_blank"
                rel="noopener noreferrer"
                class="link mono"
              >Tokopedia</a>
            </li>
            <li>
              <a
                href="https://shopee.co.id/secarik.kalatu"
                target="_blank"
                rel="noopener noreferrer"
                class="link mono"
              >Shopee</a>
            </li>
          </ul>
        </div>

        <div class="footer__col">
          <p class="eyebrow">Cerita</p>
          <ul class="footer__list">
            <li>
              <a
                href="https://www.tiktok.com/@secarik.kalatu"
                target="_blank"
                rel="noopener noreferrer"
                class="link mono"
              >TikTok</a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/secarik.kalatu/"
                target="_blank"
                rel="noopener noreferrer"
                class="link mono"
              >Instagram</a>
            </li>
          </ul>
        </div>

        <div class="footer__col">
          <p class="eyebrow">Studio</p>
          <ul class="footer__list">
            <li><span class="mono">Kalatu Studio</span></li>
            <li><span class="mono">Bandung, Indonesia</span></li>
          </ul>
        </div>
      </div>

      <div class="footer__base">
        <p class="mono">© {{ year }} Secarik Kalatu — sub-brand Kalatu Studio.</p>
        <p class="mono">re-purpose leftover fabrics into something more.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding-top: clamp(48px, 8vh, 96px);
  padding-bottom: clamp(28px, 4vh, 48px);
  background: var(--bg-soft);
  color: var(--ink);
}

.footer__shell {
  max-width: 1560px;
}

.footer__grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1fr;
  gap: clamp(28px, 4vw, 64px);
  padding-top: clamp(40px, 6vh, 72px);
  padding-bottom: clamp(40px, 6vh, 72px);
}

.footer__brand {
  display: grid;
  gap: 12px;
  max-width: 32ch;
}
.footer__sig {
  font-family: var(--serif);
  font-style: italic;
  font-weight: 400;
  font-size: 22px;
  line-height: 1;
  margin: 0;
  color: var(--ink);
}
.footer__line {
  font-family: var(--mono);
  font-size: 11.5px;
  line-height: 1.7;
  color: var(--ink-soft);
  margin: 0;
}

.footer__col {
  display: grid;
  gap: 14px;
}
.footer__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 6px;
}
.footer__list .mono,
.link {
  font-size: 11.5px;
  letter-spacing: 0.04em;
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
.link:hover {
  color: var(--ink);
}
.link:hover::after {
  right: 0;
}

.footer__base {
  border-top: 1px solid var(--line);
  padding-top: 22px;
  display: flex;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  font-size: 10.5px;
  letter-spacing: 0.06em;
  color: var(--ink-muted);
}
.footer__base p {
  margin: 0;
}

@media (max-width: 880px) {
  .footer__grid {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 520px) {
  .footer__grid {
    grid-template-columns: 1fr;
  }
}
</style>
