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
}

  const exerciseSlice = createSlice({
    name: "exercise",
    initialState,
    reducers: {

    },
  });

  export const { } = exerciseSlice.actions;

export default exerciseSlice.reducer;