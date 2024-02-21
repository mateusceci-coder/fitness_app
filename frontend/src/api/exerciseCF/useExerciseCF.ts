import { useDispatch } from "react-redux";
import { createExerciseThunkCF } from "./postThunk";
import { AppDispatch } from "@/store/store";
import { exerciseParams } from "../exerciseBB/types";
import { updateExerciseThunkCF } from "./patchThunk";

import { deleteExerciseThunkCF } from "./deleteThunk";

export const useExerciseCF = () => {
  const dispatch = useDispatch<AppDispatch>();
  const createExerciseCF = async (
    exerciseParams: exerciseParams,
    callback: Function
  ) => {
    const response = await dispatch(createExerciseThunkCF({ exerciseParams }));
    callback();
    return response;
  };
  const updateExerciseCF = async (rep_max: number, id: number) => {
    const response = await dispatch(updateExerciseThunkCF({ rep_max, id }));
    return response;
  };

  const deleteExerciseCF = async (id: number, callback: Function) => {
    const response = await dispatch(deleteExerciseThunkCF({ id }));
    callback();
    return response;
  };
  return { createExerciseCF, updateExerciseCF, deleteExerciseCF };
};
