import { createSlice } from '@reduxjs/toolkit'
import { createExerciseThunk } from './postThunk'

interface RegisterState {
  error: string | null
  updateSuccess: boolean
}

const initialState: RegisterState = {
  error: null,
  updateSuccess: false
}

const createExerciseSlice = createSlice({
  name: 'registerModal',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createExerciseThunk.pending, (state) => {
        state.error = null
        state.updateSuccess = false
      })
      .addCase(createExerciseThunk.fulfilled, (state) => {
        state.updateSuccess = true })
      .addCase(createExerciseThunk.rejected, (state, action) => {
        state.error = action.payload as string
        state.updateSuccess = false
      })
  }
})

export default createExerciseSlice.reducer