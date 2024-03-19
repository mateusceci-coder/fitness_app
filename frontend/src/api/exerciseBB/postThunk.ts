import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { exerciseParams } from "./types";

import { toast } from "react-toastify";

export const createExerciseThunkBB = createAsyncThunk(
  "create/exerciseBB",
  async (
    { exerciseParams }: { exerciseParams: exerciseParams },
    { rejectWithValue }
  ) => {
    try {
      const token = sessionStorage.getItem("auth_token");
      const response = await axios.post(
        `https://fitness-app-y9fc.onrender.com/api/exercises/bodybuilding/`,
        exerciseParams,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      toast.success("Exercise Created Successfully!");
      return response.data;
    } catch (error) {
      toast.error("Registration Failure");
      if (axios.isAxiosError(error) && error.response) {
        const passwordErros = error.response.data.password;
        if (passwordErros) {
          passwordErros.forEach((element: string) => {
            toast.error(element);
          });
        } else {
          toast.error(error.response.data.username || "Registration Failure");
        }
        return rejectWithValue(
          error.response.data.error || "Registration Failure"
        );
      }
      return rejectWithValue("Unknown error when registering");
    }
  }
);
