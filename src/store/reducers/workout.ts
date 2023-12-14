import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface crossfitExercise {
  nameExercise: string;
  repsExercise: number;
  mensWeight?: number;
  womensWeight?: number;
}
interface workoutCrossfitParams {
  id: string;
  name: string;
  type: string;
  rounds?: number;
  timeCap: number;
  exercise: crossfitExercise[];
}

interface workoutList {
  workoutsCrossfit: workoutCrossfitParams[];
  workoutsBodybuilding: workoutBodybuildingParams[];
}
export interface bodybuildingExercise {
  nameExercise: string;
  repsExercise: number;
  seriesExercise: number;
  equipment: string;
  suggestedWeight: number;
}
interface workoutBodybuildingParams {
  id: string;
  name: string;
  exercise: bodybuildingExercise[];
}

const crossfitExample = [
  {
    id: "2",
    name: "Grace",
    type: "forTime",
    timeCap: 8,
    exercise: [
      {
        nameExercise: "Clean and Jerk",
        repsExercise: 30,
        mensWeight: 61,
        womensWeight: 43,
      },
    ],
  },
];

const bodybuildingExample = [
  {
    id: "1",
    name: "Upper Body (suggestion)",
    exercise: [
      {
        nameExercise: "Bench Press",
        repsExercise: 8,
        seriesExercise: 4,
        equipment: "Bar",
        suggestedWeight: 0,
      },
      {
        nameExercise: "Bent Over Row",
        repsExercise: 10,
        seriesExercise: 3,
        equipment: "Bar",
        suggestedWeight: 0,
      },
      {
        nameExercise: "Shoulder Press",
        repsExercise: 12,
        seriesExercise: 4,
        equipment: "Dumbbell",
        suggestedWeight: 0,
      },
      {
        nameExercise: "Barbell Curls",
        repsExercise: 12,
        seriesExercise: 3,
        equipment: "Bar",
        suggestedWeight: 0,
      },
      {
        nameExercise: "Dip",
        repsExercise: 12,
        seriesExercise: 3,
        equipment: "Bodyweight",
        suggestedWeight: 0,
      },
    ],
  },
];

const initialState: workoutList = {
  workoutsCrossfit: crossfitExample,
  workoutsBodybuilding: bodybuildingExample,
};

const workoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {
    addNewCrossfitWorkout: (
      state,
      action: PayloadAction<workoutCrossfitParams>
    ) => {
      state.workoutsCrossfit.push(action.payload);
    },
    deleteCrossfitWorkout: (state, action: PayloadAction<string>) => {
      state.workoutsCrossfit = state.workoutsCrossfit.filter(
        (workout) => workout.id !== action.payload
      );
    },
    addNewBodybuildingWorkout: (
      state,
      action: PayloadAction<workoutBodybuildingParams>
    ) => {
      state.workoutsBodybuilding.push(action.payload);
    },
    deleteBodybuildingWorkout: (state, action: PayloadAction<string>) => {
      state.workoutsBodybuilding = state.workoutsBodybuilding.filter(
        (workout) => workout.id !== action.payload
      );
    },
  },
});

export const {
  addNewCrossfitWorkout,
  deleteCrossfitWorkout,
  addNewBodybuildingWorkout,
  deleteBodybuildingWorkout,
} = workoutSlice.actions;

export default workoutSlice.reducer;
