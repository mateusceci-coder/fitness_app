import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ProfileParams {
  first_name: string;
  last_name: string;
  birthday: string;
  height: number;
  weight: number;
  gender: string;
  updatingProfile: boolean;
  profile_picture?: string;
}


const initialState: ProfileParams = {
  first_name: "",
  last_name: "",
  birthday: "",
  height: 0,
  weight: 0,
  gender: "",
  updatingProfile: false,
  profile_picture: "",
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    isUpdating: (state, action: PayloadAction<boolean>) => {
      state.updatingProfile = action.payload;
    },
  },
});

export const {  isUpdating, } = profileSlice.actions;

export default profileSlice.reducer;
