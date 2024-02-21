import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./reducers/profile";
import exerciseReducer from "./reducers/exercise";
import workoutReducer from "./reducers/workout";
import registerReducer from "@/api/register/registerSlice";
import updateReducer from "@/api/profile/profileSlice";
import exercisesReducerBB from "@/api/exerciseBB/exerciseSliceBB";
import exercisesReducerCF from "@/api/exerciseCF/exerciseSliceCF"
import workoutReducerCF from "@/api/workoutCF/workoutSliceCF"

const store = configureStore({
  reducer: {
    profile: profileReducer,
    exercise: exerciseReducer,
    workout: workoutReducer,
    register: registerReducer,
    update: updateReducer,
    exercisesBB: exercisesReducerBB,
    exercisesCF: exercisesReducerCF,
    workoutCF: workoutReducerCF
  },
});

export type RootReducer = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
