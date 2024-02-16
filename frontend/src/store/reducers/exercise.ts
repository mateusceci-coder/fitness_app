import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ExerciseParams {
    id: string;
    exercise: string;
    equipment: string;
    weight: number;
    relation: number;
}


interface exercisesList {
    crossfitList: ExerciseParams[]
    bodybuildingList: ExerciseParams[]
    exerciseId: string
}

const initialState: exercisesList = {
    crossfitList: [{
      id: "4",
      exercise: "Squat Clean",
      equipment: "Bar",
      weight: 0,
      relation: 0,
    }],
    bodybuildingList: [{
      id: "1",
      exercise: "Bench Press",
      equipment: "Bar",
      weight: 0,
      relation: 0,
    }],
    exerciseId: "",
}

  const exerciseSlice = createSlice({
    name: "exercise",
    initialState,
    reducers: {
      editingExerciseId: (state, action: PayloadAction<string>) => {
        state.exerciseId = action.payload
      },
      updateWeightBodybuilding: (state, action: PayloadAction<ExerciseParams[]>) => {
        state.bodybuildingList = action.payload
      },
      updateWeightCrossfit: (state, action: PayloadAction<ExerciseParams[]>) => {
        state.crossfitList = action.payload
      },
      delExCrossfit: (state, action: PayloadAction<ExerciseParams[]>) => {
          state.crossfitList = action.payload
      },
      delExBodybuilding: (state, action: PayloadAction<ExerciseParams[]>) => {
        state.bodybuildingList = action.payload
      },
      addExerciseCrossfit: (state, action: PayloadAction<ExerciseParams>) => {
        state.crossfitList.push(action.payload)
      },
      addExerciseBodybuilding: (state, action: PayloadAction<ExerciseParams>) => {
        state.bodybuildingList.push(action.payload)
      },
      newUserWeight: (state, action: PayloadAction<number>) => {
        state.crossfitList = state.crossfitList.map((exercise) => ({
          ...exercise,
          relation: Number((exercise.weight / action.payload).toFixed(2)),
        })),
        state.bodybuildingList = state.bodybuildingList.map((exercise) => ({
          ...exercise,
          relation:
          Number((exercise.weight / action.payload).toFixed(2)),
        }));
      },
    },
  });

  export const { editingExerciseId, updateWeightBodybuilding, updateWeightCrossfit, delExCrossfit, delExBodybuilding, addExerciseBodybuilding, addExerciseCrossfit, newUserWeight } = exerciseSlice.actions;

export default exerciseSlice.reducer;