import {configureStore} from '@reduxjs/toolkit'
import restaurantSlice from './restaurantSlice'

export const store = configureStore({
    reducer: {
        restaurants: restaurantSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch