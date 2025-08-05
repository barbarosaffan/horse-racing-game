<script setup lang="ts">
import { CheckCircle2, Flag } from 'lucide-vue-next'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

import { useRaceStore } from '@/modules/racing/store'
import { GameState, type Race } from '@/modules/racing/types'

interface Props {
  race: Race
  index: number
}

const props = defineProps<Props>()

const raceStore = useRaceStore()
const { currentRoundIndex, gameState } = storeToRefs(raceStore)

const isCompleted = computed(() => {
  return props.index < currentRoundIndex.value
})

const isCurrent = computed(() => {
  return props.index === currentRoundIndex.value && gameState.value !== GameState.FINISHED
})
</script>

<template>
  <li
    class="p-3 rounded-lg transition-colors duration-200 flex items-center"
    :class="{
      'bg-blue-100 dark:bg-blue-900/50 ring-2 ring-blue-500': isCurrent,
      'bg-gray-100 dark:bg-gray-700/50': !isCurrent,
      'opacity-50': isCompleted,
    }"
  >
    <div class="mr-3 shrink-0">
      <CheckCircle2 v-if="isCompleted" class="w-6 h-6 text-green-500" />
      <Flag v-else class="w-6 h-6 text-gray-500 dark:text-gray-400" />
    </div>
    <div class="flex-grow">
      <p class="font-semibold text-gray-800 dark:text-gray-200">Round {{ race.round }}</p>
      <p class="text-sm text-gray-600 dark:text-gray-400">{{ race.distance }}m</p>
    </div>
  </li>
</template>
