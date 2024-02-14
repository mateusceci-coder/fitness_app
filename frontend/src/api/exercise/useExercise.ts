import { useDispatch } from 'react-redux'
import { createExerciseThunk } from './postThunk'
import { AppDispatch } from '@/store/store'
import { exerciseParams } from './types'


export const useExercise = () => {
    const dispatch = useDispatch<AppDispatch>()
    const createExercise = async (exerciseParams: exerciseParams) => {
        const response = await dispatch(createExerciseThunk({exerciseParams}))
        return response
    }
    return { createExercise }
}