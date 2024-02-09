import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ProfileParams {
  first_name: string;
  last_name: string;
  birthday: string;
  height: number;
  weight: number;
  gender: string;
  firstProfile: boolean;
  updatingProfile: boolean;
  profile_picture?: string;
}

interface Profile {
  first_name: string;
  last_name: string;
  birthday: string;
  height: number;
  weight: number;
  gender: string;
  profile_picture?: string;
}

const initialState: ProfileParams = {
  first_name: "",
  last_name: "",
  birthday: "",
  height: 0,
  weight: 0,
  gender: "",
  firstProfile: true,
  updatingProfile: false,
  profile_picture: "",
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
    userUpdate: (state, action: PayloadAction<Profile>) => {
      const { birthday, height, weight, gender, profile_picture, first_name, last_name } = action.payload;
      state.first_name = first_name
      state.last_name = last_name,
      (state.birthday = birthday),
        (state.height = height),
        (state.weight = weight),
        (state.gender = gender);
      state.profile_picture = profile_picture;
    }
  },
});

export const { userUpdate, isUpdating, isFirstProfile } = profileSlice.actions;

export default profileSlice.reducer;
