import { createSlice } from '@reduxjs/toolkit'
import { createWorkoutThunkCF } from './postThunk'

interface RegisterState {
  error: string | null
  updateSuccess: boolean
}

const initialState: RegisterState = {
  error: null,
  updateSuccess: false
}

const createWorkoutSliceCF = createSlice({
  name: 'registerModal',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createWorkoutThunkCF.pending, (state) => {
        state.error = null
        state.updateSuccess = false
      })
      .addCase(createWorkoutThunkCF.fulfilled, (state) => {
        state.updateSuccess = true })
      .addCase(createWorkoutThunkCF.rejected, (state, action) => {
        state.error = action.payload as string
        state.updateSuccess = false
      })
  }
})

export default createWorkoutSliceCF.reducer