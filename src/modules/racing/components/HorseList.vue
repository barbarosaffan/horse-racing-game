<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useRaceStore } from '@/modules/racing/store'

import HorseItem from './HorseItem.vue'

const raceStore = useRaceStore()
const { currentRoundHorses } = storeToRefs(raceStore)
</script>

<template>
  <div v-if="currentRoundHorses.length > 0">
    <h3 class="text-lg font-bold mb-3 text-gray-800 dark:text-white">Racing Horses</h3>
    <ul class="space-y-2">
      <HorseItem v-for="horse in currentRoundHorses" :key="horse.id" :horse="horse" />
    </ul>
  </div>
</template>
