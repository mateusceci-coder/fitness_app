export interface workoutParamsCF {
    id: number
    name: string
    rounds?: string
    type: string
    time_cap: number
    exercises: exercisesParamsCF[]
}

export interface exercisesParamsCF {
    reps: number
    weight_men?: number
    weight_women: number
    equipment: string
}