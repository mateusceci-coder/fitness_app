import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { toast } from "react-toastify";

export const updateUserThunk = createAsyncThunk(
  "auth/updateProfile",
  async (
    { profileParams, id }: { profileParams: FormData; id: number },
    { rejectWithValue }
  ) => {
    try {
      const token = sessionStorage.getItem("auth_token");
      const response = await axios.patch(
        `https://fitness-app-y9fc.onrender.com/api/profile/update/${id}/`,
        profileParams,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      toast.success("Registro realizado com sucesso!");
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
