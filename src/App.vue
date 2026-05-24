<script setup>
import { useLenis } from './composables/useLenis'
import { useReveal } from './composables/useReveal'
import HeroSection from './components/HeroSection.vue'
import StoryInterlude from './components/StoryInterlude.vue'
import ProductsSection from './components/ProductsSection.vue'
import ProcessStripSection from './components/ProcessStripSection.vue'
import SeriesSpotlightSection from './components/SeriesSpotlightSection.vue'
import ClosingCTASection from './components/ClosingCTASection.vue'
import SiteFooter from './components/SiteFooter.vue'
import CustomScrollbar from './components/CustomScrollbar.vue'

const { lenis } = useLenis()
useReveal()
</script>

<template>
  <main class="page">
    <HeroSection />
    <StoryInterlude />
    <ProductsSection />
    <ProcessStripSection />
    <SeriesSpotlightSection />
    <ClosingCTASection />
    <SiteFooter />
  </main>
  <CustomScrollbar :lenis="lenis" />
</template>

<style scoped>
.page {
  min-height: 100dvh;
  background: var(--bg);
  color: var(--ink);
}
</style>
