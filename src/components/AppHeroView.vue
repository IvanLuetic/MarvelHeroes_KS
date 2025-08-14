<template>
  <AppAddHeroModal
    :is-visible="isAddHeroModalVisible"
    @close-modal="isAddHeroModalVisible = false"
  />
  <AppEditHeroModal
    :is-visible="isEditHeroModalVisible"
    :hero="selectedHero"
    @close-modal="isEditHeroModalVisible = false"
  />

  <div class="max-w-7xl mx-auto">
    <div class="flex flex-col items-center">
      <div class="relative mb-12">
        <input
          v-model="filter"
          id="filter"
          placeholder="Search for a hero"
          class="lg:w-60 px-4 py-3 border border-amber-300 bg-gray-900/60 rounded-lg focus:ring-1 focus:ring-red-500 text-lg focus:border-red-800 focus:shadow-sm focus:shadow-red-800/40 transition-all duration-300 outline-none"
        />
        <svg
          class="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6"
      >
        <AppHeroCard
          v-for="hero in filteredHeroes"
          :key="hero.id"
          :hero="hero"
          @open-edit-hero-modal="handleOpenEditHeroModal(hero)"
        />
        <AppAddHeroCard @open-add-hero-modal="isAddHeroModalVisible = true" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useHeroesStore } from '@/stores/heroes'
import heroesApi from '@/api/heroesApi'
import AppHeroCard from './AppHeroCard.vue'
import AppAddHeroCard from './AppAddHeroCard.vue'
import AppAddHeroModal from './AppAddHeroModal.vue'
import AppEditHeroModal from './AppEditHeroModal.vue'

const heroesStore = useHeroesStore()
const isAddHeroModalVisible = ref(false)
const isEditHeroModalVisible = ref(false)
const selectedHero = ref({})

const handleOpenEditHeroModal = (hero) => {
  selectedHero.value = hero
  isEditHeroModalVisible.value = true
}

const { filteredHeroes, filter } = storeToRefs(heroesStore)

onMounted(async () => {
  await heroesApi.getHeroes()
})
</script>
