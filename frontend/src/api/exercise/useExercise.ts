import { useDispatch } from 'react-redux'
import { createExerciseThunk } from './postThunk'
import { AppDispatch } from '@/store/store'
import { exerciseParams } from './types'
import { updateExerciseThunk } from './patchThunk'
import { getExerciseThunk } from './getThunk'


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

    const getExercise = async () => {
        const response = await dispatch(getExerciseThunk())
        return response
    }
    return { createExercise, updateExercise, getExercise }
}