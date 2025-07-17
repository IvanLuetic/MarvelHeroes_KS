<template>
  <div
    class="relative min-h-screen w-screen bg-cover bg-center bg-no-repeat overflow-hidden"
    :style="{ backgroundImage: `url(${bg})` }"
  >
    <div class="absolute inset-0 bg-black/45 backdrop-blur-[2px] z-0 pointer-events-none"></div>

    <div class="relative z-10">
      <AppHeader />
      <AppHeroView />
    </div>
  </div>
</template>

<script setup>
import AppHeroView from '@/components/AppHeroView.vue'
import AppHeader from '@/components/AppHeader.vue'
import bg from '../assets/images/bg.jpg'
</script>
