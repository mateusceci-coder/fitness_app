import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { toast } from "react-toastify";
import { ProfileParams } from "./types";

export const updateUserThunk = createAsyncThunk(

  "auth/updateProfile",
  async (
    { profileParams, id }: { profileParams: ProfileParams; id: number },
    { rejectWithValue }
  ) => {
    try {
      const token = sessionStorage.getItem("auth_token")
      const response = await axios.put(
        `http://127.0.0.1:8000/api/profile/update/${id}/`,
        profileParams,
        {
          headers: {
            Authorization: `Token ${token}`
          }
        });
      toast.success("Registro realizado com sucesso!");
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
