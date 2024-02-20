import { useDispatch } from "react-redux";
import { createExerciseThunkBB } from "./postThunk";
import { AppDispatch } from "@/store/store";
import { exerciseParams } from "./types";
import { updateExerciseThunkBB } from "./patchThunk";

import { deleteExerciseThunkBB } from "./deleteThunk";

export const useExerciseBB = () => {
  const dispatch = useDispatch<AppDispatch>();
  const createExerciseBB = async (
    exerciseParams: exerciseParams,
    callback: Function
  ) => {
    const response = await dispatch(createExerciseThunkBB({ exerciseParams }));
    callback();
    return response;
  };
  const updateExerciseBB = async (rep_max: number, id: number) => {
    const response = await dispatch(updateExerciseThunkBB({ rep_max, id }));
    return response;
  };

  const deleteExerciseBB = async (id: number, callback: Function) => {
    const response = await dispatch(deleteExerciseThunkBB({ id }));
    callback();
    return response;
  };
  return { createExerciseBB, updateExerciseBB, deleteExerciseBB };
};
