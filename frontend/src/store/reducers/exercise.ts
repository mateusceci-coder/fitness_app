
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ExerciseParams {
    id: number;
    exercise: string;
    equipment: string;
    weight: number;
    relation: number;
}


const initialState: ExerciseParams = {
    id: 0,
    exercise: "",
    equipment: "",
    weight: 0,
    relation: 0,
};

  const exerciseSlice = createSlice({
    name: "exercise",
    initialState,
    reducers: {
      editingExerciseId: (state, action: PayloadAction<number>) => {
        state.id = action.payload
      },
      },
    },
  );

  export const { editingExerciseId } = exerciseSlice.actions;

export default exerciseSlice.reducer;