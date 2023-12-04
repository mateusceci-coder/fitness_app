import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ProfileParams {
  firstname: string;
  lastname: string;
  age: number;
  height: number;
  weight: number;
  gender: string;
  firstProfile: boolean;
  updatingProfile: boolean;
}

interface Profile {
firstname: string;
  lastname: string;
  age: number;
  height: number;
  weight: number;
  gender: string;
}

const initialState: ProfileParams = {
  firstname: "",
  lastname: "",
  age: 0,
  height: 0,
  weight: 0,
  gender: "",
  firstProfile: true,
  updatingProfile: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    isFirstProfile: (state, action: PayloadAction<boolean>) => {
      state.firstProfile = action.payload;
    },
    isUpdating: (state, action: PayloadAction<boolean>) => {
      state.updatingProfile = action.payload;
    },
    updateUser: (state, action: PayloadAction<Profile>) => {
      const { firstname, lastname, age, height, weight, gender } =
        action.payload;

        (state.firstname = firstname),
        (state.lastname = lastname),
        (state.age = age),
        (state.height = height),
        (state.weight = weight),
        (state.gender = gender);
    },
  },
});

export const { updateUser, isUpdating, isFirstProfile } = profileSlice.actions;

export default profileSlice.reducer;
