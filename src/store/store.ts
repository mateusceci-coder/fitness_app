import { configureStore } from "@reduxjs/toolkit";
import profileReducer from './reducers/profile'
import exerciseReducer from './reducers/exercise'
import workoutReducer from './reducers/workout'

const store = configureStore({
    reducer: {
        profile: profileReducer,
        exercise: exerciseReducer,
        workout: workoutReducer,
    }
})

export type RootReducer = ReturnType<typeof store.getState>

export default store

