<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { storeToRefs } from 'pinia'
import { onUnmounted, ref } from 'vue'

import { useRaceStore } from '@/modules/racing/store'
import { GameState, type Horse } from '@/modules/racing/types'

const raceStore = useRaceStore()
const { currentRoundHorses, gameState, raceDurations, raceStartTime } = storeToRefs(raceStore)

const currentTime = ref(Date.now())
let animationFrameId: number | null = null

const animationLoop = () => {
  currentTime.value = Date.now()
  if (gameState.value === GameState.RACING) {
    animationFrameId = requestAnimationFrame(animationLoop)
  }
}

const unsubscribe = raceStore.$subscribe((_mutation, state) => {
  if (state.gameState === GameState.RACING && animationFrameId === null) {
    currentTime.value = Date.now()
    animationFrameId = requestAnimationFrame(animationLoop)
  } else if (state.gameState !== GameState.RACING && animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }
})

const getHorseProgress = (horse: Horse): number => {
  if (gameState.value !== GameState.RACING || !raceStartTime.value) {
    return 0
  }

  const elapsedTime = (currentTime.value - raceStartTime.value) / 1000
  const totalDuration = raceDurations.value[horse.id] || 1
  const progress = (elapsedTime / totalDuration) * 100

  return Math.min(progress, 100)
}

const getHorseStyle = (horse: Horse) => {
  const progress = getHorseProgress(horse)
  return {
    left: `calc(${progress}% - ${progress / 100} * 2.5rem)`,
  }
}

onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
  unsubscribe()
})
</script>

<template>
  <div class="p-4 sm:p-6 rounded-lg bg-gray-50 dark:bg-gray-800 shadow-inner">
    <div v-if="currentRoundHorses.length > 0" class="space-y-3">
      <div
        v-for="horse in currentRoundHorses"
        :key="horse.id"
        class="track-lane relative h-12 w-full bg-gray-200 dark:bg-gray-700"
      >
        <div
          class="absolute left-0 top-0 bottom-0 w-1.5 rounded-full bg-green-500"
          title="Start"
        ></div>
        <div
          class="horse-icon absolute top-0 bottom-0 flex items-center"
          :style="getHorseStyle(horse)"
        >
          <Icon icon="ph:horse-duotone" class="w-10 h-10" :style="{ color: horse.color }" />
        </div>

        <div
          class="absolute right-0 top-0 bottom-0 w-1.5 rounded-full bg-red-500"
          title="Finish"
        ></div>
      </div>
    </div>
    <div v-else class="text-center py-16 text-gray-500 dark:text-gray-400">
      <p class="text-lg font-medium">The track is empty.</p>
      <p>Generate a program and start a race to see the action.</p>
    </div>
  </div>
</template>

<style scoped>
.horse-icon {
  transition: left 0.5s ease-in-out;
}
.is-racing .horse-icon {
  transition: none;
}
</style>
