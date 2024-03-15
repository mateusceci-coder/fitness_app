import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./reducers/profile";
import exerciseReducer from "./reducers/exercise";
import registerReducer from "@/api/register/registerSlice";
import updateReducer from "@/api/profile/profileSlice";
import exercisesReducerBB from "@/api/exerciseBB/exerciseSliceBB";
import exercisesReducerCF from "@/api/exerciseCF/exerciseSliceCF"
import workoutReducerCF from "@/api/workoutCF/workoutSliceCF"
import workoutReducerBB from "@/api/workoutBB/workoutSliceBB"

const store = configureStore({
  reducer: {
    profile: profileReducer,
    exercise: exerciseReducer,
    register: registerReducer,
    update: updateReducer,
    exercisesBB: exercisesReducerBB,
    exercisesCF: exercisesReducerCF,
    workoutCF: workoutReducerCF,
    workoutBB: workoutReducerBB,
  },
});

export type RootReducer = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
