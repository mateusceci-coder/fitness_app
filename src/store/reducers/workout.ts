import { createSlice } from "@reduxjs/toolkit"

interface workoutParams {
    type: string
    rounds: number
    timeCap: number
    MensWeight?: number
    WomensWeight?: number
    exercise: string
}

const initialState: workoutParams = {
    type: "",
    rounds: 1,
    timeCap: 0,
    exercise: ""
}

const workoutSlice = createSlice({
    name: "workout",
    initialState,
    reducers: {

    }
})

export default workoutSlice.reducer