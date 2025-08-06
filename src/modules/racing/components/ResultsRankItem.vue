<script setup lang="ts">
import type { Ranking } from '@/modules/racing/types'

interface Props {
  ranking: Ranking
  rank: number
}

defineProps<Props>()

const getMedal = (index: number) => {
  if (index === 0) return '🥇'
  if (index === 1) return '🥈'
  if (index === 2) return '🥉'
  return `${index + 1}.`
}
</script>

<template>
  <li class="flex items-center justify-between py-1.5">
    <div class="flex items-center">
      <span class="w-8 text-center mr-2 text-lg">{{ getMedal(rank) }}</span>
      <div
        class="w-4 h-4 rounded-full mr-3 shrink-0"
        :style="{ backgroundColor: ranking.color }"
      ></div>
      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ ranking.name }}</span>
    </div>
  </li>
</template>
