export interface postWorkoutBB {
    name: string
    exercises: exerciseBB[]
}

export interface exerciseBB {
    name: string
    equipment: string
    series: number
    reps: number
}

export interface workoutParamsBB {
    name: string
    exercises: exerciseBB[]
    id: number
}