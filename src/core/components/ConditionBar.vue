<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  value: number
}

const props = defineProps<Props>()

const normalizedValue = computed(() => {
  return Math.max(0, Math.min(100, props.value))
})

const barColorClass = computed(() => {
  if (normalizedValue.value > 66) return 'bg-green-500'
  if (normalizedValue.value > 33) return 'bg-yellow-500'
  return 'bg-red-500'
})
</script>

<template>
  <div class="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
    <div
      class="h-full rounded-full transition-all duration-300 ease-in-out"
      :class="barColorClass"
      :style="{ width: `${normalizedValue}%` }"
    ></div>
  </div>
</template>
