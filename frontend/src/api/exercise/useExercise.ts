import { useDispatch } from "react-redux";
import { createExerciseThunk } from "./postThunk";
import { AppDispatch } from "@/store/store";
import { exerciseParams } from "./types";
import { updateExerciseThunk } from "./patchThunk";
import { getExerciseThunk } from "./getThunk";
import { deleteExerciseThunk } from "./deleteThunk";

export const useExercise = () => {
  const dispatch = useDispatch<AppDispatch>();
  const createExercise = async (
    exerciseParams: exerciseParams,
    callback: Function
  ) => {
    const response = await dispatch(createExerciseThunk({ exerciseParams }));
    callback();
    return response;
  };
  const updateExercise = async (rep_max: number, id: number) => {
    const response = await dispatch(updateExerciseThunk({ rep_max, id }));
    return response;
  };

  const getExercise = async () => {
    const response = await dispatch(getExerciseThunk());
    return response;
  };

  const deleteExercise = async (id: number, callback: Function) => {
    const response = await dispatch(deleteExerciseThunk({ id }));
    callback();
    return response;
  };
  return { createExercise, updateExercise, getExercise, deleteExercise };
};
