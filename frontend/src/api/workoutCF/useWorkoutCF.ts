import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { postWorkoutCF } from "./types";
import { createWorkoutThunkCF } from "./postThunk";
import { deleteWorkoutThunkCF } from "./deleteThunk";

export const useWorkoutCF = () => {
  const dispatch = useDispatch<AppDispatch>();
  const createWorkoutCF = async (
    postWorkoutCF: postWorkoutCF,
    callback: Function
  ) => {
    const response = await dispatch(createWorkoutThunkCF({ postWorkoutCF }));
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
