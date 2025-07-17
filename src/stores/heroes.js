import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useHeroesStore = defineStore('heroesStore', () => {
  const heroes = ref([])
  const filter = ref('')

  const filteredHeroes = computed(() => {
    if (!filter.value) return heroes.value
    return heroes.value.filter((hero) =>
      hero.name.toLowerCase().includes(filter.value.toLowerCase()),
    )
  })

  return { heroes, filter, filteredHeroes }
})
