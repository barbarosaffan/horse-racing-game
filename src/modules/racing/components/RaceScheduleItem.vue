<script setup lang="ts">
import { Icon } from '@iconify/vue'
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
      <Icon v-if="isCompleted" icon="ph:check-circle-duotone" class="w-6 h-6 text-green-500" />
      <Icon
        v-else-if="isCurrent"
        icon="ph:hourglass-duotone"
        class="w-6 h-6 text-blue-500 animate-spin"
      />
      <Icon v-else icon="ph:flag-duotone" class="w-6 h-6 text-gray-500 dark:text-gray-400" />
    </div>
    <div class="flex-grow">
      <p class="font-semibold text-gray-800 dark:text-gray-200">Round {{ race.round }}</p>
      <p class="text-sm text-gray-600 dark:text-gray-400">{{ race.distance }}m</p>
    </div>
    <div v-if="isCurrent" class="text-xs font-bold text-blue-600 dark:text-blue-400">CURRENT</div>
  </li>
</template>
