import { defineStore } from 'pinia'

import { generateRandomInRange, shuffleArray } from '@/core/utils'
import { HORSE_DATA, RACING_CONFIGURATION } from '@/modules/racing/constants'
import { GameState, type Horse, type Race, type RaceState } from '@/modules/racing/types'

export type { Horse, Race, RaceResult } from '@/modules/racing/types'

export const useRaceStore = defineStore('race', {
  state: (): RaceState => ({
    horses: [],
    raceSchedule: [],
    raceResults: [],
    currentRoundIndex: 0,
    gameState: GameState.INITIAL,
    raceDurations: {},
    raceFinishTimer: null,
    raceStartTime: null,
    timePaused: null,
  }),

  getters: {
    currentRound(state): Race | null {
      return state.raceSchedule[state.currentRoundIndex] || null
    },
    currentRoundHorses(state): Horse[] {
      if (!this.currentRound) {
        return []
      }
      const horseIdSet = new Set(this.currentRound.horseIds)
      return state.horses.filter((horse) => horseIdSet.has(horse.id))
    },
    isRaceOver(state): boolean {
      return state.gameState === GameState.FINISHED
    },
  },

  actions: {
    initializeHorses() {
      this.horses = Array.from({ length: RACING_CONFIGURATION.HORSE_COUNT }, (_, i) => ({
        id: i + 1,
        name: HORSE_DATA.NAMES[i],
        color: HORSE_DATA.COLORS[i],
        condition: generateRandomInRange(1, 100),
      }))
      this.resetGame()
    },

    generateProgram() {
      if (this.horses.length < RACING_CONFIGURATION.HORSE_COUNT) {
        return
      }

      this.resetGame()

      const allHorseIds = this.horses.map((h) => h.id)

      this.raceSchedule = RACING_CONFIGURATION.DISTANCES.map((distance, index) => {
        const shuffledHorseIds = shuffleArray([...allHorseIds])
        return {
          round: index + 1,
          distance,
          horseIds: shuffledHorseIds.slice(0, RACING_CONFIGURATION.HORSE_PER_RACE),
        }
      })

      this.gameState = GameState.READY
    },

    _calculateRaceDurations() {
      const durations: Record<number, number> = {}
      const distance = this.currentRound!.distance

      this.currentRoundHorses.forEach((horse) => {
        const speed =
          RACING_CONFIGURATION.BASE_SPEED +
          (horse.condition / 100) * RACING_CONFIGURATION.CONDITION_EFFECT +
          Math.random() * RACING_CONFIGURATION.SPEED_RANDOM_FACTOR

        const duration = (distance / speed) * RACING_CONFIGURATION.DURATION_CALCULATION_FACTOR
        durations[horse.id] = parseFloat(duration.toFixed(2))
      })

      this.raceDurations = durations
    },

    startOrResumeRace() {
      if (this.gameState === GameState.READY) {
        this._calculateRaceDurations()
        this.raceStartTime = Date.now()
        this.gameState = GameState.RACING

        const maxDuration = Math.max(...Object.values(this.raceDurations))
        this.raceFinishTimer = window.setTimeout(() => {
          this._finishRound()
        }, maxDuration * 1000)
      } else if (this.gameState === GameState.PAUSED) {
        const timeElapsedSincePause = Date.now() - this.timePaused!
        this.raceStartTime! += timeElapsedSincePause
        this.gameState = GameState.RACING

        const slowestHorseDuration = Math.max(...Object.values(this.raceDurations))
        const totalRaceTime = this.raceStartTime! + slowestHorseDuration * 1000
        const remainingTime = totalRaceTime - Date.now()

        this.raceFinishTimer = window.setTimeout(() => {
          this._finishRound()
        }, remainingTime)
      }
    },

    pauseRace() {
      if (this.gameState !== GameState.RACING) return

      window.clearTimeout(this.raceFinishTimer!)
      this.timePaused = Date.now()
      this.gameState = GameState.PAUSED
    },

    _finishRound() {
      const rankedHorses = this.currentRoundHorses
        .sort((a, b) => this.raceDurations[a.id] - this.raceDurations[b.id])
        .map((horse) => ({
          id: horse.id,
          name: horse.name,
          color: horse.color,
          time: this.raceDurations[horse.id],
        }))

      this.raceResults.push({
        round: this.currentRound!.round,
        distance: this.currentRound!.distance,
        rankings: rankedHorses,
      })

      if (this.currentRoundIndex >= RACING_CONFIGURATION.DISTANCES.length - 1) {
        this.gameState = GameState.FINISHED
      } else {
        this.currentRoundIndex++
        this.gameState = GameState.READY
      }
    },

    resetGame() {
      window.clearTimeout(this.raceFinishTimer!)

      this.raceSchedule = []
      this.raceResults = []
      this.currentRoundIndex = 0
      this.gameState = GameState.INITIAL
      this.raceDurations = {}
      this.raceFinishTimer = null
      this.raceStartTime = null
      this.timePaused = null
    },
  },
})
