import { createSlice } from '@reduxjs/toolkit'
import { createExerciseThunkBB } from './postThunk'

interface RegisterState {
  error: string | null
  updateSuccess: boolean
}

const initialState: RegisterState = {
  error: null,
  updateSuccess: false
}

const createExerciseSliceBB = createSlice({
  name: 'registerModal',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createExerciseThunkBB.pending, (state) => {
        state.error = null
        state.updateSuccess = false
      })
      .addCase(createExerciseThunkBB.fulfilled, (state) => {
        state.updateSuccess = true })
      .addCase(createExerciseThunkBB.rejected, (state, action) => {
        state.error = action.payload as string
        state.updateSuccess = false
      })
  }
})

export default createExerciseSliceBB.reducer