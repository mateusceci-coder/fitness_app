import { useDispatch } from 'react-redux'
import { RegisterData } from './types'
import { registerUserThunk } from './postThunk'
import { AppDispatch } from '@/store/store'

export const useRegister = () => {
    const dispatch = useDispatch<AppDispatch>()
    const registerUser = async (data: RegisterData) => {
        const response = dispatch(registerUserThunk(data))
        return response
    }
    return { registerUser }
}