import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { toast } from "react-toastify";
import { postWorkoutBB } from "./types";

export const createWorkoutThunkBB = createAsyncThunk(
  "create/workoutBB",
  async (
    { postWorkoutBB }: { postWorkoutBB: postWorkoutBB },
    { rejectWithValue }
  ) => {
    try {
      const token = sessionStorage.getItem("auth_token");
      const response = await axios.post(
        `https://fitness-app-y9fc.onrender.com/api/workouts/bodybuilding/`,
        postWorkoutBB,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
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
      return rejectWithValue("Unknown error when registering");
    }
  }
);
