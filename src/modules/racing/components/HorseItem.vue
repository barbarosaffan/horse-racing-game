<script setup lang="ts">
import ConditionBar from '@/core/components/ConditionBar.vue'

import type { Horse } from '@/modules/racing/types'

interface Props {
  horse: Horse
}

defineProps<Props>()
</script>

<template>
  <li class="flex items-center p-2 bg-gray-50 dark:bg-gray-700/40 rounded-md justify-between">
    <div class="flex items-center mr-4">
      <div class="w-4 h-4 rounded-full mr-3" :style="{ backgroundColor: horse.color }"></div>
      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ horse.name }}</span>
    </div>
    <ConditionBar :value="horse.condition" />
  </li>
</template>
