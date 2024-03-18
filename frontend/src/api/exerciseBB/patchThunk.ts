import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { toast } from "react-toastify";

export const updateExerciseThunkBB = createAsyncThunk(
  "update/exerciseBB",
  async (
    { rep_max: rep_max, id }: { rep_max: number; id: number },
    { rejectWithValue }
  ) => {
    try {
      const token = sessionStorage.getItem("auth_token");
      const response = await axios.patch(
        `https://fitness-app-y9fc.onrender.com/api/exercises/bodybuilding/${id}/`,
        { rep_max },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      toast.success("Updated Exercise!");
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
