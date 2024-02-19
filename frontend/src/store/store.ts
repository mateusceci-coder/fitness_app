import { configureStore } from "@reduxjs/toolkit";
import profileReducer from './reducers/profile'
import exerciseReducer from './reducers/exercise'
import workoutReducer from './reducers/workout'
import registerReducer from "@/api/register/registerSlice";
import updateReducer  from "@/api/profile/profileSlice"
import exercisesReducer from "@/api/exercise/exerciseSlice";

const store = configureStore({
    reducer: {
        profile: profileReducer,
        exercise: exerciseReducer,
        workout: workoutReducer,
        register: registerReducer,
        update: updateReducer,
        exercises: exercisesReducer
    }
})

export type RootReducer = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store

