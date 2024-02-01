import { createSlice } from '@reduxjs/toolkit'
import { registerUserThunk } from './postThunk'

interface RegisterState {
  error: string | null
  registerSuccess: boolean
}

const initialState: RegisterState = {
  error: null,
  registerSuccess: false
}

const registerModalSlice = createSlice({
  name: 'registerModal',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.error = null
        state.registerSuccess = false
      })
      .addCase(registerUserThunk.fulfilled, (state) => {
        state.registerSuccess = true
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.error = action.payload as string
        state.registerSuccess = false
      })
  }
})

export default registerModalSlice.reducer