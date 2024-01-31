import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ProfileParams {
  firstname: string;
  lastname: string;
  birthday: string;
  height: number;
  weightUser: number;
  gender: string;
  firstProfile: boolean;
  updatingProfile: boolean;
  image?: string;
}

interface Profile {
  firstname: string;
  lastname: string;
  birthday: string;
  height: number;
  weightUser: number;
  gender: string;
  image?: string;
}

const initialState: ProfileParams = {
  firstname: "",
  lastname: "",
  birthday: "",
  height: 0,
  weightUser: 0,
  gender: "",
  firstProfile: true,
  updatingProfile: false,
  image: "",
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
      const { birthday, height, weightUser, gender, image } = action.payload;
      (state.birthday = birthday),
        (state.height = height),
        (state.weightUser = weightUser),
        (state.gender = gender);
      state.image = image;
    },
    setName: (state, action: PayloadAction<{firstname:string, lastname: string}>) => {
      (state.firstname = action.payload.firstname),
        (state.lastname = action.payload.lastname);
    },
  },
});

export const { updateUser, isUpdating, isFirstProfile, setName } = profileSlice.actions;

export default profileSlice.reducer;
