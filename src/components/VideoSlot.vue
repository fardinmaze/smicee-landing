<script setup>
import { computed, ref } from 'vue'

// One 16:9 video slot. It shows a poster with a play button and only loads the video when clicked,
// so the page stays light on slow connections. With no src/embed it is a labelled placeholder.
const props = defineProps({
  video: { type: Object, required: true },
  large: { type: Boolean, default: false },
})

const playing = ref(false)
const hasVideo = computed(() => Boolean(props.video.src || props.video.embed))
const embedUrl = computed(() => {
  const url = props.video.embed
  return url ? `${url}${url.includes('?') ? '&' : '?'}autoplay=1` : ''
})
</script>

<template>
  <div class="slot" :class="{ 'slot--large': large, 'slot--empty': !hasVideo }">
    <template v-if="playing && hasVideo">
      <video v-if="video.src" :src="video.src" :poster="video.poster || null" controls autoplay playsinline />
      <iframe
        v-else
        :src="embedUrl"
        :title="video.title"
        allow="autoplay; fullscreen; picture-in-picture"
        allowfullscreen
      />
    </template>

    <component
      :is="hasVideo ? 'button' : 'div'"
      v-else
      class="poster"
      :type="hasVideo ? 'button' : null"
      :aria-label="hasVideo ? `Play: ${video.title}` : null"
      @click="hasVideo && (playing = true)"
    >
      <img v-if="video.poster" :src="video.poster" alt="" loading="lazy" />
      <span class="play" aria-hidden="true">
        <i class="play__pulse" />
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5z" /></svg>
      </span>
      <span class="label">
        <b>{{ video.title }}</b>
        <small v-if="!hasVideo">Video coming soon</small>
      </span>
    </component>
  </div>
</template>

<style scoped>
.slot {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: var(--radius-lg);
  background: var(--ink-900);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-lg);
}
.slot video,
.slot iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
  background: #000;
}
.poster {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  width: 100%;
  padding: 0;
  text-align: left;
  color: #fff;
  background:
    radial-gradient(60% 80% at 100% 0%, #f0206b66 0%, transparent 65%),
    radial-gradient(60% 80% at 0% 100%, #635bff88 0%, transparent 65%), linear-gradient(160deg, var(--ink-900), var(--navy));
}
.poster img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.slot--empty .poster {
  cursor: default;
  background-image:
    radial-gradient(#ffffff22 1.2px, transparent 1.2px),
    radial-gradient(60% 80% at 100% 0%, #f0206b55 0%, transparent 65%),
    radial-gradient(60% 80% at 0% 100%, #635bff77 0%, transparent 65%), linear-gradient(160deg, var(--ink-900), var(--navy));
  background-size:
    28px 28px,
    auto,
    auto,
    auto;
}
.play {
  position: relative;
  display: grid;
  place-items: center;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  color: var(--navy);
  background: #fff;
  box-shadow: 0 12px 32px -8px #0008;
  transition: transform 0.3s var(--ease-out);
}
.slot--large .play {
  width: 92px;
  height: 92px;
}
.play svg {
  margin-left: 4px;
}
.play__pulse {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: #fff;
  animation: pulse-ring 2.2s var(--ease-out) infinite;
}
button.poster:hover .play {
  transform: scale(1.1);
}
.label {
  position: absolute;
  left: 20px;
  bottom: 16px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.label b {
  font-family: var(--font-display);
  font-size: 1rem;
  text-shadow: 0 1px 12px #0009;
}
.label small {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  opacity: 0.75;
}
@media (prefers-reduced-motion: reduce) {
  .play__pulse {
    animation: none;
  }
}
</style>
