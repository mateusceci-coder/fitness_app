import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RegisterData, RegisterResponse } from "./types";
import { toast } from "react-toastify";

export const registerUserThunk = createAsyncThunk<
  RegisterResponse,
  RegisterData,
  { rejectValue: string }
>("auth/registerUser", async (RegisterData, { rejectWithValue }) => {
  try {
    const response = await axios.post<RegisterResponse>(
      `https://fitness-app-y9fc.onrender.com/auth/users/`,
      RegisterData
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
});
