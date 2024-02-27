import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { postWorkoutBB } from "./types";
import { createWorkoutThunkBB } from "./postThunk";
import { deleteWorkoutThunkBB } from "./deleteThunk";

export const useWorkoutBB = () => {
  const dispatch = useDispatch<AppDispatch>();
  const createWorkoutBB = async (
    postWorkoutBB: postWorkoutBB,
    callback: Function
  ) => {
    const response = await dispatch(createWorkoutThunkBB({ postWorkoutBB }));
    callback();
    return response;
  };

  const deleteWorkoutBB = async (id: number, callback: Function) => {
    const response = await dispatch(deleteWorkoutThunkBB({ id }));
    callback();
    return response;
  };
  return { createWorkoutBB, deleteWorkoutBB };
};
