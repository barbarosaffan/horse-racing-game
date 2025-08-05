<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  disabled: false,
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'success':
      return 'bg-green-500 hover:bg-green-600 focus:ring-green-400'
    case 'warning':
      return 'bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-400'
    case 'danger':
      return 'bg-red-500 hover:bg-red-600 focus:ring-red-400'
    case 'secondary':
      return 'bg-gray-500 hover:bg-gray-600 focus:ring-gray-400'
    case 'primary':
    default:
      return 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-400'
  }
})

const baseClasses =
  'px-4 py-2 font-semibold text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 transition-colors duration-200'

const disabledClasses = 'disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none'

const finalClasses = computed(() => [baseClasses, variantClasses.value, disabledClasses])
</script>

<template>
  <button :class="finalClasses" :disabled="props.disabled">
    <slot />
  </button>
</template>

<style scoped></style>
