export interface Horse {
  id: number
  name: string
  color: string
  condition: number
}

export interface Ranking {
  id: number
  name: string
  color: string
  time: number
}

export interface Race {
  round: number
  distance: number
  horseIds: number[]
}

export interface RaceResult {
  round: number
  distance: number
  rankings: Ranking[]
}

export interface RaceState {
  horses: Horse[]
  raceSchedule: Race[]
  raceResults: RaceResult[]
  currentRoundIndex: number
  gameState: GameState
  raceDurations: Record<number, number>
  raceFinishTimer: number | null
  raceStartTime: number | null
  timePaused: number | null
}

export enum GameState {
  INITIAL = 'initial',
  READY = 'ready',
  RACING = 'racing',
  PAUSED = 'paused',
  FINISHED = 'finished',
}
