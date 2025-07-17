<template>
  <div class="p-2 flex items-center justify-center">
    <div
      :style="{
        backgroundImage: `url(${superhero})`,
      }"
      class="flex items-center justify-center w-48 h-72 bg-cover bg-center rounded-xl cursor-pointer overflow-hidden duration-200 border-1 border-red-200 shadow-xl hover:shadow-lg hover:-translate-y-1 hover:scale-105 hover:border-green-400 hover:shadow-green-500/45 group"
      @click="$emit('openAddHeroModal')"
    >
      <div class="text-7xl text-gray-500">+</div>
    </div>
  </div>
</template>

<script setup>
import superhero from '../assets/images/superhero.png'
</script>
