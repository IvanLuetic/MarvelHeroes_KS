<template>
  <button
    class="w-full py-2 px-4 rounded-lg text-white font-bold text-lg tracking-wide duration-300"
    style="font-family: 'Oswald', sans-serif"
    :class="[
      props.primary
        ? 'bg-gradient-to-br from-red-600 to-red-700 border-2 border-red-600 hover:from-red-500 hover:to-red-600 cursor-pointer hover:shadow-sm hover:shadow-red-500/60'
        : '',
      props.secondary
        ? 'bg-gradient-to-br from-blue-600 to-blue-700 border-2 border-blue-600 hover:from-blue-500 hover:to-blue-600   cursor-pointer hover:shadow-xs hover:shadow-blue-500/30'
        : '',
      props.tertiary
        ? 'bg-gradient-to-br from-gray-600 to-gray-700 border-2 border-gray-600 hover:from-gray-500 hover:to-gray-600 hover:shadow-sm hover:shadow-gray-500/60'
        : '',
    ]"
  >
    <span>{{ props.label }}</span>
  </button>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  primary: {
    type: Boolean,
    default: false,
  },
  secondary: {
    type: Boolean,
    default: false,
  },
  tertiary: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: Object,
    default: null,
  },
})
</script>
