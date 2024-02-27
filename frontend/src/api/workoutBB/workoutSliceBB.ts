import { createSlice } from '@reduxjs/toolkit'
import { createWorkoutThunkBB } from './postThunk'

interface RegisterState {
  error: string | null
  updateSuccess: boolean
}

const initialState: RegisterState = {
  error: null,
  updateSuccess: false
}

const createWorkoutSliceBB = createSlice({
  name: 'registerModal',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createWorkoutThunkBB.pending, (state) => {
        state.error = null
        state.updateSuccess = false
      })
      .addCase(createWorkoutThunkBB.fulfilled, (state) => {
        state.updateSuccess = true })
      .addCase(createWorkoutThunkBB.rejected, (state, action) => {
        state.error = action.payload as string
        state.updateSuccess = false
      })
  }
})

export default createWorkoutSliceBB.reducer