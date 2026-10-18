<script setup>
import { videos } from '@/data/content.js'
import VideoSlot from './VideoSlot.vue'
</script>

<template>
  <section id="videos" class="section videos">
    <div class="container">
      <div class="head">
        <p v-fade class="eyebrow">{{ videos.eyebrow }}</p>
        <h2 v-words class="section-title">{{ videos.title }}</h2>
      </div>

      <!-- Featured video on the left, two smaller ones stacked on the right (single column on phones) -->
      <div class="layout">
        <VideoSlot v-fade class="layout__main" :video="videos.featured" large />
        <div class="layout__side">
          <VideoSlot v-for="(v, i) in videos.more" :key="v.title" v-fade="120 + i * 120" :video="v" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.head {
  max-width: 720px;
}
.layout {
  margin-top: 48px;
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  gap: 20px;
  align-items: start;
}
.layout__side {
  display: grid;
  gap: 20px;
}

@media (max-width: 900px) {
  .layout {
    grid-template-columns: 1fr;
  }
  .layout__side {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 560px) {
  .layout__side {
    grid-template-columns: 1fr;
  }
}
</style>
