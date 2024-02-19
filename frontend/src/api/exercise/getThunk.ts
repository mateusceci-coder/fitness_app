import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { toast } from "react-toastify";

export const getExerciseThunk = createAsyncThunk(
  "get/exercise",
  async ({}, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("auth_token");
      const response = await axios.get(`http://127.0.0.1:8000/api/exercises`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      toast.error("Unavailable server");
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
