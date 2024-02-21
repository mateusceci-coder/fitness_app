import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { workoutParamsCF } from "./types";
import { createWorkoutThunkCF } from "./postThunk";
import { deleteWorkoutThunkCF } from "./deleteThunk";

export const useExerciseCF = () => {
  const dispatch = useDispatch<AppDispatch>();
  const createWorkoutCF = async (
    workoutParamsCF: workoutParamsCF,
    callback: Function
  ) => {
    const response = await dispatch(createWorkoutThunkCF({ workoutParamsCF }));
    callback();
    return response;
  };

  const deleteWorkoutCF = async (id: number, callback: Function) => {
    const response = await dispatch(deleteWorkoutThunkCF({ id }));
    callback();
    return response;
  };
  return { createWorkoutCF, deleteWorkoutCF };
};
