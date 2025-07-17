<template>
  <Transition>
    <div
      v-if="props.isVisible"
      class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm overflow-y-auto flex items-start justify-center pt-8 pb-8"
    >
      <div
        class="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl text-white rounded-2xl w-full max-w-4xl mx-4 border border-green-500/30 overflow-y-hidden"
      >
        <div class="flex justify-between items-center p-6 border-b border-red-500/20 bg-black/20">
          <h2 class="text-2xl font-bold text-red-400 uppercase tracking-wide">Add New Hero</h2>

          <div v-if="loading" class="flex items-center justify-center p-8">
            <div class="text-gray-400">Submitting...</div>
          </div>

          <div v-else-if="error" class="relative flex items-center justify-center p-8">
            <div class="text-red-400">Error creating hero: {{ error }}</div>
          </div>

          <button
            @click="$emit('closeModal')"
            class="text-gray-400 hover:text-red-400 transition-colors duration-200 text-2xl w-8 h-8 flex items-center justify-center cursor-pointer rounded-full hover:bg-red-500/10"
          >
            ✕
          </button>
        </div>

        <div class="flex flex-col lg:flex-row">
          <div class="lg:w-1/3 w-2/5 md:p-6 bg-black/10 mx-auto">
            <div
              class="aspect-[3/4] bg-gray-700/50 rounded-lg mt-2 border-1 border-dashed border-gray-600"
            >
              <div
                :style="{ backgroundImage: `url(${superhero2})` }"
                class="w-full h-full lg:h-95 bg-cover bg-center rounded-lg"
              ></div>
            </div>
          </div>

          <div class="lg:w-2/3 p-6">
            <form @submit.prevent="submitHero" class="space-y-4">
              <div class="grid grid-cols-2 gap-2 md:gap-4">
                <div class="space-y-2">
                  <label for="name" class="block text-sm font-medium text-red-300">Hero Name</label>
                  <input
                    type="text"
                    id="name"
                    v-model="hero.name"
                    class="w-full p-3 focus:outline-none focus:ring-1 focus:ring-gray-200 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 transition-all duration-100"
                    placeholder="e.g. Spider-Man"
                    required
                  />
                </div>

                <div class="space-y-2">
                  <label for="fullName" class="block text-sm font-medium text-red-300"
                    >Full Name</label
                  >
                  <input
                    type="text"
                    id="fullName"
                    v-model="hero.fullName"
                    class="w-full p-3 focus:outline-none focus:ring-1 focus:ring-gray-200 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 transition-all duration-100"
                    required
                    placeholder="e.g. Peter Parker"
                  />
                </div>
              </div>

              <div class="space-y-2">
                <label for="bio" class="block text-sm font-medium text-red-300">Biography</label>
                <textarea
                  id="bio"
                  v-model="hero.bio"
                  class="w-full p-3 focus:outline-none focus:ring-1 focus:ring-gray-200 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 transition-all duration-100"
                  required
                  placeholder="Short description of the hero"
                ></textarea>
              </div>

              <div class="grid grid-cols-2 gap-2 md:gap-4">
                <div class="space-y-2">
                  <label for="actor" class="block text-sm font-medium text-red-300"
                    >Portrayed By</label
                  >
                  <input
                    type="text"
                    id="actor"
                    v-model="hero.actor"
                    class="w-full p-3 focus:outline-none focus:ring-1 focus:ring-gray-200 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 transition-all duration-100"
                    required
                    placeholder="e.g. Toby Maguire"
                  />
                </div>

                <div class="space-y-2">
                  <label for="createdBy" class="block text-sm font-medium text-red-300"
                    >Created By</label
                  >
                  <input
                    type="text"
                    id="createdBy"
                    v-model="hero.createdBy"
                    class="w-full p-3 focus:outline-none focus:ring-1 focus:ring-gray-200 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 transition-all duration-100"
                    required
                    placeholder="e.g. Stan Lee"
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-2">
                  <label for="abilities" class="block text-sm font-medium text-red-300"
                    >Abilities</label
                  >
                  <input
                    type="text"
                    id="abilities"
                    v-model="hero.abilities"
                    class="w-full p-3 focus:outline-none focus:ring-1 focus:ring-gray-200 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 transition-all duration-100"
                    placeholder="Comma-separated"
                  />
                </div>

                <div class="space-y-2">
                  <label for="imageUrl" class="block text-sm font-medium text-red-300"
                    >Image URL</label
                  >
                  <input
                    type="text"
                    id="imageUrl"
                    v-model="hero.imageUrl"
                    class="w-full p-3 focus:outline-none focus:ring-1 focus:ring-gray-200 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 transition-all duration-100"
                    required
                    placeholder="Link to the image"
                  />
                </div>
              </div>

              <div class="flex justify-end pt-4 w-full">
                <button
                  type="submit"
                  class="px-8 py-3 bg-gradient-to-r cursor-pointer from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-lg shadow-lg hover:shadow-red-500/25 transition-all duration-200 transform hover:scale-105"
                >
                  Add Hero
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref } from 'vue'
import superhero2 from '../assets/images/superhero2.png'
import heroesApi from '@/api/heroesApi'

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['closeModal'])

const hero = ref({
  name: '',
  fullName: '',
  bio: '',
  actor: '',
  abilities: [],
  createdBy: '',
  imageUrl: '',
})
const loading = ref(false)
const error = ref('')

const submitHero = async () => {
  try {
    loading.value = true

    // check if it was already converted to an array, if not then convert
    hero.value.abilities = Array.isArray(hero.value.abilities)
      ? hero.value.abilities || []
      : hero.value.abilities.split(',').map((ability) => ability.trim())

    await heroesApi.createHero(hero.value)
    emit('closeModal')
    //reset values after closing
    Object.keys(hero.value).forEach((i) => {
      hero.value[i] = ''
    })
    error.value = ''
  } catch (err) {
    error.value = err.response?.data.message
    console.error(err)
    setTimeout(() => {
      error.value = ''
    }, 3000)
  } finally {
    loading.value = false
  }
}
setTimeout(() => {
  error.value = ''
}, 3000)
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
