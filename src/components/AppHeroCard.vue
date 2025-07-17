<template>
  <div class="p-2 flex items-center justify-center">
    <div
      :style="{
        backgroundImage: `url(${props.hero.imageUrl})`,
      }"
      class="relative w-48 h-72 bg-cover bg-center rounded-xl cursor-pointer overflow-hidden duration-200 border-1 border-red-200 shadow-xl hover:shadow-lg hover:-translate-y-1 hover:scale-105 hover:border-red-500 hover:shadow-red-500/35 group"
      @click="emit('openEditHeroModal')"
    >
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"
      ></div>

      <div class="absolute bottom-0 left-0 right-0 p-4 z-10">
        <p
          class="text-gray-300 text-xs font-black text-center uppercase tracking-wide drop-shadow-lg"
        >
          {{ hero.name }}
        </p>
      </div>

      <!-- Hover edit icon -->
      <div
        class="absolute top-3 right-3 w-6 h-6 text-w opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
          <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  hero: {
    type: Object,
  },
})

const emit = defineEmits(['openEditHeroModal'])
</script>
