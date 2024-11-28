import {configureStore} from '@reduxjs/toolkit'
import restaurantSlice from './restaurantSlice'
import reservationReducer from './reservationSlice';


export const store = configureStore({
    reducer: {
        restaurants: restaurantSlice,
        reservations: reservationReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch