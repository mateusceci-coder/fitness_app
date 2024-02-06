import { useDispatch } from 'react-redux'
import { ProfileParams } from './types'
import { updateUserThunk } from './postThunk'
import { AppDispatch } from '@/store/store'

export const useProfile = () => {
    const dispatch = useDispatch<AppDispatch>()
    const updateUser = async (data: ProfileParams) => {
        const response = dispatch(updateUserThunk(data))
        return response
    }
    return { updateUser }
}