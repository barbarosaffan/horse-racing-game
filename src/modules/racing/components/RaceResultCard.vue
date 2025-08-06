<script setup lang="ts">
import ResultRankingItem from './ResultsRankItem.vue'

import type { RaceResult } from '@/modules/racing/types'

interface Props {
  result: RaceResult
}

defineProps<Props>()
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
    <h3 class="font-semibold text-gray-800 dark:text-gray-200 mb-2">
      Round {{ result.round }} - {{ result.distance }}m
    </h3>
    <ul class="pt-2 border-t border-gray-200 dark:border-gray-700">
      <ResultRankingItem
        v-for="(ranking, index) in result.rankings"
        :key="ranking.id"
        :ranking="ranking"
        :rank="index"
      />
    </ul>
  </div>
</template>
