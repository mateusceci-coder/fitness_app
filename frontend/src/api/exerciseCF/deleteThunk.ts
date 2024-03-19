import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { toast } from "react-toastify";

export const deleteExerciseThunkCF = createAsyncThunk(
  "delete/exerciseCF",
  async ({ id }: { id: number }, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("auth_token");
      const response = await axios.delete(
        `https://fitness-app-y9fc.onrender.com/api/exercises/crossfit/${id}/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      toast.success("Exercise Deleted!");
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
