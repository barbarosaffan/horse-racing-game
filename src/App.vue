<script setup lang="ts">
import { storeToRefs } from 'pinia'

import Layout from '@/core/components/Layout.vue'
import ControlPanel from '@/modules/racing/components/Controls.vue'
import AllHorses from '@/modules/racing/components/HorseList.vue'
import RaceResultsPanel from '@/modules/racing/components/RaceResults.vue'
import RaceSchedule from '@/modules/racing/components/RaceSchedule.vue'
import RaceTrack from '@/modules/racing/components/RaceTrack.vue'
import HorseList from '@/modules/racing/components/RacingHorseList.vue'
import { useRaceStore } from '@/modules/racing/store'

const raceStore = useRaceStore()
const { raceSchedule } = storeToRefs(raceStore)
</script>

<template>
  <Layout>
    <template #header>
      <ControlPanel />
    </template>

    <template #left>
      <div class="flex flex-col space-y-6">
        <RaceSchedule />
        <template v-if="raceSchedule.length > 0">
          <hr class="border-gray-200 dark:border-gray-700" />
          <HorseList />
          <hr class="border-gray-200 dark:border-gray-700" />
          <AllHorses />
        </template>
      </div>
    </template>

    <template #center>
      <RaceTrack />
    </template>

    <template #right>
      <RaceResultsPanel />
    </template>
  </Layout>
</template>

<style scoped></style>
