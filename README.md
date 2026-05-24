# Secarik Kalatu

Landing page untuk **Secarik Kalatu** — sub-brand book accessories dari [Kalatu Studio](https://www.tokopedia.com/kalatustudio). Book sleeves & bookmark buatan tangan dari sisa kain, slow-made di Bandung.

Live: <https://secarik-kalatu.vercel.app>

## Stack

- **Vue 3** (Composition API, `<script setup>`)
- **Vite 6**
- **GSAP** — section reveal & scroll-triggered animation
- **Lenis** — smooth scrolling
- Vanilla CSS (variabel & utility custom di `src/styles/global.css`)

## Struktur

```
src/
  App.vue                    # root, susunan section
  main.js                    # mount + global styles
  components/
    HeroSection.vue          # hero + preload image
    StoryInterlude.vue       # narasi singkat
    ProductsSection.vue      # 4 produk + marketplace icons
    SeriesSpotlightSection.vue
    ProcessStripSection.vue
    ArchiveSection.vue       # past catalog grid
    ClosingCTASection.vue
    SiteFooter.vue
    Ornament.vue             # ornamen dekoratif reusable
    CustomScrollbar.vue
  composables/
    useLenis.js              # init smooth scroll
  styles/
    global.css               # tokens & base
public/                      # gambar produk, favicon, robots, sitemap
index.html                   # SEO meta + JSON-LD (Organization, WebSite, ItemList)
```

## Menjalankan

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # output ke dist/
npm run preview    # preview hasil build
```

## SEO & Performance

- Meta lengkap (Open Graph, Twitter Card, canonical) di `index.html`
- Structured data JSON-LD: `Organization`, `WebSite`, `ItemList` (4 produk)
- Hero image `preload` + `fetchpriority="high"`
- Image dalam dua varian: `.jpg/.jpeg` + `.webp` (browser pilih via `<picture>`)
- `robots.txt` & `sitemap.xml` di `public/`

## Deploy

Auto-deploy via [Vercel](https://vercel.com) — push ke `main` memicu build & deploy.

## Marketplace

- Tokopedia — [@kalatustudio](https://www.tokopedia.com/kalatustudio)
- Shopee — [@secarik.kalatu](https://shopee.co.id/secarik.kalatu)
- TikTok Shop — [@secarik.kalatu](https://www.tiktok.com/@secarik.kalatu)
- Instagram — [@secarik.kalatu](https://www.instagram.com/secarik.kalatu/)
