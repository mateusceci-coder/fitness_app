import { createSlice } from '@reduxjs/toolkit'
import { updateUserThunk } from './postThunk'

interface RegisterState {
  error: string | null
  updateSuccess: boolean
}

const initialState: RegisterState = {
  error: null,
  updateSuccess: false
}

const updateSlice = createSlice({
  name: 'registerModal',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUserThunk.pending, (state) => {
        state.error = null
        state.updateSuccess = false
      })
      .addCase(updateUserThunk.fulfilled, (state) => {
        state.updateSuccess = true })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.error = action.payload as string
        state.updateSuccess = false
      })
  }
})

export default updateSlice.reducer