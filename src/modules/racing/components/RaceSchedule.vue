<script setup lang="ts">
import { Calendar } from 'lucide-vue-next'
import { storeToRefs } from 'pinia'

import { useRaceStore } from '@/modules/racing/store'

import RaceScheduleItem from './RaceScheduleItem.vue'

const raceStore = useRaceStore()
const { raceSchedule } = storeToRefs(raceStore)
</script>

<template>
  <div>
    <h2 class="text-lg font-bold mb-4 text-gray-800 dark:text-white">Race Schedule</h2>
    <div v-if="raceSchedule.length === 0" class="text-center text-gray-500 dark:text-gray-400 mt-8">
      <Calendar class="w-16 h-16 text-gray-400 dark:text-gray-500 mb-4 mx-auto" />
      <p class="font-semibold">No schedule yet.</p>
      <p class="text-sm">Generate Schedule to begin</p>
    </div>
    <ul v-else class="space-y-3">
      <RaceScheduleItem
        v-for="(race, index) in raceSchedule"
        :key="race.round"
        :race="race"
        :index="index"
      />
    </ul>
  </div>
</template>

<style scoped></style>
