import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { exerciseParams } from "./types";

import { toast } from "react-toastify";

export const createExerciseThunk = createAsyncThunk(

  "create/exercise",
  async (
    { exerciseParams }: { exerciseParams: exerciseParams },
    { rejectWithValue }
  ) => {
    try {
      const token = sessionStorage.getItem("auth_token")
      const response = await axios.post(
        `http://127.0.0.1:8000/api/exercises/`,
        exerciseParams,
        {
          headers: {
            Authorization: `Token ${token}`
          }
        });
      toast.success("Exercicio criado com sucesso!");
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