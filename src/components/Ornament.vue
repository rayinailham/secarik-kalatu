<script setup>
// Reusable line-art ornament. Single SVG, thin stroke, currentColor.
// Positioning + opacity dikontrol oleh parent section CSS.
defineProps({
  shape: { type: String, required: true },
  size: { type: [Number, String], default: 96 },
  rotate: { type: [Number, String], default: 0 },
})
</script>

<template>
  <svg
    class="ornament"
    :width="size"
    :height="size"
    viewBox="0 0 100 100"
    :style="{ transform: `rotate(${rotate}deg)` }"
    aria-hidden="true"
    focusable="false"
  >
    <!-- 1. needle + thread curl -->
    <g v-if="shape === 'needle'">
      <ellipse cx="16" cy="84" rx="3" ry="2" transform="rotate(-45 16 84)" />
      <line x1="20" y1="80" x2="82" y2="20" />
      <path d="M16 84 C 6 78, 4 66, 14 60 C 24 54, 22 44, 14 40" />
    </g>

    <!-- 2. running stitch (horizontal dashed line) -->
    <g v-else-if="shape === 'stitch'">
      <line x1="4" y1="50" x2="96" y2="50" stroke-dasharray="6 5" />
    </g>

    <!-- 3. spool of thread -->
    <g v-else-if="shape === 'spool'">
      <line x1="22" y1="22" x2="78" y2="22" />
      <line x1="22" y1="78" x2="78" y2="78" />
      <line x1="32" y1="22" x2="32" y2="78" />
      <line x1="68" y1="22" x2="68" y2="78" />
      <path d="M32 36 Q50 33 68 36" />
      <path d="M32 50 Q50 47 68 50" />
      <path d="M32 64 Q50 61 68 64" />
    </g>

    <!-- 4. leaf with stem + center vein -->
    <g v-else-if="shape === 'leaf'">
      <path d="M22 78 C 22 42, 50 18, 82 22 C 78 54, 54 78, 22 78 Z" />
      <line x1="22" y1="78" x2="82" y2="22" />
      <path d="M40 60 Q 48 56 56 50" />
      <path d="M52 70 Q 60 66 68 60" />
    </g>

    <!-- 5. open book -->
    <g v-else-if="shape === 'book'">
      <path d="M10 30 L50 24 L90 30 L90 78 L50 72 L10 78 Z" />
      <line x1="50" y1="24" x2="50" y2="72" />
      <path d="M18 38 Q34 36 46 40" />
      <path d="M18 50 Q34 48 46 52" />
      <path d="M54 40 Q66 36 82 38" />
      <path d="M54 52 Q66 48 82 50" />
    </g>

    <!-- 6. bookmark with tassel -->
    <g v-else-if="shape === 'bookmark'">
      <path d="M40 12 L60 12 L60 70 L50 60 L40 70 Z" />
      <line x1="50" y1="60" x2="50" y2="92" />
      <line x1="46" y1="64" x2="43" y2="92" />
      <line x1="54" y1="64" x2="57" y2="92" />
      <line x1="48" y1="62" x2="46" y2="92" />
      <line x1="52" y1="62" x2="54" y2="92" />
    </g>

    <!-- 7. embroidery hoop -->
    <g v-else-if="shape === 'hoop'">
      <circle cx="50" cy="54" r="34" />
      <circle cx="50" cy="54" r="38" />
      <rect x="46" y="10" width="8" height="8" />
      <line x1="50" y1="18" x2="50" y2="20" />
    </g>

    <!-- 8. scissors -->
    <g v-else-if="shape === 'scissors'">
      <circle cx="22" cy="32" r="10" />
      <circle cx="22" cy="68" r="10" />
      <line x1="32" y1="32" x2="86" y2="58" />
      <line x1="32" y1="68" x2="86" y2="42" />
      <circle cx="50" cy="50" r="1.5" />
    </g>

    <!-- 9. wave squiggle -->
    <g v-else-if="shape === 'wave'">
      <path d="M4 50 Q 16 32 28 50 T 52 50 T 76 50 T 96 50" />
    </g>

    <!-- 10. cross-stitch trio -->
    <g v-else-if="shape === 'cross'">
      <line x1="18" y1="40" x2="30" y2="52" />
      <line x1="30" y1="40" x2="18" y2="52" />
      <line x1="44" y1="44" x2="56" y2="56" />
      <line x1="56" y1="44" x2="44" y2="56" />
      <line x1="70" y1="48" x2="82" y2="60" />
      <line x1="82" y1="48" x2="70" y2="60" />
    </g>

    <!-- 11. button -->
    <g v-else-if="shape === 'button'">
      <circle cx="50" cy="50" r="32" />
      <circle cx="50" cy="50" r="26" />
      <circle cx="42" cy="42" r="1.6" />
      <circle cx="58" cy="42" r="1.6" />
      <circle cx="42" cy="58" r="1.6" />
      <circle cx="58" cy="58" r="1.6" />
    </g>

    <!-- 12. thread loop / knot -->
    <g v-else-if="shape === 'loop'">
      <path d="M10 60 C 22 30, 50 30, 50 52 C 50 74, 78 74, 90 44" />
      <path d="M30 50 C 36 38, 60 60, 70 50" />
    </g>
  </svg>
</template>

<style scoped>
.ornament {
  stroke: currentColor;
  fill: none;
  stroke-width: 1;
  stroke-linecap: round;
  stroke-linejoin: round;
  display: block;
  vector-effect: non-scaling-stroke;
}
</style>
