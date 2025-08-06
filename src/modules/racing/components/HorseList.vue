<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useRaceStore } from '@/modules/racing/store'

import HorseItem from './HorseItem.vue'

const raceStore = useRaceStore()
const { horses } = storeToRefs(raceStore)
</script>

<template>
  <div v-if="horses.length > 0" class="w-full">
    <h3 class="text-lg font-bold text-gray-800 dark:text-white mb-3">
      All Horses ({{ horses.length }})
    </h3>
    <ul class="space-y-2">
      <HorseItem v-for="horse in horses" :key="horse.id" :horse="horse" />
    </ul>
  </div>
</template>
