export interface postWorkoutBB {
    name: string
    exercises: exerciseBB[]
}

export interface exerciseBB {
    name: string
    equipment: string
    rep_max?: number
    series: number
    repetitions: number
}

export interface workoutParamsBB {
    name: string
    exercises: exerciseBB[]
    id: number
}