import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { toast } from "react-toastify";

export const deleteExerciseThunkBB = createAsyncThunk(
  "delete/exerciseBB",
  async ({ id }: { id: number }, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("auth_token");
      const response = await axios.delete(
        `https://fitness-app-y9fc.onrender.com/api/exercises/bodybuilding/${id}/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      toast.success("Exercise Deleted!");
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
