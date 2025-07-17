<template>
  <div class="mb-4">
    <input
      :id="props.id"
      :type="props.type"
      :value="props.modelValue"
      :placeholder="props.id"
      class="w-full px-3 py-2 rounded-lg text-gray-300 placeholder-gray-400 bg-gray-800/90 border-2 border-yellow-500/40 focus:border-red-800 focus:shadow-sm focus:shadow-red-800/40 transition-all duration-300 outline-none"
      style="font-family: 'Oswald', sans-serif"
      v-model="modelValue"
    />
    <div v-if="errorMessage" class="text-red-500/85 ml-2 text-sm">{{ errorMessage }}</div>
  </div>
</template>

<script setup>
import { defineModel, ref, watch } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'text',
  },
  label: {
    type: String,
    required: true,
  },
  error: {
    type: String,
    required: false,
  },
})
const modelValue = defineModel()
const errorMessage = ref('')
watch(
  () => props.error,
  () => {
    errorMessage.value = props.error
  },
)
</script>
