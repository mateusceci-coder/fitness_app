import { configureStore } from "@reduxjs/toolkit";
import profileReducer from './reducers/profile'
import exerciseReducer from './reducers/exercise'
import workoutReducer from './reducers/workout'
import registerReducer from "@/api/register/registerSlice";
import updateReducer  from "@/api/profile/profileSlice"
import createExerciseReducer from "@/api/exercise/exerciseSlice"

const store = configureStore({
    reducer: {
        profile: profileReducer,
        exercise: exerciseReducer,
        workout: workoutReducer,
        register: registerReducer,
        update: updateReducer,
        createExercise : createExerciseReducer
    }
})

export type RootReducer = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store

