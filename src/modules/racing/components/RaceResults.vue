<script setup lang="ts">
import { Trophy } from 'lucide-vue-next'
import { storeToRefs } from 'pinia'

import { useRaceStore } from '@/modules/racing/store'

import RaceResultCard from './RaceResultCard.vue'

const raceStore = useRaceStore()
const { raceResults } = storeToRefs(raceStore)
</script>

<template>
  <div>
    <h2 class="text-xl font-bold mb-4 text-gray-800 dark:text-white">Results</h2>
    <div
      v-if="raceResults.length === 0"
      class="flex flex-col items-center text-center text-gray-500 dark:text-gray-400 mt-12"
    >
      <Trophy class="w-16 h-16 text-gray-400 dark:text-gray-500 mb-4" />
      <p class="font-semibold">No results yet.</p>
      <p class="text-sm">Complete a race to see the outcome here.</p>
    </div>
    <div v-else class="space-y-4">
      <RaceResultCard
        v-for="result in [...raceResults].reverse()"
        :key="result.round"
        :result="result"
      />
    </div>
  </div>
</template>
