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
      toast.error("Falha no registro");
      if (axios.isAxiosError(error) && error.response) {
        const passwordErros = error.response.data.password;
        if (passwordErros) {
          passwordErros.forEach((element: string) => {
            toast.error(element);
          });
        } else {
          toast.error(error.response.data.username || "Falha no registro");
        }
        return rejectWithValue(
          error.response.data.error || "Falha no registro"
        );
      }
      return rejectWithValue("Erro desconhecido ao fazer registro");
    }
  }
);
