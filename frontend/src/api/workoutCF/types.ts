export interface workoutParamsCF {
    id: number
    name: string
    rounds?: number
    execution_type: string
    time_cap: number
    exercises: exercisesParamsCF[]
}

export interface exercisesParamsCF {
    name: string
    reps: number
    weight_for_men?: number
    weight_for_women?: number
    equipment: string
}

export interface postWorkoutCF {
    name: string
    rounds?: number
    execution_type: string
    time_cap: number
    exercises: exercisesParamsCF[]
}