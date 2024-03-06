import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { toast } from "react-toastify";
import { postWorkoutBB } from "./types";

export const createWorkoutThunkBB = createAsyncThunk(

  "create/workoutBB",
  async (
    { postWorkoutBB}: { postWorkoutBB: postWorkoutBB },
    { rejectWithValue }
  ) => {
    try {
      const token = sessionStorage.getItem("auth_token")
      const response = await axios.post(
        `http://127.0.0.1:8000/api/workouts/bodybuilding/`,
        postWorkoutBB,
        {
          headers: {
            Authorization: `Token ${token}`
          }
        });
      toast.success("Workout Created Successfully!");
      return response.data;
    } catch (error) {
      toast.error("Registration Failed");
      if (axios.isAxiosError(error) && error.response) {
        const passwordErros = error.response.data.password;
        if (passwordErros) {
          passwordErros.forEach((element: string) => {
            toast.error(element);
          });
        } else {
          toast.error(error.response.data.username || "Registration Failed");
        }
        return rejectWithValue(
          error.response.data.error || "Registration Failed"
        );
      }
      return rejectWithValue("Erro desconhecido ao fazer registro");
    }
  }
);