import { useDispatch } from 'react-redux'
import { ProfileParams } from './types'
import { updateUserThunk } from './postThunk'
import { AppDispatch } from '@/store/store'


export const useProfile = () => {
    const dispatch = useDispatch<AppDispatch>()
    const updateUser = async (profileParams: ProfileParams, id: number) => {
        const response = await dispatch(updateUserThunk({profileParams, id}))
        return response
    }
    return { updateUser }
}