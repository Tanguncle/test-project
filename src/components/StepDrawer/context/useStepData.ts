import { useContext } from 'react'
import { DataContext, DataDispatcher } from './index'

export const useStepData = ()=>{
    return {
        stepData: useContext(DataContext),
        updateStepData: useContext(DataDispatcher)
    }
}