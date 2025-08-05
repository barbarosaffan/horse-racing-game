<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

import BaseButton from '@/core/components/BaseButton.vue'
import { RACING_CONFIGURATION } from '@/modules/racing/constants'
import { useRaceStore } from '@/modules/racing/store'
import { GameState } from '@/modules/racing/types'

const raceStore = useRaceStore()
const { gameState, currentRoundIndex } = storeToRefs(raceStore)

const totalRounds = RACING_CONFIGURATION.DISTANCES.length

const initializeAndGenerate = () => {
  raceStore.initializeHorses()
  raceStore.generateProgram()
}

const startRace = () => {
  raceStore.startOrResumeRace()
}

const pauseRace = () => {
  raceStore.pauseRace()
}

const resetRace = () => {
  raceStore.resetGame()
}

const isResetButtonAvailable = computed(() => {
  return (
    gameState.value === GameState.FINISHED ||
    gameState.value === GameState.RACING ||
    gameState.value === GameState.PAUSED
  )
})

const isStartButtonAvailable = computed(() => {
  return gameState.value === GameState.READY || gameState.value === GameState.PAUSED
})

const isRoundCounterVisible = computed(() => {
  return gameState.value !== GameState.INITIAL && gameState.value !== GameState.FINISHED
})
</script>

<template>
  <div class="w-full">
    <div
      class="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-y-4 py-2"
    >
      <h1 class="text-xl font-bold text-gray-800 dark:text-white shrink-0">Horse Racing Game</h1>
      <div v-if="isRoundCounterVisible" class="text-center order-first lg:order-none">
        <span class="font-semibold text-lg text-gray-700 dark:text-gray-300">
          Round: {{ currentRoundIndex + 1 }} / {{ totalRounds }}
        </span>
      </div>
      <div class="flex items-center justify-center gap-2 flex-wrap shrink-0">
        <BaseButton
          v-if="gameState === GameState.INITIAL"
          @click="initializeAndGenerate"
          variant="primary"
        >
          Generate Program
        </BaseButton>
        <BaseButton v-if="isStartButtonAvailable" @click="startRace" variant="success">
          {{ gameState === GameState.PAUSED ? 'Resume' : 'Start' }}
        </BaseButton>
        <BaseButton v-if="gameState === GameState.RACING" @click="pauseRace" variant="warning">
          Pause
        </BaseButton>
        <BaseButton v-if="isResetButtonAvailable" @click="resetRace" variant="danger">
          {{ gameState === GameState.FINISHED ? 'Start New Race' : 'Reset' }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
