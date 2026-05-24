<script setup>
import { ref, watch, onBeforeUnmount } from 'vue'

const props = defineProps({
  lenis: { type: Object, default: null }, // shallowRef from useLenis
})

const trackRef = ref(null)
const thumbRef = ref(null)

const visible = ref(false)
const active = ref(false) // hovered or dragging
const dragging = ref(false)

let scrollY = 0
let limit = 1
let viewport = 1
let trackH = 1
let thumbH = 24
let raf = 0

let hideTimer = 0
const showTransiently = () => {
  visible.value = true
  clearTimeout(hideTimer)
  hideTimer = setTimeout(() => {
    if (!active.value && !dragging.value) visible.value = false
  }, 1100)
}

const measure = () => {
  viewport = window.innerHeight
  limit = Math.max(1, document.documentElement.scrollHeight - viewport)
  trackH = trackRef.value?.clientHeight || viewport
  // thumb height proportional to viewport / total, clamped
  const ratio = Math.min(1, viewport / (limit + viewport))
  thumbH = Math.max(36, Math.round(trackH * ratio))
}

const apply = () => {
  if (!thumbRef.value) return
  const max = trackH - thumbH
  const t = limit > 0 ? scrollY / limit : 0
  const y = Math.max(0, Math.min(max, t * max))
  thumbRef.value.style.transform = `translate3d(0, ${y}px, 0)`
  thumbRef.value.style.height = `${thumbH}px`
}

const onLenisScroll = (e) => {
  scrollY = e?.scroll ?? window.scrollY
  apply()
  showTransiently()
}

// fallback for native scroll (e.g. while Lenis not yet initialized)
const onWindowScroll = () => {
  if (props.lenis?.value) return
  scrollY = window.scrollY
  apply()
  showTransiently()
}

const onResize = () => {
  measure()
  apply()
}

let ro
const attach = (lenisInstance) => {
  if (!lenisInstance) return
  measure()
  scrollY = lenisInstance.scroll || window.scrollY
  apply()
  lenisInstance.on('scroll', onLenisScroll)
}

const detach = (lenisInstance) => {
  if (!lenisInstance) return
  lenisInstance.off?.('scroll', onLenisScroll)
}

watch(
  () => props.lenis?.value,
  (l, prev) => {
    if (prev) detach(prev)
    if (l) attach(l)
  },
  { immediate: true },
)

// ---------- interaction ----------
const scrollToProgress = (p) => {
  const target = Math.max(0, Math.min(limit, p * limit))
  const l = props.lenis?.value
  if (l) l.scrollTo(target, { immediate: false, duration: 0.6 })
  else window.scrollTo({ top: target, behavior: 'smooth' })
}

const onTrackClick = (e) => {
  if (e.target === thumbRef.value) return
  const rect = trackRef.value.getBoundingClientRect()
  const y = e.clientY - rect.top - thumbH / 2
  const max = trackH - thumbH
  const p = Math.max(0, Math.min(1, y / max))
  scrollToProgress(p)
}

let dragOffset = 0
const onThumbDown = (e) => {
  e.preventDefault()
  dragging.value = true
  active.value = true
  visible.value = true
  const rect = thumbRef.value.getBoundingClientRect()
  dragOffset = e.clientY - rect.top
  window.addEventListener('pointermove', onDragMove)
  window.addEventListener('pointerup', onDragUp, { once: true })
  document.body.style.userSelect = 'none'
}

const onDragMove = (e) => {
  const rect = trackRef.value.getBoundingClientRect()
  const y = e.clientY - rect.top - dragOffset
  const max = trackH - thumbH
  const p = Math.max(0, Math.min(1, y / max))
  // immediate jump while dragging for tactile feel
  const target = p * limit
  const l = props.lenis?.value
  if (l) l.scrollTo(target, { immediate: true })
  else window.scrollTo(0, target)
}

const onDragUp = () => {
  dragging.value = false
  document.body.style.userSelect = ''
  window.removeEventListener('pointermove', onDragMove)
  if (!active.value) {
    clearTimeout(hideTimer)
    hideTimer = setTimeout(() => (visible.value = false), 800)
  }
}

const onEnter = () => {
  active.value = true
  visible.value = true
  clearTimeout(hideTimer)
}
const onLeave = () => {
  active.value = false
  if (!dragging.value) {
    clearTimeout(hideTimer)
    hideTimer = setTimeout(() => (visible.value = false), 600)
  }
}

// ---------- lifecycle ----------
window.addEventListener('scroll', onWindowScroll, { passive: true })
window.addEventListener('resize', onResize)

if (typeof ResizeObserver !== 'undefined') {
  ro = new ResizeObserver(onResize)
  // observe documentElement to react to content growth
  ro.observe(document.documentElement)
}

// initial measure after first paint
raf = requestAnimationFrame(() => {
  measure()
  apply()
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  clearTimeout(hideTimer)
  window.removeEventListener('scroll', onWindowScroll)
  window.removeEventListener('resize', onResize)
  window.removeEventListener('pointermove', onDragMove)
  ro?.disconnect()
  detach(props.lenis?.value)
})
</script>

<template>
  <div
    class="scrollbar"
    :class="{ 'is-visible': visible || active || dragging, 'is-active': active || dragging }"
    aria-hidden="true"
  >
    <div
      ref="trackRef"
      class="scrollbar__track"
      @click="onTrackClick"
      @mouseenter="onEnter"
      @mouseleave="onLeave"
    >
      <div
        ref="thumbRef"
        class="scrollbar__thumb"
        @pointerdown="onThumbDown"
        @mouseenter="onEnter"
        @mouseleave="onLeave"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.scrollbar {
  position: fixed;
  top: 18px;
  bottom: 18px;
  right: 14px;
  width: 14px;
  z-index: 90;
  pointer-events: none;
  opacity: 0;
  transition: opacity 380ms var(--ease, cubic-bezier(0.16, 1, 0.3, 1));
}
.scrollbar.is-visible {
  opacity: 1;
  pointer-events: auto;
}

.scrollbar__track {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  cursor: pointer;
}
/* thin invisible rail centered in the hover zone */
.scrollbar__track::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 1px;
  background: var(--line, #e8e6e1);
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 280ms var(--ease, ease), width 280ms var(--ease, ease);
}
.scrollbar.is-active .scrollbar__track::before {
  opacity: 1;
  width: 2px;
}

.scrollbar__thumb {
  position: absolute;
  top: 0;
  left: 50%;
  width: 2px;
  height: 36px;
  border-radius: 999px;
  background: var(--ink, #1a1a1a);
  transform: translate3d(-50%, 0, 0);
  margin-left: 0;
  /* center via translateX in transform path */
  translate: -50% 0;
  will-change: transform, height, width;
  transition:
    width 220ms var(--ease, ease),
    background-color 220ms var(--ease, ease),
    opacity 220ms var(--ease, ease);
  opacity: 0.55;
}
.scrollbar.is-visible .scrollbar__thumb {
  opacity: 0.85;
}
.scrollbar.is-active .scrollbar__thumb {
  width: 4px;
  opacity: 1;
}

@media (hover: none) {
  /* stay subtle on touch */
  .scrollbar {
    right: 8px;
    width: 10px;
  }
  .scrollbar__thumb {
    width: 2px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .scrollbar,
  .scrollbar__track::before,
  .scrollbar__thumb {
    transition: none;
  }
}
</style>
