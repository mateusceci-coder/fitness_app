import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ExerciseParams {
    id: string;
    exercise: string;
    equipment: string;
    weight: number;
    relation?: number;
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
    }],
    bodybuildingList: [{
      id: "1",
      exercise: "Bench Press",
      equipment: "Bar",
      weight: 0,
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
    }
    },
  });

  export const { editingExerciseId, updateWeightBodybuilding, updateWeightCrossfit, delExCrossfit, delExBodybuilding } = exerciseSlice.actions;

export default exerciseSlice.reducer;