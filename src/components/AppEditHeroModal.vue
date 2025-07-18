<template>
  <Transition>
    <div
      v-if="isVisible"
      class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm overflow-y-auto flex items-start justify-center pt-8 pb-8"
    >
      <div
        class="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl text-white rounded-2xl w-full max-w-4xl mx-4 border border-green-500/30 overflow-y-hidden"
      >
        <div class="flex justify-between items-center p-6 border-b border-red-500/20 bg-black/20">
          <h2 class="text-2xl font-bold text-red-400 uppercase tracking-wide">Edit Hero</h2>
          <button
            @click="$emit('closeModal')"
            class="text-gray-400 hover:text-red-400 transition-colors duration-200 text-2xl w-8 h-8 flex items-center justify-center cursor-pointer rounded-full hover:bg-red-500/10"
          >
            ✕
          </button>
        </div>

        <div
          v-if="loading"
          class="flex items-center justify-center p-8 absolute top-2 left-1/2 transform -translate-x-1/2"
        >
          <div
            class="w-8 h-8 border-4 border-dotted border-gray-400 border-t-transparent rounded-full animate-spin"
          ></div>
        </div>

        <div
          v-else-if="error || message"
          class="flex items-center justify-center p-10 absolute top-0 left-1/2"
        >
          <h4 :style="{ color: message ? 'green' : 'red' }">
            {{ message || 'Error loading hero data: ' + error }}
          </h4>
        </div>

        <div class="flex flex-col lg:flex-row">
          <div class="lg:w-1/3 w-2/5 md:p-6 bg-black/10 mx-auto">
            <div
              class="aspect-[3/4] bg-gray-700/50 rounded-lg mt-2 border-1 border-dashed border-gray-600"
            >
              <div
                :style="{ backgroundImage: `url(${editHero.imageUrl})` }"
                class="w-full h-full lg:h-95 bg-cover bg-center rounded-lg"
              ></div>
            </div>
          </div>

          <div class="lg:w-2/3 p-6">
            <form @submit.prevent="submitHero" class="space-y-4">
              <div class="grid grid-cols-2 gap-2">
                <div class="space-y-2">
                  <label for="name" class="block text-sm font-medium text-red-300">Hero Name</label>
                  <input
                    type="text"
                    id="name"
                    v-model="editHero.name"
                    class="w-full p-3 focus:outline-none focus:ring-1 focus:ring-gray-200 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 transition-all duration-100"
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
                    v-model="editHero.fullName"
                    class="w-full p-3 focus:outline-none focus:ring-1 focus:ring-gray-200 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 transition-all duration-100"
                    required
                  />
                </div>
              </div>

              <div class="space-y-2">
                <label for="bio" class="block text-sm font-medium text-red-300">Biography</label>
                <textarea
                  id="bio"
                  v-model="editHero.bio"
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
                    v-model="editHero.actor"
                    class="w-full p-3 focus:outline-none focus:ring-1 focus:ring-gray-200 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 transition-all duration-100"
                    required
                  />
                </div>

                <div class="space-y-2">
                  <label for="createdBy" class="block text-sm font-medium text-red-300"
                    >Created By</label
                  >
                  <input
                    type="text"
                    id="createdBy"
                    v-model="editHero.createdBy"
                    class="w-full p-3 focus:outline-none focus:ring-1 focus:ring-gray-200 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 transition-all duration-100"
                    required
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
                    v-model="editHero.abilities"
                    class="w-full p-3 focus:outline-none focus:ring-1 focus:ring-gray-200 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 transition-all duration-100"
                  />
                </div>

                <div class="space-y-2">
                  <label for="imageUrl" class="block text-sm font-medium text-red-300"
                    >Image URL</label
                  >
                  <input
                    type="text"
                    id="imageUrl"
                    v-model="editHero.imageUrl"
                    class="w-full p-3 focus:outline-none focus:ring-1 focus:ring-gray-200 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 transition-all duration-100"
                    required
                  />
                </div>
              </div>

              <div class="flex justify-center md:justify-end pt-4 gap-2">
                <div>
                  <button
                    type="submit"
                    class="px-7 py-3 bg-gradient-to-r cursor-pointer from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-lg shadow-sm hover:shadow-blue-500/25 transition-all duration-200 transform hover:scale-105"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    @click="deleteHero"
                    class="px-7 py-3 bg-gradient-to-r cursor-pointer from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-lg shadow-sm hover:shadow-red-500/25 transition-all duration-200 transform hover:scale-105 ml-2"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch } from 'vue'
import heroesApi from '@/api/heroesApi'

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
  hero: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['closeModal'])

const editHero = ref({})
const loading = ref(false)
const error = ref(null)
const message = ref('')

// Watch for changes hero prop
watch(
  () => [props.hero?.id],
  async ([heroId]) => {
    if (heroId) {
      await loadHeroData(heroId)
    }
  },
  { immediate: true },
)

const loadHeroData = async (heroId) => {
  loading.value = true
  error.value = null

  try {
    const response = await heroesApi.getHero(heroId)
    editHero.value = response

    //separate abilities in the modal
    editHero.value = {
      ...editHero.value,
      abilities: editHero.value.abilities.join(', '),
    }
  } catch (err) {
    error.value = err.message || 'Failed to load hero data'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const submitHero = async () => {
  try {
    loading.value = true
    message.value = 'Updating hero'
    let { id, ...data } = editHero.value

    //if there are abilities, split them by comma
    data.abilities = data.abilities
      ? data.abilities.split(',').map((ability) => ability.trim())
      : []
    await heroesApi.editHero(id, data)
    message.value = 'Hero updated!'
  } catch (err) {
    error.value = err.message || 'Failed to update hero'
    console.error(err)
  } finally {
    loading.value = false
    setTimeout(() => {
      message.value = ''
    }, 3000)
  }
}

const deleteHero = async () => {
  if (confirm('Are you sure you want to delete this hero?')) {
    try {
      loading.value = true
      message.value = 'Deleting hero'
      await heroesApi.deleteHero(editHero.value.id)
    } catch (err) {
      error.value = err.message || 'Failed to delete hero'
    } finally {
      emit('closeModal')
      loading.value = false
      message.value = ''
    }
  }
}
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
