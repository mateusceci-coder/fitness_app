import { configureStore } from "@reduxjs/toolkit";
import profileReducer from './reducers/profile'
import exerciseReducer from './reducers/exercise'

const store = configureStore({
    reducer: {
        profile: profileReducer,
        exercise: exerciseReducer
    }
})

export type RootReducer = ReturnType<typeof store.getState>

export default store

