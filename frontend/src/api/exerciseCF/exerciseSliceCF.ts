import { createSlice } from '@reduxjs/toolkit'
import { createExerciseThunkCF } from './postThunk'

interface RegisterState {
  error: string | null
  updateSuccess: boolean
}

const initialState: RegisterState = {
  error: null,
  updateSuccess: false
}

const createExerciseSliceCF = createSlice({
  name: 'registerModal',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createExerciseThunkCF.pending, (state) => {
        state.error = null
        state.updateSuccess = false
      })
      .addCase(createExerciseThunkCF.fulfilled, (state) => {
        state.updateSuccess = true })
      .addCase(createExerciseThunkCF.rejected, (state, action) => {
        state.error = action.payload as string
        state.updateSuccess = false
      })
  }
})

export default createExerciseSliceCF.reducer