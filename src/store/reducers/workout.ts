import { createSlice, PayloadAction } from "@reduxjs/toolkit"


export interface crossfitExercise {
    nameExercise: string,
    repsExercise: number
    mensWeight?: number
    womensWeight?: number
}
interface workoutCrossfitParams {
    name: string
    type: string
    rounds?: number
    timeCap: number
    exercise: crossfitExercise[]
}

interface workoutList {
    workoutsCrossfit: workoutCrossfitParams[]
}

const initialState: workoutList = {
    workoutsCrossfit: []
}

const workoutSlice = createSlice({
    name: "workout",
    initialState,
    reducers: {
        addNewCrossfitWorkout: (state, action: PayloadAction<workoutCrossfitParams>) => {
            state.workoutsCrossfit.push(action.payload)
        }
    }
})

export const { addNewCrossfitWorkout } = workoutSlice.actions

export default workoutSlice.reducer