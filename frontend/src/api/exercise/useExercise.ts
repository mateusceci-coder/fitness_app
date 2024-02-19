import { useDispatch } from 'react-redux'
import { createExerciseThunk } from './postThunk'
import { AppDispatch } from '@/store/store'
import { exerciseParams } from './types'
import { updateExerciseThunk } from './patchThunk'


export const useExercise = () => {
    const dispatch = useDispatch<AppDispatch>()
    const createExercise = async (exerciseParams: exerciseParams) => {
        const response = await dispatch(createExerciseThunk({exerciseParams}))
        return response
    }
    const updateExercise = async (exerciseParams: exerciseParams, id: number) => {
        const response = await dispatch(updateExerciseThunk({exerciseParams, id}))
        return response
    }
    return { createExercise, updateExercise }
}