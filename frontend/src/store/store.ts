import { configureStore } from "@reduxjs/toolkit";
import profileReducer from './reducers/profile'
import exerciseReducer from './reducers/exercise'
import workoutReducer from './reducers/workout'
import registerReducer from "@/api/register/registerSlice";


const store = configureStore({
    reducer: {
        profile: profileReducer,
        exercise: exerciseReducer,
        workout: workoutReducer,
        register: registerReducer
    }
})

export type RootReducer = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store

